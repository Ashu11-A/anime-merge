'use client'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

// export const { getClient: getAnilist } = registerApolloClient(() => {
//   return new NextSSRApolloClient({
//     cache: new NextSSRInMemoryCache(),
//     link: new HttpLink({
//       uri: 'https://graphql.anilist.co/',
//       fetchOptions: {
//         method: 'POST'
//       },
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       }
//     })
//   })
// })

export const clientAnilist = new ApolloClient({
  uri: 'https://graphql.anilist.co/',
  cache: new InMemoryCache()
})

export function getSeason(): 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER' {
  const date = new Date()
  const month = date.getMonth()

  let season: 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER'

  if (month >= 3 && month <= 5) {
    season = 'SPRING'
  } else if (month >= 6 && month <= 8) {
    season = 'SUMMER'
  } else if (month >= 9 && month <= 11) {
    season = 'FALL'
  } else {
    season = 'WINTER'
  }

  return season
}


export const listAnimes = (options: {
  page?: number,
  perPage?: number,
  season?: 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER',
  seasonYear?: number
  search?: string
  nsfw?: boolean
}) => {
  const { page, perPage, season, seasonYear, search, nsfw } = options
  return gql`query {
    Page(page: ${page ?? 1}, perPage: ${perPage ?? 25}) {
      media(
${search !== undefined && search !== ''
    ? `search: "${search}"`
    : `season: ${season ?? getSeason()}, seasonYear: ${seasonYear ?? new Date().getFullYear()}, ${nsfw ? 'isAdult: true' : 'isAdult: false'}`
}, type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
      }
    }
  }
  `
}

export function getAnime(options: {
  id: string
}) {
  const { id } = options
  return gql(`query {
    Media(id: ${id}) {
      id
      title {
        romaji
        english
      }
      description
      bannerImage
      coverImage {
        large
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      status
      genres
      tags {
        name
        description
      }
      episodes
      popularity
    }
  }`)
}