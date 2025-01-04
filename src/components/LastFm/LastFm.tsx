import './LastFm.css'

// import 'style/cyberpunk.css'
import {
  getTopArtists,
  type getTopArtistsResponse,
  type TopArtist
} from 'lib/top-artists'
import { type JSX, useEffect, useLayoutEffect, useState } from 'react'

import Artist from './Artist'

export default function LastFm({
  children,
  count: initialCount
}: {
  children: JSX.Element
  count: number
}) {
  const [data, setData] = useState<TopArtist[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [count, setCount] = useState(initialCount)
  const add = () => setCount((i) => i + 1)
  const subtract = () => setCount((i) => i - 1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTopArtists()
        setData(result)
        console.dir(result)
      } catch (error) {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  return (
    <>
      {isLoading ? (
        <a className='cyberpunk glitched'>loading...</a>
      ) : (
        <ul>
          {data?.map((artist: TopArtist) => (
            <Artist {...{ inputArtist: artist }}></Artist>
          ))}
        </ul>
      )}
    </>
  )
}
