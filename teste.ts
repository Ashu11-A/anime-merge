import { Download } from './app/src/lib/download'
import { DownloadType } from './app/src/types/download'

const download = new Download({
  type: DownloadType.GitHub,
  github: {
    repoOwner: 'ikatson',
    repoName: 'rqbit',
    fileName: /-amd64$/,
    latest: true
  },
  onProgress(percentage: number, byteRate: number, transferRate: number) {
    console.log(percentage, byteRate, Download.formatBytes(transferRate))
  }
})

download.execute()