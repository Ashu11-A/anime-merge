import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/preferences')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings/preferences"!</div>
}
