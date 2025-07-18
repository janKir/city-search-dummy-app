import bicycleSvg from '@/assets/bicycle.svg'
import buildingSvg from '@/assets/building.svg'
import carSvg from '@/assets/car.svg'
import treeSvg from '@/assets/tree.svg'

const urbanSilhouettes = [bicycleSvg, buildingSvg, carSvg, treeSvg]

export function StaticUrbanSilhouettes() {
  return (
    <div className="absolute bottom-0 mb-10 flex h-[100px] w-screen flex-row justify-evenly gap-4">
      {urbanSilhouettes.map((element) => (
        <img
          key={element}
          className={`pointer-events-none z-20  h-[100px] opacity-15`}
          src={element}
          // style={{
          //   transform: `translateY(${offset - scrollY * factor}px) scale(${
          //     element.size
          //   })`,
          //   top: `${element.top}px`,
          //   left: `${element.left}%`,
          //   width: baseWidth,
          //   height: baseWidth
          // }}
        />
      ))}
    </div>
  )
}
