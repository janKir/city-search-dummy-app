import worldMapSilhouette from '@/assets/world-map-silhouette.svg'
import { cn } from '@/lib/utils'

export function StaticWorldMapBackground() {
  return (
    <img
      src={worldMapSilhouette}
      className={cn(
        'pointer-events-none fixed inset-0 w-screen z-10 opacity-20',
        'object-cover object-center'
      )}
    />
  )
}
