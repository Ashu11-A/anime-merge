import { Download } from '@/lib/download'
import { DownloadType } from '@/types/download'
import { appDataDir, join } from '@tauri-apps/api/path'
import { exists } from '@tauri-apps/plugin-fs'
import { arch, platform } from '@tauri-apps/plugin-os'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect, ReactNode, useCallback } from 'react'
import { Progress } from './ui/progress'
import { useTranslation } from 'react-i18next'

type Loader = {
  name: string;
  progress: number;
  speed: string;
  timeout: boolean
  loaded: boolean;
  download: Download<boolean, DownloadType>;
};

export function SplashScreen({ children }: { children: ReactNode }) {
  const [loaders, setLoaders] = useState<Loader[]>([])
  const [t] = useTranslation()

  const downloadRqbit = useCallback(async () => {
    const path = await join(
      await appDataDir(),
      `rqbit-${platform()}${platform() === 'windows' ? '.exe' : ''}`
    )

    const download = new Download({
      type: DownloadType.GitHub,
      tauri: true,
      path,
      github: {
        latest: true,
        repoOwner: 'ikatson',
        repoName: 'rqbit',
        fileName: platform() === 'windows'
          ? /.exe$/
          : platform() === 'linux'
            ? arch() === 'aarch64'
              ? /-arm64$/
              : arch() === 'arm'
                ? /-arm-v7$/
                : /-amd64$/
            : /-osx-universal$/
      }
    })

    const loader: Loader = {
      name: 'rqbit',
      progress: 0,
      speed: '0 Bytes',
      loaded: false,
      timeout: false,
      download,
    }

    if (await exists(path)) {
      loader.loaded = true
    } else {
      download.onProgress = (percentage, _, transferRate) => {
        setLoaders((currentLoaders) =>
          currentLoaders.map((loader) => {
            if (loader.name === loader.name && !loader.timeout) {
              const updatedLoader = {
                ...loader,
                progress: percentage,
                speed: Download.formatBytes(transferRate),
                timeout: true
              }
      
              setTimeout(() => {
                setLoaders((current) =>
                  current.map((l) =>
                    l.name === loader.name
                      ? { ...l, timeout: false }
                      : l
                  )
                )
              }, 1000)
      
              return updatedLoader
            }
            return loader
          })
        )
      }
      

      download.onComplete = () => {
        setLoaders((currentLoaders) => currentLoaders.map((l) =>
          l.name === loader.name ? { ...l, loaded: true } : l
        )
        )
      }

      download.execute()
    }
    

    setLoaders((currentLoaders) => [...currentLoaders, loader])
  }, [])

  useEffect(() => {
    downloadRqbit()
  }, [])

  const allLoaded = loaders.every((loader) => loader.loaded === true)

  return (
    <AnimatePresence>
      {!allLoaded && loaders.length > 0 && (
        <motion.div
          key="loading-screen"
          className="absolute inset-0 flex justify-center items-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { when: 'afterChildren' } }}
        >
          <div className="flex flex-col lg:w-1/5 lg:h-1/5 w-1/3 h-1/3 justify-center items-center">
            <motion.img
              key="loading-logo"
              src="/public/logo.png"
              alt="Logo"
              className="object-scale-down"
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 1.5,
                ease: 'linear',
              }}
              initial={{ scale: 0 }}
              animate={{ opacity: [1, 0.6], scale: [1, 1.05] }}
              exit={{ opacity: 0.5, zoom: 1.5, transition: { when: 'afterChildren' } }}
              
            />
            {loaders.map((loader, index) => (
              <div key={index} className="w-full flex flex-col gap-2">
                <p className="text-xs">
                  {t('splashscreen.downloading')}: {loader.name}.  {t('splashscreen.speed')}: {loader.speed}
                </p>
                <Progress value={loader.progress} />
              </div>
            ))}
          </div>
        </motion.div>
      )}
      {allLoaded && loaders.length > 0 && <>{children}</>}
    </AnimatePresence>
  )
}
