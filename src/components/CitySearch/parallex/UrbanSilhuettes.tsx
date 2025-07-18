import bicycleSvg from '@/assets/bicycle.svg'
import buildingSvg from '@/assets/building.svg'
import carSvg from '@/assets/car.svg'
import treeSvg from '@/assets/tree.svg'

import { ParallaxItemProps } from './types'
import { useEffect, useState } from 'react'

interface UrbanElement {
  id: number
  type: UrbanType
  top: number
  left: number
  size: number
}

const urbanTypes = {
  bicycle: bicycleSvg,
  building: buildingSvg,
  car: carSvg,
  tree: treeSvg
}
type UrbanType = keyof typeof urbanTypes
const urbanTypesList = Object.keys(urbanTypes) as UrbanType[]

const baseWidth = 200

export function UrbanSilhouettes({
  scrollY,
  factor,
  offset = 0
}: ParallaxItemProps) {
  const [urbanElements, setUrbanElements] = useState<UrbanElement[]>([])
  // Generate urban silhouettes
  useEffect(() => {
    const contentContainer = document.getElementById('app-container')
    const totalHeight = Math.max(contentContainer?.offsetHeight ?? 0, 2000)

    console.log('total height', totalHeight, contentContainer?.offsetHeight)

    const nextElements = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      type: urbanTypesList[i % urbanTypesList.length],
      top: Math.random() * totalHeight + 100, //px
      left: Math.random() * 80 + 10, // percent
      size: Math.random() * 0.5 + 0.5
    }))
    setUrbanElements(nextElements)
  }, [])

  return urbanElements.map((element) => (
    <img
      key={element.id}
      className={`pointer-events-none fixed z-20 opacity-15`}
      src={urbanTypes[element.type]}
      style={{
        transform: `translateY(${offset - scrollY * factor}px) scale(${
          element.size
        })`,
        top: `${element.top}px`,
        left: `${element.left}%`,
        width: baseWidth,
        height: baseWidth
      }}
    />
  ))
}
