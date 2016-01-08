import { LoadPathError } from './load_path_error'
import { Directory } from '../file_system'

class LoadPathSet {

  constructor(...load_paths) {
    this.load_paths = load_paths
    this.files = {}
  }

  async resolve() {
    this.map_paths_to_directories()
    await this.resolve_directories()
    await this.validate_directories()
  }

  map_paths_to_directories() {
    this.load_paths = this.load_paths.map(load_path => {
      return new Directory(load_path)
    })
  }

   resolve_directories() {
    return Promise.all(this.load_paths.map(directory => {
      return directory.resolve()
    }))
  }

  validate_directories() {
    this.load_paths.forEach(directory => {
      if (!directory.exists) {
        throw new LoadPathError(directory.path, directory.error)
      }
    })
  }

}

export { LoadPathSet }
