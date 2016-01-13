import VM from 'vm'

const Babel = require('babel-core')

class Dependency {

  constructor (file) {
    this.file = file
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

}

export { Dependency }
