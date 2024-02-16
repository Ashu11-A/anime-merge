import { Image, Skeleton } from '@nextui-org/react'

export function SkeletonGrid(options: {
  width: number
  height: number
  count: number
  cols: number
  md?: number
  ld?: number
  lg?: number
  xl?: number
}) {
  const { count, width, height, cols, ld, lg, md, xl } = options

  return (
    <div className={`mt-4 gap-2 grid grid-cols-${cols} md:grid-cols-${md} ld:grid-cols-${ld} lg:grid-cols-${lg} xl:grid-cols-${xl}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className='rounded-2xl'>
          <Image
            alt=""
            className="object-cover"
            height={height}
            src={undefined}
            width={width}
          />
        </Skeleton>
      ))}
    </div>
  )
}