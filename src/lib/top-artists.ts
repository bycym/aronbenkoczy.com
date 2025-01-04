import axios from 'axios'

export interface TopArtistImage {
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega'
  '#text': string
}

export interface TopArtist {
  streamable?: string
  image?: TopArtistImage[]
  mbid?: string
  url?: string
  playcount?: string
  '@attr'?: {
    rank: string
  }
  name?: string
}
export interface getTopArtistsResponse {
  topartists?: {
    artist: TopArtist[]
    '@attr': {
      user: string
      totalPages: string
      page: string
      total: string
      perPage: string
    }
  }
}

export const getTopArtists = async (): Promise<TopArtist[]> => {
  let topArtist: TopArtist[] = []
  const response = await axios.get<getTopArtistsResponse>(
    `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&api_key=${import.meta.env.PUBLIC_LAST_FM_API_KEY}&user=${import.meta.env.PUBLIC_LAST_FM_USER}&period=1month&limit=3&format=json`
  )
  if (!response?.data?.topartists?.artist) {
    return topArtist
  }
  const resolveImage: Promise<string>[] = []
  topArtist = topArtist.map((artist: TopArtist) => {})
  Promise.all(resolveImage).then([])

  return response.data.topartists?.artist
}
