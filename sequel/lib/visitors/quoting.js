class Quoting {

  get column_quote_open() {
    return '\"'
  }

  get column_quote_close() {
    return '\"'
  }

  get table_quote_open() {
    return '\"'
  }

  get table_quote_close() {
    return '\"'
  }

  quote() {

  }

  quote_table_name(name) {
    if(!(name instanceof Nodes.SqlLiteral)) {
      name = `${this.table_quote_open}${name}${this.table_quote_close}`
    }
    return name
  }

}

export { Quoting }
