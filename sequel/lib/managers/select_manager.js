import { TreeManager } from './tree_manager'
import * as Nodes from '../nodes'

class SelectManager extends TreeManager {

  constructor(table) {
    super()
    this.ast = new Nodes.SelectStatement
    this.ctx = this.ast.cores[this.ast.cores.length - 1]
    this.from(table)
  }

  project(...projections) {
    this.ctx.projections.push(...projections.map(projection => {
      if (typeof projection === 'string') {
        projection = new Nodes.SqlLiteral(projection)
      }
      return projection
    }))
    return this
  }

  from(table) {
    if (table instanceof String) { table = new Nodes.SqlLiteral(table) }
    if (table instanceof Nodes.Join) {
      this.ctx.source.right.push(table)
    } else {
      this.ctx.source.left = table
    }
  }
}

export { SelectManager }
