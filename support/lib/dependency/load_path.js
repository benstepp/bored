import Path from 'path'
import { FileResolver } from './file_resolver'
import { Directory } from '../file_system'
import { LoadPathError } from './load_path_error'

class LoadPath {

  constructor (path) {
    this.path = path
    this.directory = new Directory(path)
  }

  resolve () {
    return this.directory.resolve()
    .then(this.validate.bind(this))
    .then(this.resolve_files.bind(this))
  }

  validate () {
    if (!this.directory.exists) {
      throw new LoadPathError(this.directory.path, this.directory.error)
    }
  }

  resolve_files () {
    const files = Promise.all(this.directory.files.map(file_or_directory => {
      const resolver = new FileResolver(this.full_path(file_or_directory))
      return resolver.resolve()
    }))
    this.files = files
    return files
  }

  full_path (path) {
    return Path.resolve(this.path, path)
  }

}

export { LoadPath }
