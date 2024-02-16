'use client'
import { SkeletonGrid } from '@/components/SkeletonGrid'
import { listAnimes } from '@/lib/anilist'
import { useLazyQuery } from '@apollo/client'
import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { Media } from 'anilist'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'


export default function Discovery() {
  const perPage = 25
  const router = useRouter()
  
  const [page, setPage] = useState(1)
  const [animes, setAnimes] = useState<Media[]>()
  const [query, setQuery] = useState(listAnimes({ perPage }))
  const [getAnimes, { data, loading }] = useLazyQuery(query)
  
  const [input, setInput] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [lastPage, setLastPage] = useState(false)

  const { ref, inView } = useInView({ threshold: 1 })

  async function searchAnime() {
    // if (input === '') return
    const showNsfw = JSON.parse(localStorage.getItem('showNSFW') ?? 'false') === true ?? false
    const query = listAnimes({ search: input, perPage, nsfw: showNsfw })

    setAnimes((await getAnimes({ query })).data.Page.media)
    setQuery(query)
    setLastPage(false)
  }

  useEffect(() => {
    async function setInitialData () {
      if (!animes) {
        const { data: initData } = await getAnimes()
        setAnimes(initData.Page.media)
        setIsLoaded(initData ? true : false)
      }
    }
    setInitialData()
  }, [animes, data, getAnimes])

  
  useEffect(() => {
    async function getNewData() {
      console.log('lastPage',lastPage)
      if (inView && animes && !loading && !lastPage) {
        const showNsfw = JSON.parse(localStorage.getItem('showNSFW') ?? 'false') === true ?? false
        const query = listAnimes({ search: input, page: page + 1, nsfw: showNsfw })
        const data = (await getAnimes({ query })).data?.Page?.media
        const newAnimeList: Media[] = animes.concat(data)
  
        if (data < perPage) setLastPage(true)
        setAnimes(newAnimeList)
        setPage(page + 1)
        setQuery(query)
      }
    }
    getNewData()
  }, [animes, getAnimes, inView, input, lastPage, loading, page])
      
  const isLastElement = (element: Media) => {
    if (animes) {
      return element === animes[animes.length - 1] // -1 pegara o ultimo item da lista num array
    }
  }
  return (
    <div className='flex flex-col items-center justify-between'>
      <Card>
        <CardBody className='flex flex-row'>
          <input
            type='text'
            name='search'
            placeholder='Type to search...'
            className='bg-transparent focus:outline-none'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => searchAnime()}>
            <Icon path={mdiMagnify} size={1}/>
          </button>
        </CardBody>
      </Card>
      {isLoaded && animes ?
        <div ref={ref} className='mt-4 grid grid-cols-6 md:grid-cols-2 ld:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2'>
          {animes?.map((anime: Media) => (
            <Card
              isPressable
              onPress={() => router.push(`/animes/${anime.id}`)}
              ref={isLastElement(anime) ? ref : null}
              key={`${anime.id}-${page}`}
              isFooterBlurred
              radius="lg"
              className="border-none"
            >
              <Image
                alt={anime.title?.romaji ?? 'Anime Image'}
                className="z-0 w-full h-full object-cover"
                height={500}
                src={anime?.coverImage?.large ?? undefined}
                width={300}
              />
              <CardFooter className="flex before:bg-black/10 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="select-none text-tiny truncate text-start text-white/80">{anime.title?.romaji}</p>
                {/* <Button className="text-tiny text-white bg-black/20 hidden xl:block" variant="flat" color="default" radius="lg" size="sm">
                          Download
                        </Button> */}      
              </CardFooter>
            </Card>
          ))
          }
        </div> : <SkeletonGrid count={24} width={300} height={450} cols={6} ld={4} lg={5} md={2} xl={6} />
      }
      <h2>{`Header inside viewport ${inView}.`}</h2>
    </div>
  )
}