import { join } from 'path'
import { Client } from './controllers/Client'
import { Wrapper } from './controllers/Wrapper'
import { Torrent } from './controllers/Torrent'
import { WrapperError } from './controllers/Error'

Client.setExecPath(join(process.cwd(), 'rqbit-linux'))

const client = new Client({ directory: 'torrents', port: 9090 })
await client.start()

const wrapper = new Wrapper(client)
await wrapper.add('magnet:?xt=urn:btih:06cca7b73a9480d6beca55143e59e38edd87954d&dn=Alpha%20Manga%20App%20Rip%202024-08-27%20%E2%80%93%202024-12-29%20%282024%29%20%28Digital%29%20%28Anon%29&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce')

const torrents = await wrapper.getTorrents()

if (!(torrents instanceof WrapperError)) {
  for (const torrent of torrents) {
    wrapper.createWatcher({
      interval: 1000,
      continueOnPaused: false,
      uuid: torrent.info_hash,
      onCompleted() {
        console.log(torrent.info_hash, 'Finalizado')
      },
      onPaused() {
        console.log(torrent.info_hash, 'Pausado')
      },
      onResume() {
        console.log(torrent.info_hash, 'Resume')
      },
      async onRequest(data) {
        console.log(data)
      },
    })
  }
}

const deleted = await new Torrent({ uuid: '06cca7b73a9480d6beca55143e59e38edd87954d' }, wrapper).delete()
console.log(deleted) // true