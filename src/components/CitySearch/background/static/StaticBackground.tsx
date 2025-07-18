import { cn } from '@/lib/utils'
import { StaticUrbanSilhouettes } from './StaticUrbanSilhuettes'
import { StaticWorldMapBackground } from './StaticWorldMapBackground'

interface StaticBackgroundProps {
  className?: string
}

export function StaticBackground({ className }: StaticBackgroundProps) {
  return (
    <div className={cn('top-0 left-0 h-screen w-screen', className)}>
      <StaticWorldMapBackground />

      <StaticUrbanSilhouettes />
    </div>
  )
}
