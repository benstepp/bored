import * as Record from '../../'

class ContextInjector {

  constructor (context) {
    this.$context = context
    this.inject()
  }

  inject () {
    if (this.$context.Record === undefined) {
      this.$context.inject('Record', Record)
    }
  }

  get context () {
    return this.$context
  }

}

export { ContextInjector }
