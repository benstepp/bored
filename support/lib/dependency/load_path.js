import { Directory } from '../file_system'
import { LoadPathError } from './load_path_error'
import { Walker } from './walker'

class LoadPath {

  constructor (path) {
    this.path = path
    this.directory = new Directory(path)
  }

  resolve () {
    return this.directory.resolve()
    .then(() => this.validate())
    .then(() => this.walk())
  }

  validate () {
    if (!this.directory.exists) {
      throw new LoadPathError(this.directory.path, this.directory.error)
    }
  }

  walk () {
    this.walker = new Walker(this.directory)
    return this.walker.walk()
  }

  get files () {
    return this.walker.files
  }

}

export { LoadPath }
