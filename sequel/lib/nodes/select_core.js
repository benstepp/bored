import { JoinSource } from './join_source'

class SelectCore {

  constructor() {
    this.source = new JoinSource
    this.top = null
    this.set_quantifier = null
    this.projections = []
    this.wheres = []
    this.groups = []
    this.havings = []
    this.windows = []
  }

}

export { SelectCore }
