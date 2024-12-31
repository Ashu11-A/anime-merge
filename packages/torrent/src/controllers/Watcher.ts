import type { Torrent } from './Torrent'
import { TorrentState, type TorrentInfo, type TorrentPeerStats, type TorrentStats } from './types/wrapper'

export type WatcherOptions = WatcherFunctions & {
  interval: number
  continueOnPaused?: boolean
  continueOnCompleted?: boolean
}

export type WatcherFunctions = {
    onRequest?: (data: {
        info: TorrentInfo | Error,
        peerStats: TorrentPeerStats | Error,
        stats: TorrentStats<TorrentState> | Error
    }) => void
    onPaused?: () => void
    onCompleted?: () => void
    onResume?: () => void
  }
  

export class Watcher {
  public state: TorrentState = TorrentState.Initializing
  constructor (public options: WatcherOptions & { torrent: Torrent }) {
    this.init()
  }

  init () {
    const { torrent } = this.options

    const intervalId = setInterval(async () => {
      const [infoResponse, peerStatsResponse, statsResponse] = await Promise.all([
        torrent.info(),
        torrent.peerStats(),
        torrent.stats()
      ])

      if (!(statsResponse instanceof Error)) {
        if (this.state !== TorrentState.Paused && statsResponse.state === TorrentState.Paused) {
          this.options.onPaused?.()
        }
        if (this.state === TorrentState.Paused && statsResponse.state === TorrentState.Live) {
          this.options.onResume?.()
        }
        this.state = statsResponse.state
        if (statsResponse.state === TorrentState.Paused && this.options.continueOnPaused === false) return

        if (statsResponse.finished) {
          this.options.onCompleted?.()
          clearInterval(intervalId)
        }
      }

      this.options.onRequest?.({
        info: infoResponse,
        peerStats: peerStatsResponse,
        stats: statsResponse
      })
    }, this.options.interval)
  }
}