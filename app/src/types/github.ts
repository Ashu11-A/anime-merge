export type UserGithub = {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string | null
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: 'User' | 'Bot' | string
    user_view_type: string
    site_admin: boolean
}

export type ReleaseAsset = {
    url: string
    id: number
    node_id: string
    name: string
    label: string | null
    uploader: UserGithub
    content_type: string
    state: string
    size: number
    download_count: number
    created_at: string // ISO-8601 date format
    updated_at: string // ISO-8601 date format
    browser_download_url: string
}

type ReactionCounts = {
    url: string
    total_count: number
    '+1': number
    '-1': number
    laugh: number
    hooray: number
    confused: number
    heart: number
    rocket: number
    eyes: number
  }

export type GithubRelease = {
    url: string
    assets_url: string
    upload_url: string
    html_url: string
    id: number
    author: UserGithub
    node_id: string
    tag_name: string
    target_commitish: string
    name: string
    draft: boolean
    prerelease: boolean
    created_at: string // ISO-8601 date format
    published_at: string // ISO-8601 date format
    assets: ReleaseAsset[]
    tarball_url: string
    zipball_url: string
    body: string // Markdown content or plain text
    reactions: ReactionCounts
}
