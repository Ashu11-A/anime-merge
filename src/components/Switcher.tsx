import { Switch } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export function Switcher(options: {
  localPath: string,
  label: string
}) {
  const { label, localPath } = options
  const [active, setActive] = useState(false)

  function switchValue() {
    localStorage.setItem(localPath, String(!active))
    setActive((prev) => !prev)
  }

  useEffect(() => {
    const active = localStorage.getItem('showNSFW')

    if (active) setActive(JSON.parse(active) === true)
  }, [])

  return (
    <div className='flex flex-col gap-2'>
      <Switch isSelected={active} onValueChange={() => switchValue()}>
        {label}
      </Switch>
    </div>
  )
}