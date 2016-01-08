import { Core } from '../core'

class CoreRecord {

  constructor (klass_name = '') {
    this.klass_name = klass_name
    this.generate_klass()
  }

  generate_klass () {
    this.klass = this.core_klass
    this.set_klass_prototype()
    this.set_klass_name()
  }

  set_klass_prototype () {
    Reflect.setPrototypeOf(this.klass, Object.create(Core))
  }

  set_klass_name () {
    Reflect.defineProperty(this.klass, 'name', this.klass_name_descriptor)
  }

  get core_klass () {
    return Reflect.construct(Function)
  }

  get klass_name_descriptor () {
    return {
      value: `__${this.klass_name}__`
    }
  }

}

export { CoreRecord }
