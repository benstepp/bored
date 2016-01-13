import { Inflector } from '../inflector'
import { LoadPathSet } from './load_path_set'
import { Dependency } from './dependency'

class Resolver {

  constructor (load_paths) {
    this.load_paths = new LoadPathSet(load_paths)
  }

  resolve () {
    return this.load_paths.resolve()
    .then(() => this.set_dependencies())
  }

  get files () {
    return this.load_paths.files
  }

  set_dependencies () {
    this.dependencies = {}
    this.files.forEach(file => {
      this.dependencies[file.short_path] = new Dependency(file)
    })
  }

  get (dependency_name) {
    const path = `${Inflector.underscore(dependency_name)}.js`
    return this.dependencies[path].resolve()
  }

}

export { Resolver }
