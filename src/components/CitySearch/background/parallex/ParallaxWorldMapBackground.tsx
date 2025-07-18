import worldMapSilhouette from '@/assets/world-map-silhouette.svg'
import { ParallaxItemProps } from './types'

export function ParallaxWorldMapBackground({
  scrollY,
  factor,
  offset = 0
}: ParallaxItemProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 opacity-20"
      style={{
        transform: `scale(150%) translateY(${offset - scrollY * factor}px)`,
        backgroundImage: `url("${worldMapSilhouette}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  )
}
