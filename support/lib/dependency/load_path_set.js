import { LoadPath } from './load_path'

class LoadPathSet {

  constructor (...load_paths) {
    this.load_paths = load_paths.map(load_path => { return new LoadPath(load_path) })
    this.files = {}
  }

  resolve () {
    return Promise.all(this.load_paths.map(load_path => {
      return load_path.resolve()
    }))
  }

}

export { LoadPathSet }
