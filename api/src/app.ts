const magnetURI = '...'

client.add(magnetURI, torrent => {
  // Got torrent metadata!
  console.log('Client is downloading:', torrent.infoHash)

  for (const file of torrent.files) {
    document.body.append(file.name)
  }
})

import { Client, Scraper } from 'nyaa'

const client = new Client()
await client.init()
await client.config()

const scraper = new Scraper(client)
await scraper.init()
await scraper.search('re zero')
const result = await scraper.extract()

console.log(result)