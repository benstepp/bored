import { LoadPathSet } from './load_path_set'

class Resolver {

  constructor(...load_paths) {
    this.load_paths = new LoadPathSet(load_paths)
  }

  async resolve() {
    await this.load_paths.resolve()
  }

  get files() {
    const files = []
    this.load_paths.forEach(load_path => {
      files.push(...load_path.files)
    })
  }

}

export { Resolver }
