export type WrapperErrorProps = {
    error_kind: string,
    human_readable: string,
    status: number,
    status_text: string,
}

export class WrapperError extends Error {
  constructor (public options: WrapperErrorProps) {
    super(options.human_readable, { cause: options.status_text })
  }
}