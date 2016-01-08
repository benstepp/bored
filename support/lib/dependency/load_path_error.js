class LoadPathError extends Error {
  constructor (path, error, stack) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.error = error
    this.path = path
    this.name = this.constructor.name
  }

  get message () {
    return `Directory ${this.path} passed to Dependency::Resolver was not resolved.
    Native FileSystem module error: ${this.error}`
  }

}

export { LoadPathError }
