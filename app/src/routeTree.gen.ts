/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const MenuLazyImport = createFileRoute('/menu')()
const ExploreLazyImport = createFileRoute('/explore')()
const DownloadLazyImport = createFileRoute('/download')()
const IndexLazyImport = createFileRoute('/')()
const SettingsPreferencesLazyImport = createFileRoute('/settings/preferences')()
const SettingsExploreLazyImport = createFileRoute('/settings/explore')()
const SettingsAboutLazyImport = createFileRoute('/settings/about')()

// Create/Update Routes

const MenuLazyRoute = MenuLazyImport.update({
  id: '/menu',
  path: '/menu',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/menu.lazy').then((d) => d.Route))

const ExploreLazyRoute = ExploreLazyImport.update({
  id: '/explore',
  path: '/explore',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/explore.lazy').then((d) => d.Route))

const DownloadLazyRoute = DownloadLazyImport.update({
  id: '/download',
  path: '/download',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/download.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const SettingsPreferencesLazyRoute = SettingsPreferencesLazyImport.update({
  id: '/settings/preferences',
  path: '/settings/preferences',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/settings/preferences.lazy').then((d) => d.Route),
)

const SettingsExploreLazyRoute = SettingsExploreLazyImport.update({
  id: '/settings/explore',
  path: '/settings/explore',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/settings/explore.lazy').then((d) => d.Route),
)

const SettingsAboutLazyRoute = SettingsAboutLazyImport.update({
  id: '/settings/about',
  path: '/settings/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/settings/about.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/download': {
      id: '/download'
      path: '/download'
      fullPath: '/download'
      preLoaderRoute: typeof DownloadLazyImport
      parentRoute: typeof rootRoute
    }
    '/explore': {
      id: '/explore'
      path: '/explore'
      fullPath: '/explore'
      preLoaderRoute: typeof ExploreLazyImport
      parentRoute: typeof rootRoute
    }
    '/menu': {
      id: '/menu'
      path: '/menu'
      fullPath: '/menu'
      preLoaderRoute: typeof MenuLazyImport
      parentRoute: typeof rootRoute
    }
    '/settings/about': {
      id: '/settings/about'
      path: '/settings/about'
      fullPath: '/settings/about'
      preLoaderRoute: typeof SettingsAboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/settings/explore': {
      id: '/settings/explore'
      path: '/settings/explore'
      fullPath: '/settings/explore'
      preLoaderRoute: typeof SettingsExploreLazyImport
      parentRoute: typeof rootRoute
    }
    '/settings/preferences': {
      id: '/settings/preferences'
      path: '/settings/preferences'
      fullPath: '/settings/preferences'
      preLoaderRoute: typeof SettingsPreferencesLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/download': typeof DownloadLazyRoute
  '/explore': typeof ExploreLazyRoute
  '/menu': typeof MenuLazyRoute
  '/settings/about': typeof SettingsAboutLazyRoute
  '/settings/explore': typeof SettingsExploreLazyRoute
  '/settings/preferences': typeof SettingsPreferencesLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/download': typeof DownloadLazyRoute
  '/explore': typeof ExploreLazyRoute
  '/menu': typeof MenuLazyRoute
  '/settings/about': typeof SettingsAboutLazyRoute
  '/settings/explore': typeof SettingsExploreLazyRoute
  '/settings/preferences': typeof SettingsPreferencesLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/download': typeof DownloadLazyRoute
  '/explore': typeof ExploreLazyRoute
  '/menu': typeof MenuLazyRoute
  '/settings/about': typeof SettingsAboutLazyRoute
  '/settings/explore': typeof SettingsExploreLazyRoute
  '/settings/preferences': typeof SettingsPreferencesLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/download'
    | '/explore'
    | '/menu'
    | '/settings/about'
    | '/settings/explore'
    | '/settings/preferences'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/download'
    | '/explore'
    | '/menu'
    | '/settings/about'
    | '/settings/explore'
    | '/settings/preferences'
  id:
    | '__root__'
    | '/'
    | '/download'
    | '/explore'
    | '/menu'
    | '/settings/about'
    | '/settings/explore'
    | '/settings/preferences'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  DownloadLazyRoute: typeof DownloadLazyRoute
  ExploreLazyRoute: typeof ExploreLazyRoute
  MenuLazyRoute: typeof MenuLazyRoute
  SettingsAboutLazyRoute: typeof SettingsAboutLazyRoute
  SettingsExploreLazyRoute: typeof SettingsExploreLazyRoute
  SettingsPreferencesLazyRoute: typeof SettingsPreferencesLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  DownloadLazyRoute: DownloadLazyRoute,
  ExploreLazyRoute: ExploreLazyRoute,
  MenuLazyRoute: MenuLazyRoute,
  SettingsAboutLazyRoute: SettingsAboutLazyRoute,
  SettingsExploreLazyRoute: SettingsExploreLazyRoute,
  SettingsPreferencesLazyRoute: SettingsPreferencesLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/download",
        "/explore",
        "/menu",
        "/settings/about",
        "/settings/explore",
        "/settings/preferences"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/download": {
      "filePath": "download.lazy.tsx"
    },
    "/explore": {
      "filePath": "explore.lazy.tsx"
    },
    "/menu": {
      "filePath": "menu.lazy.tsx"
    },
    "/settings/about": {
      "filePath": "settings/about.lazy.tsx"
    },
    "/settings/explore": {
      "filePath": "settings/explore.lazy.tsx"
    },
    "/settings/preferences": {
      "filePath": "settings/preferences.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */