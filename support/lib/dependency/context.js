import VM from 'vm'

class Context {

  constructor () {
    this.$sandbox = {}
    this.$injected = {
      console: console,
      exports: {}
    }
    this.$unresolved = {}
  }

  inject (klass_name, klass) {
    this.$injected[klass_name] = klass
  }

  /**
   * Add a class definition to this sandbox
   */
  add (klass_name, klass) {
    const pieces = klass_name.split('.')
    let current = this.$sandbox
    pieces.forEach(piece => {
      current = current[piece] || {}
    })
    current = klass
    return klass
  }

  /**
   * Adds to the set of unresolved items. This is similar to native
   * require behaviour and circular dependencies. This just allows the
   * file to be executed the first time in the hopes that later the
   * dependency it requires will be available on the $sandbox.
   */
  add_unresolved (klass_name) {
    this.$unresolved[klass_name] = new Function()
  }

  /**
   * Returns a copy of the $sanbox, the $injected items and the
   * $unresolved items to be used to create a VM Contextified Sanebox.
   */
  get sandbox () {
    return Object.assign({}, this.$sandbox, this.$injected, this.$unresolved)
  }

  /**
   * Returns a new Contextified Sanbox to be used by the VM to run
   * code in the context described by this class.
   */
  get contextified_sandbox () {
    return VM.createContext(this.sandbox)
  }

}

export { Context }
