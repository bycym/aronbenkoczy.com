import type { TopArtist } from 'lib/top-artists'
import { type JSX, useState } from 'react'
// import './Artist.css';

export default function Artist({
  inputArtist: initialValue
}: {
  inputArtist: TopArtist
}) {
  const [inputArtist, setArtist] = useState(initialValue)
  return (
    <>
      <li key={inputArtist.mbid} style={{ display: 'inline' }}>
        <p style={{ display: 'inline-grid' }}>
          <a className='cyberpunk glitched'>{inputArtist.name}</a>
          <img
            src={
              inputArtist.image?.find((value) => value.size === 'medium')?.[
                '#text'
              ]
            }
            alt='artistImage'
          />
        </p>
      </li>
    </>
  )
}
