class PrototypeChain {

  constructor(klass) {
    this.klass = klass
  }

  get chain() {
    if (this.$chain === undefined) { this.generate_chain() }
    return this.$chain
  }

  generate_chain() {
    let current_klass = this.klass
    this.$chain = [current_klass]

    while(this.chain_has_prototype) {
      current_klass = this.next_prototype(current_klass)
      this.add_to_chain(current_klass)
    }
  }

  next_prototype(klass) {
    return Reflect.getPrototypeOf(klass)
  }

  add_to_chain(klass) {
    this.$chain.push(klass)
  }

  get chain_has_prototype() {
    return this.$chain.indexOf(null) === -1
  }

}

export { PrototypeChain }
