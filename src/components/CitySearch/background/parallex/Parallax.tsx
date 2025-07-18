import { useCallback, useEffect } from 'react'
import { ParallaxWorldMapBackground } from './ParallaxWorldMapBackground'
import { ParallaxUrbanSilhouettes } from './ParallaxUrbanSilhuettes'
import { useScrollY } from '../../ScrollYContext'

interface ParallaxProps {
  className?: string
}

export function Parallax({ className }: ParallaxProps) {
  const [scrollY, setScrollY] = useScrollY()

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    setScrollY(scrollTop)
  }, [setScrollY])

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
      <ParallaxWorldMapBackground
        scrollY={scrollY}
        offset={200}
        factor={0.02}
      />

      <ParallaxUrbanSilhouettes scrollY={scrollY} offset={200} factor={0.2} />
    </div>
  )
}
