import { Resolver } from './resolver'

class Dependencies {

  constructor (context, load_paths) {
    this.context = context
    this.load_paths = load_paths
    this.resolver = new Resolver(load_paths)
  }

  resolve () {
    return this.resolver.resolve()
  }

  get (dependency_name) {
    return this.resolver.get(dependency_name)
    .then(dependency => dependency.run(this.context))
    .then(result => result)
  }

}

export { Dependencies }
