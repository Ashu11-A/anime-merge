export type TorrentId = {
  id: number
  info_hash: string
}

export type File = {
  name: string
  components: string[]
  length: number
  included: boolean
}

export enum TorrentState {
  Initializing = 'initializing',
  Paused = 'paused',
  Live = 'live',
  Error = 'error'
}

export enum PeerState {
  Dead = 'dead',
  Live = 'live',
  Connecting = 'connecting'
}

export type PeerCounters = {
  incoming_connections: number;
  fetched_bytes: number;
  total_time_connecting_ms: number;
  connection_attempts: number;
  connections: number;
  errors: number;
  fetched_chunks: number;
  downloaded_and_checked_pieces: number;
  total_piece_download_ms: number;
  times_stolen_from_me: number;
  times_i_stole: number;
}

export type Peer = {
  counters: PeerCounters
  state: PeerState
}

export type TorrentPeerStats = {
  peers: Record<string, Peer>
}

export type TorrentInfo = {
  info_hash: string
  name: string
  files: File[]
}

export type AddTorrent = {
  id: number
  details: {
    info_hash: string
    name: string
    files: File[]
  },
  output_folder: string
  seen_peers: number | null
}

export type TorrentStats<State extends TorrentState> = {
  state: State,
  file_progress: number[],
  error: null | string,
  progress_bytes: number,
  uploaded_bytes: number,
  total_bytes: number,
  finished: boolean,
  live: State extends TorrentState.Live ? LiveTorrentStats : null
}

export interface Speed {
  mbps: number
  human_readable: string
}

export interface AggregatePeerStats {
  queued: number
  connecting: number
  live: number
  seen: number
  dead: number
  not_needed: number
}

export type LiveTorrentStats = {
  snapshot: {
    have_bytes: number
    downloaded_and_checked_bytes: number
    downloaded_and_checked_pieces: number
    fetched_bytes: number
    uploaded_bytes: number
    initially_needed_bytes: number
    remaining_bytes: number
    total_bytes: number
    total_piece_download_ms: number
    peer_stats: AggregatePeerStats
  }
  average_piece_download_time: {
    secs: number
    nanos: number
  }
  download_speed: Speed
  upload_speed: Speed
  all_time_download_speed: {
    mbps: number
    human_readable: string
  }
  time_remaining: {
    human_readable: string
    duration?: {
      secs: number
    }
  } | null
}

export type TorrentPeerStatsError = {
  error_kind: string
  human_readable: string
  status: number
  status_text: string
}

