import { Node } from './node'

class And extends Node {

  constructor(children) {
    super()
    this.children = children
  }

  accept(visitor, collector) {
    return visitor.visit_And(this, collector)
  }

  left() {
    return this.children[0]
  }

  right() {
    return this.children[1]
  }

}

export { And }
