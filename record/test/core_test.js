const Core = Record.Core

describe('Core', () => {
  it('exists and is a constructor', () => {
    expect(Core).to.not.equal(undefined)
    expect(Core).to.be.a('function')
  })

  it('can be constructed', () => {
    expect(new Core).to.be.instanceof(Core)
    expect(new Core).to.be.a('object')
  })

  it('can be constructed with a set of attributes', () => {
    const attributes = {}
    expect(new Core(attributes)).to.not.throw
  })

  describe('#new', () => {
    it('is the same as calling the constructor', () => {
      const core_a = new Core()
      const core_b = Core.new()
      expect(core_a).to.eql(core_b)
    })
  })
})
