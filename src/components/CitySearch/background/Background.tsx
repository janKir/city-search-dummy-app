import { cn } from '@/lib/utils'
import { Parallax } from './parallex/Parallax'
import { StaticBackground } from './static/StaticBackground'

interface BackgroundProps {
  className?: string
}

const isParallaxEnabled = import.meta.env.VITE_ENABLE_PARALLAX === 'true'

export function Background({ className }: BackgroundProps) {
  if (isParallaxEnabled) {
    return <Parallax className={cn('relative', className)} />
  }

  return <StaticBackground className={cn('fixed', className)} />
}
