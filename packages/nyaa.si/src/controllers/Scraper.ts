import { DataTypes, type AnimeListData } from '../type/prototype'
import { FilterParams, type FilterSearchPaths } from '../type/scraper'
import type { Client } from './Client'

export class Scraper {
  private client: Client
  private isInitialized: boolean = false

  constructor (client: Client) {
    this.client = client
  }

  private check () {
    if (!this.client.page) throw new Error('Client not initialized!')
    if (!this.client.configured) throw new Error('Client not configured!')
  }

  async init () {
    this.check()

    await this.client.page.goto('https://nyaa.si', {
      waitUntil: 'networkidle0'
    })

    this.isInitialized = true
  }

  async search (text: string, filter?: FilterSearchPaths) {
    if (!this.isInitialized) throw new Error('Scraper not initialized!')
    const page = this.client.page

    if (filter) {
      const filterKeys = filter.split('.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let filterParams: Record<string, any> = FilterParams
      let currentCategory
      let mainCategory: string | undefined = undefined 
      let subCategory: string | undefined = undefined
      
      for (let index = 0; index < filterKeys.length; index++) {
        filterParams = filterParams[filterKeys[index] as keyof typeof FilterParams]
        
        if (index === 0) {
          mainCategory = filterKeys[index]
          continue
        }
        if (typeof filterParams === 'string') {
          subCategory = filterParams
        } else {
          throw new Error(`filterParams is ${typeof filterParams}, but it should be a string!`)
        }
      }

      await page.waitForSelector('#navFilter-category > div > button')
      const filterButton = page.locator('#navFilter-category > div > button')
      await filterButton.click() // open

      await page.waitForSelector('#navFilter-category > div > div > ul li a')
      const elements = await page.$$('#navFilter-category > div > div > ul li a')

      for (const element of elements) {
        const content = await element.evaluate((el) => el.textContent?.trim())
        if (!content) continue

        if (content.includes('- ')) { // subCategory
          if (currentCategory?.includes(mainCategory ?? '') && content.replace('- ', '') === (subCategory ?? '')) {
            await element.evaluate((el) => el.click())
            break
          }
        } else if (subCategory === undefined && content.toLowerCase() === mainCategory) { // only Category
          await element.evaluate((el) => el.click()) 
          break
        } else {
          currentCategory = content.toLowerCase().replaceAll(' ', '_') // set Category
        }
      }

      await filterButton.click()
    }
    await page.type('#navbar > form > div > input', text)

    const button = page.locator('div.search-btn')
    await button.click()

    await page.waitForNavigation()
  }

  async extract() {
    if (!this.isInitialized) throw new Error('Scraper not initialized!')
    const page = this.client.page
  
    await page.waitForSelector('.torrent-list')
    const torrentList = await page.$('.torrent-list')
  
    if (!torrentList || !torrentList.asElement()) throw new Error('Torrent list not available!')
  
    const extractedData = await torrentList.evaluate((element) => {
      const rows = Array.from(element.querySelectorAll('tbody tr'))
  
      const getElementProperty = <T extends `a${string}` | undefined>(row: Element, options: {
        selector: string
        subSelector?: T
        property: keyof (T extends `a${string}` ? HTMLAnchorElement : HTMLElement)
      }) => {
        type ElementType = T extends `a${string}` ? HTMLAnchorElement : HTMLElement
  
        const fullSelector = options.subSelector ? `${options.selector} ${options.subSelector}` : options.selector
        const element = row.querySelector(fullSelector) as ElementType | null
        if (!element) return ''
  
        switch (options.property) {
        case 'getAttribute':
          return element.getAttribute('title') ?? ''
        case 'textContent':
          return element.textContent?.trim() ?? ''
        default:
          return element[options.property as keyof ElementType] as string
        }
      }
  
      return rows.map((row) => ({
        category: getElementProperty(row, {
          selector: 'td:nth-child(1)',
          subSelector: 'a',
          property: 'getAttribute'
        }),
        title: getElementProperty(row, {
          selector: 'td:nth-child(2)',
          subSelector: 'a:not(.comments)',
          property: 'getAttribute'
        }),
        link: getElementProperty(row, {
          selector: 'td:nth-child(2)',
          subSelector: 'a:not(.comments)',
          property: 'href'
        }) as `https://nyaa.si/view/${number}`,
        torrent: getElementProperty(row, {
          selector: 'td:nth-child(3)',
          subSelector: 'a[href$=".torrent"]',
          property: 'href'
        }) as `https://nyaa.si/download/${number}.torrent`,
        magnet: getElementProperty(row, {
          selector: 'td:nth-child(3)',
          subSelector: 'a[href^="magnet:"]',
          property: 'href'
        }) as `magnet:?xt=urn:btih:${string}`,
        size: getElementProperty(row, {
          selector: 'td:nth-child(4)',
          property: 'textContent'
        }),
        date: getElementProperty(row, {
          selector: 'td:nth-child(5)',
          property: 'textContent'
        }),
        seeders: Number(getElementProperty(row, {
          selector: 'td:nth-child(6)',
          property: 'textContent'
        })),
        leechers: Number(getElementProperty(row, {
          selector: 'td:nth-child(7)',
          property: 'textContent'
        })),
        downloads: Number(getElementProperty(row, {
          selector: 'td:nth-child(8)',
          property: 'textContent'
        }))
      }))
    })
  
    const paginationNav = await page.$$('ul.pagination')
    const paginationMetadata = await paginationNav[0].evaluate((element) => {
      const metadata = new Map<string, number | string | boolean>()

      function getPageNumber(url: string): number | null {
        const parsedUrl = new URL(url)
        const pageNumber = parsedUrl.searchParams.get('p')
        return pageNumber ? parseInt(pageNumber, 10) : null
      }
  
      for (const listItem of Array.from(element.querySelectorAll('li'))) {
        console.log(listItem.innerHTML)
        switch (true) {
        case listItem.classList.contains('active'): {
          const link = listItem.querySelector('a') as HTMLAnchorElement
          const currentPage = link.childNodes[0].textContent?.trim() ?? window.location.href.match(/[?&]p=(\d+)/)?.[1] ?? '0'

          metadata.set('currentPage', parseFloat(currentPage))
          break
        }
        case listItem.classList.contains('disabled'): {
          if (listItem.textContent?.trim().includes('«')) {
            metadata.set('hasPrevious', false)
            metadata.set('hasNext', true)
            break
          }
          metadata.set('hasPrevious', true)
          metadata.set('hasNext', false)
          break
        }
        case listItem.classList.contains('next'): {
          const href = listItem.querySelector('a')?.href ?? ''
          console.log(href)
          metadata.set('nextPageLink', href)
          metadata.set('nextPage', getPageNumber(href) ?? '')
          break
        }
        case listItem.classList.contains('prev'): {
          const href = listItem.querySelector('a')?.href ?? ''
          console.log(href)
          metadata.set('previousPageLink', href)
          metadata.set('previousPage', getPageNumber(href) ?? '')
          break
        }
        default: {
          const totalPage = metadata.get('totalPages')
          const currentPage = parseFloat(listItem.querySelector('a')?.textContent ?? '0')
  
          if (totalPage === undefined) metadata.set('totalPages', currentPage)
          if (Number(totalPage) < currentPage) metadata.set('totalPages', currentPage)
        }
        }
      }

      return {
        hasPrevious: metadata.get('hasPrevious') as boolean,
        previousPage: metadata.get('previousPage') as number | undefined,
        previousPageLink: metadata.get('previousPageLink') as string | undefined,
        hasNext: metadata.get('hasNext') as boolean,
        nextPage: metadata.get('nextPage') as number | undefined,
        nextPageLink: metadata.get('nextPageLink') as string | undefined,
        currentPage: metadata.get('currentPage') as number,
        totalPages: metadata.get('totalPages') as number,
        timestamp: Date.now()
      } satisfies AnimeListData['metadata']
    })

    return {
      type: DataTypes.AnimeList,
      metadata: paginationMetadata,
      count: extractedData.length,
      data: extractedData
    } satisfies AnimeListData
  }
}