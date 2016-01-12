import { FileSystem } from './native'
import { Base } from './base'

class Directory extends Base {

  constructor (path) {
    super(path)
    this.resolved = false
  }

  resolve () {
    if (!this.resolved) {
      return this.check_file()
      .then(this.fetch_files.bind(this))
    }
  }

  validate_existence () {
    return super.validate_existence() && this.stats.isDirectory()
  }

  fetch_files () {
    if (this.exists) {
      return this.read_directory()
      .then(this.set_files.bind(this))
    }
  }

  set_files (files) {
    this.files = files
  }

  read_directory () {
    return FileSystem.readdirAsync(this.path)
  }

}

export { Directory }
