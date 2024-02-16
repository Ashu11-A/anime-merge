'use client'
import { getAnime } from '@/lib/anilist'
import { useLazyQuery } from '@apollo/client'
import { Media } from 'anilist'
import ReactHtmlParser from 'html-react-parser'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function AnimePage({ params }: { params: { id: string } }) {
  const { id } = params
  const query = getAnime({ id })
  const [getData] = useLazyQuery(query)
  const [anime, setAnime] = useState<Media | undefined>()

  useEffect(() => {
    async function fetchData() {
      setAnime((await getData()).data?.Media)
    }
    fetchData()
  }, [getData])

  return (
    <div>
      {anime
        ? <div className='h-lvh w-lvh bg-transparent dark:bg-black light:bg-white'>
          {anime.bannerImage &&
          <figure className='relative m-0 overflow-hidden'>
            <Image
              alt={anime?.title?.romaji ?? 'Anime Baner'}
              loader={() => String(anime.bannerImage)}
              src={anime.bannerImage}
              className="h-[10rem] w-full rounded-b-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
              width={20} height={770} />
            <figcaption className='flex flex-row ml-16 w-[calc(100%-4rem)'>
              {anime.coverImage?.large &&
              <Image
                alt={anime?.title?.romaji ?? 'Anime Baner'}
                loader={() => String(anime.coverImage?.large)}
                src={anime.coverImage?.large}
                className="h-full w-[10rem] -mt-12 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
                width={20} height={770} />
              }
              <div className='m-5 sm:mr-5 md:mr-10 ld:mr-14 lg:mr-32 text-start text-ellipsis'>
                <h1 className='light:text-gray-600 dark:text-gray-200 text-xl font-mono'>{anime.title?.romaji}</h1>
                {anime.title?.romaji !== anime.title?.english && <h2 className='light:text-gray-600 dark:text-gray-200 text-lg font-sans'>{anime.title?.english}</h2>}
                <p className='text-gray-400 text-ellipsis overflow-hidden text py-5 text-medium'>
                  {ReactHtmlParser(anime.description)}
                </p>

              </div>
            </figcaption>
          </figure>}

        </div>
        : <p>Fetch</p>
      }
    </div>
  )
}