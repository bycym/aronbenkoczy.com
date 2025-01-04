// import './LeftPane.css'

import { type JSX, useState } from 'react'

import AlbumReference from '../AlbumReference/AlbumReference'
export default function LeftPane(
  {
    // children,
    // count: initialCount
  }: {
    // children: JSX.Element
    // count: number
  }
) {
  // const [count, setCount] = useState(initialCount)
  // const add = () => setCount((i) => i + 1)
  // const subtract = () => setCount((i) => i - 1)

  return (
    <>
      <div className='left-pane-root'>
        <a>Left Pane</a>
        <AlbumReference></AlbumReference>
      </div>
    </>
  )
}
