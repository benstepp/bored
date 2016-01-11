import { Node } from './node'

class SqlLiteral {

  constructor(string) {
    this.string = string
  }

  toString() {
    return this.string
  }

}

export { SqlLiteral }
