interface AnimeFileInfo {
    submitter?: string; // Quem fez o submit do arquivo, geralmente identificado entre colchetes no início do nome do arquivo
    seriesName?: string; // Nome da série, extraído entre o nome do submitter e outros detalhes
    episode?: string; // Número do episódio, geralmente no formato SXXEXX ou EXX ou ao final de descrições complexas
    resolution?: string; // Resolução do vídeo, como 1080p ou 720p
    videoEncoder?: string[]; // Codecs de vídeo, como HEVC, x265, ou H.264
    videoType?: string[]; // Tipos de vídeo, como WEBRip, BDRip ou DVD-Rip
    fileFormat?: string; // Formato do arquivo, como mkv, mp4, ou avi
    audioInfo?: string[]; // Informações de áudio, como AAC, FLAC, DDP, EAC3
    subtitlesInfo?: string[]; // Informações de legendas, como Dual-Audio ou Multi-Subs
    audioLanguage?: string; // Idioma do áudio, como Dublado ou Original
    fileId?: string; // ID do arquivo, geralmente um hash identificador
    videoLanguage?: string; // Idioma do vídeo, ex: Japanese, English
    subtitleLanguages?: string[]; // Idiomas das legendas
    duration?: string; // Duração do vídeo
  }
  
function parseAnimeFileName(fileName: string): AnimeFileInfo {
  const info: AnimeFileInfo = {} // Objeto para armazenar as informações extraídas
  
  // Regex patterns
  const patterns = {
    submitter: /\[(.*?)\]/, // Captura o texto dentro de quaisquer colchetes, ex: [EMBER]
    seriesName: /\]\s(.*?)\s(?:S\d{2}|E\d{2}|\d+\s\[|\d+\s-)/, // Captura o nome da série entre o submitter e outros detalhes
    episode: /(S\d{2}E\d{2}|E\d{2}|\d{1,3}(?=\s\[|\s-|\s\d+p))/i, // Captura o número do episódio em diferentes formatos
    resolution: /\[(\d{3,4}p)\]/, // Captura a resolução do vídeo, ex: [1080p]
    videoEncoder: /(HEVC|H\.264|x265|h265|AVI|HEVC-10bit)/g, // Captura codecs de vídeo, evitando duplicatas
    videoType: /(WEBRip|BDRip|DVD-Rip)/g, // Captura tipos de vídeo
    fileFormat: /\.(mkv|mp4|avi)$/i, // Captura o formato do arquivo no final do nome, ex: .mkv
    audioInfo: /(AAC|FLAC|DDP(?:5\.1)?|EAC3|E-AC-3)/g, // Captura informações de áudio, incluindo novos tipos
    subtitlesInfo: /(Dual-Audio|Multi-Subs?|Subtitles)/g, // Captura informações de legendas, ex: Multi-Subs
    fileId: /\[([A-F0-9]{8})\]/, // Captura o ID do arquivo, ex: [F11C328F]
    audioLanguage: /(Dublado|Dubbed|English Dub)/i, // Identifica se o áudio é dublado ou original
    videoLanguage: /Video Info:\s(.*?)\s\(/, // Captura a linguagem do vídeo, ex: Japanese
    subtitleLanguages: /Subtitles Info:\s(.*?)(?=Chapters:|Duration:)/, // Captura informações detalhadas de legendas
    duration: /Duration:\s~(\d{2}:\d{2}:\d{2})/, // Captura a duração do vídeo
  }
  
  // Extraindo os dados com base nos padrões definidos acima
  let match = fileName.match(patterns.submitter)
  if (match) {
    info.submitter = match[1] // Obtém o submitter se encontrado na linha
  } else {
    // Caso o submitter não esteja na primeira linha, procura em outras partes do texto
    const lines = fileName.split('\n')
    for (const line of lines) {
      match = line.match(patterns.submitter)
      if (match) {
        info.submitter = match[1]
        break
      }
    }
  }
  
  info.seriesName = (fileName.match(patterns.seriesName) || [])[1] // Obtém o nome da série
  info.episode = (fileName.match(patterns.episode) || [])[1] // Obtém o episódio
  info.resolution = (fileName.match(patterns.resolution) || [])[1] // Obtém a resolução
  
  // Captura múltiplos codecs de vídeo e remove duplicatas
  const videoEncoderMatches = fileName.match(patterns.videoEncoder)
  info.videoEncoder = videoEncoderMatches ? [...new Set(videoEncoderMatches)] : undefined
  
  // Captura múltiplos tipos de vídeo
  const videoTypeMatches = fileName.match(patterns.videoType)
  info.videoType = videoTypeMatches ? [...new Set(videoTypeMatches)] : undefined
  
  info.fileFormat = (fileName.match(patterns.fileFormat) || [])[1] // Obtém o formato do arquivo
  
  // Captura múltiplas informações de áudio
  const audioInfoMatches = fileName.match(patterns.audioInfo)
  info.audioInfo = audioInfoMatches ? [...new Set(audioInfoMatches)] : undefined
  
  info.fileId = (fileName.match(patterns.fileId) || [])[1] // Obtém o ID do arquivo
  
  // Captura múltiplas informações de legendas se presentes
  const subtitlesMatches = fileName.match(patterns.subtitlesInfo)
  if (subtitlesMatches) {
    info.subtitlesInfo = [...new Set(subtitlesMatches)] // Remove duplicatas
  }
  
  // Verifica se o áudio é dublado ou original
  if (patterns.audioLanguage.test(fileName)) {
    info.audioLanguage = 'Dublado'
  } else {
    info.audioLanguage = 'Original'
  }
  
  // Captura a linguagem do vídeo
  info.videoLanguage = (fileName.match(patterns.videoLanguage) || [])[1]
  
  // Captura informações detalhadas de legendas
  const subtitleLanguagesMatch = fileName.match(patterns.subtitleLanguages)
  if (subtitleLanguagesMatch) {
    info.subtitleLanguages = subtitleLanguagesMatch[1]
      .split(',')
      .map((sub) => sub.trim())
  }
  
  // Captura a duração do vídeo
  info.duration = (fileName.match(patterns.duration) || [])[1]
  
  return info // Retorna o objeto contendo as informações extraídas
}
  
// Exemplo de uso
const fileName = '[FLE] Boku no Hero Academia | My Hero Academia Season 2 (BD Remux 1080p H.264 FLAC) [Dual Audio]'
const parsedInfo = parseAnimeFileName(fileName)
console.log(parsedInfo) // Exibe as informações extraídas no console
  