import { Node } from './node'
import { SelectCore } from './select_core'

class SelectStatement extends Node {

  constructor(cores = [new SelectCore]) {
    super()
    this.cores = cores
    this.orders = []
    this.limit = null
    this.lock = null
    this.offset = null
    this.with = null
  }

  accept(visitor) {
    return visitor.visit_SelectStatement(this)
  }

}

export { SelectStatement }
