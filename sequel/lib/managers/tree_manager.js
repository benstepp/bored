class TreeManager {

  constructor() {
    this.ctx = undefined
    this.bind_values = []
  }

  where(expression) {
    if (expression instanceof this.constructor) {
      expressin = expression.ast
    }
    this.ctx.wheres.push(expression)
    return this
  }

}

export { TreeManager }
