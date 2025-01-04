import type { TopArtist } from 'lib/top-artists'
import { type JSX, useState } from 'react'
// import './Artist.css';

export interface LinkType {
  title: string
  subtitle: string
  link: string
}

export default function Link({
  inputLink: initialValue
}: {
  inputLink: LinkType
}) {
  const [inputLink, setInputLink] = useState(initialValue)
  return (
    <>
      <li key={inputLink.link} style={{ display: 'inline' }}>
        <p style={{ display: 'inline-grid' }}>
          <a className='cyberpunk'>{inputLink.title}</a>
        </p>
      </li>
    </>
  )
}
