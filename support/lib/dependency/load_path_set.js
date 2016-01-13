import { LoadPath } from './load_path'

class LoadPathSet {

  constructor (...load_paths) {
    this.load_paths = load_paths.map(load_path => new LoadPath(load_path))
  }

  resolve () {
    return Promise.all(this.load_paths.map(load_path => load_path.resolve()))
    .then(() => this.attach_files())
  }

  attach_files () {
    this.files = this.load_paths.map(load_path => load_path.files)
  }

}

export { LoadPathSet }
