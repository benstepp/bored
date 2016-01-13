import VM from 'vm'

class Context {

  constructor () {
    this.$sandbox = {}
    this.$injected = {
      console: console,
      exports: {}
    }
  }

  inject (klass) {
    console.log(klass)
  }

  add (klass) {
    console.log(klass)
  }

  get sandbox () {
    return Object.assign({}, this.$sandbox, this.$injected)
  }

  get contextified_sandbox () {
    return VM.createContext(this.sandbox)
  }

}

export { Context }
