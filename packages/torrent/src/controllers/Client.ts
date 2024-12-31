import { exec, spawn, type ChildProcessWithoutNullStreams } from 'child_process'
import { chmod, stat } from 'fs/promises'
import { platform } from 'os'
import { basename, dirname } from 'path'

type ClientOptions = {
  directory: string
  port?: number
  singleThread?: boolean
  workerThreads?: number
  concurrentInitLimit?: number
}

export class Client {
  private static exec: string
  public readonly directory
  public readonly singleThread
  public readonly workerThreads
  public readonly concurrentInitLimit
  public port
  public child?: ChildProcessWithoutNullStreams
  public version?: string
  private retries = 5

  constructor(options: ClientOptions) {
    this.port = options.port
    this.directory = options.directory
    this.singleThread = options.singleThread
    this.workerThreads = options.workerThreads
    this.concurrentInitLimit = options.concurrentInitLimit
  }

  static setExecPath (path: string) {
    Client.exec = path
  }

  async start () {
    if (!(await this.exist(Client.exec))) throw new Error('rqbit executable not found!')
    chmod(Client.exec, 0o755)

    const rulePath = platform() === 'win32' ? '.\\' : './'
    const version = this.getVersion(await this.execAsync(`${Client.exec} --version`))

    if (this.port === undefined) this.port = this.getRandomPort()
    if (!version) throw new Error('Could not detect rqbit version')
    this.version = version
 
    let attempt = 0
    while (attempt < this.retries) {
      const args = ['--http-api-listen-addr', `127.0.0.1:${this.port}`, 'server', 'start', `${rulePath}${this.directory}`]

      try {
        const child = spawn(`${rulePath}${basename(Client.exec)}`, args, {
          cwd: dirname(Client.exec)
        })
        this.child = child
    
        child.stdout.on('data', (data: Buffer) => {
          console.log('STDOUT:', data.toString())
        })
        
        child.stderr.on('data', (data: Buffer) => {
          console.log(data.toString())
        })

        const result = await new Promise<boolean>((resolve, reject) => {
          child.stdout.on('data', (data: Buffer) => {
            if (data.toString().includes('starting HTTP API at')) {
              setTimeout(() => resolve(true), 2000)
            }
          })

          child.stdout.on('data', (data: Buffer) => {
            if (data.toString().includes('error binding')) reject(false)
          })

          child.on('close', (code) => code === 0
            ? resolve(false)
            : reject(new Error(`Faild start api, with code ${code}`))
          )
        })

        if (result) break
      } catch (error) {
        console.log(`Port start error ${this.port}: ${error}`)
        attempt++
        this.port = this.getRandomPort()

        if (attempt === this.retries) throw new Error('Maximum number of attempts reached. The server could not be started')
      }
    }
  }

  private getRandomPort() {
    return Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024
  }

  private getVersion(content: string) {
    const math = content.match(/\d+\.\d+\.\d+/)
    return math ? math[0] : null
  }

  private execAsync (command: string) {
    return new Promise<string>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) reject(stderr || error)
        resolve(stdout)
      })
    })
  }

  private async exist (path: string) {
    try {
      return (await stat(path)).isFile()
    } catch {
      return false
    }
  }
}