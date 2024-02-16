import { ReactNode } from 'react'

export default function LayoutHome({ children }: { children: ReactNode }) {
  return (
    <div className='pt-12 px-24 md:px-12 ld:px-18 lg:px-20 xl:px-24'>
      {children}
    </div>
  )
}