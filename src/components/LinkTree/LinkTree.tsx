import { useEffect, useState } from 'react'

import Link from './Link'

interface LinkType {
  title: string
  subtitle: string
  link: string
}

const Links: LinkType[] = [
  {
    title: 'GitHub',
    subtitle: 'My open-source projects',
    link: 'https://github.com/bycym'
  },
  {
    title: 'LinkedIn',
    subtitle: 'Professional Work',
    link: 'https://www.linkedin.com/in/%C3%A1ron-benk%C3%B3czy-889b4291/'
  }
]

export default function LinkTree() {
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(false)
  }, [])
  return (
    <>
      {isLoading ? (
        <a className='cyberpunk glitched'>loading...</a>
      ) : (
        <ul>
          {Links?.map((link: LinkType) => (
            <Link {...{ inputLink: link }}></Link>
          ))}
        </ul>
      )}
    </>
  )
}
