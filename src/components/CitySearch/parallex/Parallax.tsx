import { useCallback, useEffect, useState } from 'react'
import { WorldMapBackground } from './WorldMapBackground'
import { UrbanSilhouettes } from './UrbanSilhuettes'

interface ParallaxProps {
  className?: string
}

export function Parallax({ className }: ParallaxProps) {
  const [scrollY, setScrollY] = useState(0)

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    setScrollY(scrollTop)
  }, [])

  useEffect(() => {
    let ticking = false

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

  return (
    <div className={className}>
      <WorldMapBackground scrollY={scrollY} offset={200} factor={0.02} />

      <UrbanSilhouettes scrollY={scrollY} offset={200} factor={0.2} />
    </div>
  )
}
