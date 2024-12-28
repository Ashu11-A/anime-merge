export const FilterParams = {
  anime: {
    anime_music_video: 'Anime Music Video',
    english_translated: 'English-translated',
    non_english_translated: 'Non-English-translated',
    raw: 'Raw'
  },
  audio: {
    lossless: 'Lossless',
    lossy: 'Lossy'
  },
  literature: {
    english_translated: 'English-translated',
    non_english_translated: 'Non-English-translated',
    raw: 'Raw'
  },
  live_action: {
    english_translated: 'English-translated',
    idol_promotional_video: 'Idol/Promotional Video',
    non_english_translated: 'Non-English-translated',
    raw: 'Raw'
  },
  pictures: {
    graphics: 'Graphics',
    photos: 'Photos'
  },
  software: {
    applications: 'Applications',
    games: 'Games'
  }
} as const

export type FilterSearch = {
    anime: ['anime_music_video', 'english_translated', 'non_english_translated', 'raw'],
    audio: ['lossless', 'lossy'],
    literature: ['english_translated', 'non_english_translated', 'raw'],
    live_action: ['english_translated', 'idol_promotional_video', 'non_english_translated', 'raw'],
    pictures: ['graphics', 'photos'],
    software: ['applications', 'games']
}

export type NestedKeys<T> = T extends Array<infer U>
    ? `${U & string}`
    : T extends Record<string, unknown> 
    ? { [K in keyof T]: `${K & string}.${NestedKeys<T[K]>}` | `${K & string}` }[keyof T]
    : never;

export type FilterSearchPaths = NestedKeys<FilterSearch>