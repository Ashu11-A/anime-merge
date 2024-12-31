import { Client, Scraper } from 'nyaa'

const client = new Client()
await client.init()
await client.config()

const scraper = new Scraper(client)
await scraper.init()
await scraper.search('re zero')
const result = await scraper.extract()

console.log(result)