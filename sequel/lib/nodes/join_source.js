import { Binary } from './binary'

class JoinSource extends Binary {

  constructor(source, join_operands = []) {
    super(source, join_operands)
  }

  get empty() {
    return !this.left && right.empty
  }

}

export { JoinSource }
