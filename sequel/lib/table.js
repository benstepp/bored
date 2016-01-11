import { SelectManager } from './managers'

class Table {

  constructor(table_name) {
    this.name = table_name
  }

  project(...projections) {
    return this.from().project(...projections)
  }

  from() {
    return (new SelectManager(this))
  }

}

export { Table }
