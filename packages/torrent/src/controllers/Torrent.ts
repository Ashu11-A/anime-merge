import type { TorrentInfo, TorrentPeerStats, TorrentState, TorrentStats } from './types/wrapper'
import type { Wrapper } from './Wrapper'

export type TorrentOptions = {
  uuid: string | number
}

export class Torrent {
  constructor (private options: TorrentOptions, private wrapper: Wrapper) {}

  async info (): Promise<TorrentInfo | Error> {
    return this.wrapper.getInfo(this.options.uuid)
  }
    
  async peerStats(): Promise<TorrentPeerStats | Error> {
    return this.wrapper.getPeerStats(this.options.uuid)
  }

  async stats(): Promise<TorrentStats<TorrentState> | Error> {
    return this.wrapper.getStatsV1(this.options.uuid)
  }

  async delete () {
    return this.wrapper.delete(this.options.uuid)
  }
  async forget () {
    return this.wrapper.forget(this.options.uuid)
  }
  async pause () {
    return this.wrapper.pause(this.options.uuid)
  }
  async start () {
    return this.wrapper.start(this.options.uuid)
  }
  async update_only_files () {}
}