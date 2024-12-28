import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/explore')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings/discovery"!</div>
}
