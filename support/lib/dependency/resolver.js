import { LoadPathSet } from './load_path_set'
import { Dependency } from './dependency'

class Resolver {

  constructor (...load_paths) {
    this.load_paths = new LoadPathSet(load_paths)
  }

  resolve () {
    return this.load_paths.resolve()
    .then(() => this.set_dependencies)
  }

  get files () {
    return this.load_paths.files
  }

  set_dependencies () {
    this.dependencies = this.files.map(file => new Dependency(file))
  }

}

export { Resolver }
