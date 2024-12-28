export enum DownloadType {
    GitHub = 'github',
    URL = 'url'
}

export type DownloadInTauri = {
  tauri: true
  path: string
}

export type DownloadURL = {
    type: DownloadType.URL
    url: string
}
export type DownloadGitHub = {
    type: DownloadType.GitHub
    github: {
        repoOwner: string
        repoName: string
        fileName: string | RegExp
        latest?: boolean
    }
}

export type DownloadProps<IsTauri extends boolean, DownloadTyped extends DownloadType> = 
    (DownloadTyped extends DownloadType.GitHub
        ? DownloadGitHub
        : DownloadTyped extends DownloadType.URL
        ? DownloadURL
        : never)
    & (
        IsTauri extends true
        ? DownloadInTauri
        : never
    )
    & DownloadEvents

export type DownloadEvents = {
    onStart?: (url: string) => void
    onProgress?: (percentage: number, byteRate: number, transferRate: number) => void
    onComplete?: (blob: undefined | Blob) => void
}