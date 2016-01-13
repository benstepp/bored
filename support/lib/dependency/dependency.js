import VM from 'vm'
import { Inflector } from '../inflector'

const Babel = require('babel-core')

class Dependency {

  constructor (file) {
    this.file = file
    this.klass_name = Inflector.camelize(file.short_path)
  }

  resolve () {
    return this.file.read_file()
    .then(contents => this.create_script(contents))
    .then(() => this)
  }

  create_script (contents) {
    const transformed = Babel.transform(contents, this.babel_options)
    this.script = new VM.Script(transformed.code)
  }

  get babel_options () {
    return {
      plugins: [
        'syntax-object-rest-spread',
        'transform-async-to-generator',
        'transform-decorators',
        'transform-es2015-spread',
        'transform-es2015-modules-commonjs',
        'transform-es2015-parameters',
        'transform-export-extensions'
      ]
    }
  }

  run (context) {
    const runable_context = context.contextified_sandbox
    try {
      const result = this.script.runInContext(runable_context)
      context.add(this.klass_name, result)
      return result
    } catch (error) {
      return this.handle_runtime_error(error, context)
    }
  }

  handle_runtime_error (error, context) {
    if (error.name === 'ReferenceError') {
      const missing_klass = error.message.replace(/\s.*$/, '')
      context.add_unresolved(missing_klass)
      return this.run(context)
    }
  }

}

export { Dependency }
