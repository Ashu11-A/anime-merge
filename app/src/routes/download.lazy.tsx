import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/download')({
  component: RouteComponent,
})


function RouteComponent() {
  return <div></div>
}
