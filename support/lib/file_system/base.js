import { FileSystem } from './native'

class Base {

  constructor (path) {
    this.path = path
  }

  check_file () {
    return FileSystem.statAsync(this.path)
             .then(this.set_stats.bind(this))
             .catch(this.handle_stats_error.bind(this))
  }

  set_stats (stats) {
    if (stats !== undefined) {
      this.stats = stats
    }
    this.exists = this.validate_existence()
  }

  validate_existence () {
    return this.stats !== undefined
  }

  handle_stats_error (error) {
    this.error = error
    this.exists = this.validate_existence()
  }

}

export { Base }
