import { Dependency } from 'tays-support'
import { ContextInjector } from './context_injector'

class ModelFactory {

  /**
   * Context is usually a reference to the Application's context, but
   * may be omitted if Record is not being used with the rest of the
   * framework
   */
  constructor (context = new Dependency.Context()) {
    this.context = new ContextInjector(context).context
    this.load_paths = []
    this.models = {}
  }

  resolve () {
    return this.dependencies.resolve()
    .then(() => this.define_models())
  }

  /**
   * Adds load paths that the ModelFactory instance can use. This
   * will create a new dependencies resolver and require that the
   * models be redefined.
   */
  add_load_path (...load_paths) {
    this.load_paths.push(...load_paths)
    this.dependencies = new Dependency.Dependencies(this.context, ...this.load_paths)
    return this.resolve()
  }

  /**
   */
  define_models () {
    for (let dependency in this.dependencies.dependencies) {
      this.dependencies.get(dependency.replace(/\.js$/, ''))
      .then(klass => this.define_klass(klass))
    }
  }

  define_klass (klass) {
    console.log(klass)
  }

  get (model_name) {
    return ''
  }

}

export { ModelFactory }
