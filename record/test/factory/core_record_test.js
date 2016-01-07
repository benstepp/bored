const CoreRecord = Record.Factory.CoreRecord
const Core = Record.Core

describe('CoreRecord', () => {
  it('exists', () => {
    expect(CoreRecord).to.not.equal(undefined)
    expect(CoreRecord).to.be.a('function')
  })

  it('can be constructed with a name', () => {
    expect(new CoreRecord('User')).to.not.throw
  })

  describe('get #core_klass', () => {
    it('returns a new Function', () => {
      const core = new CoreRecord('User')
      expect(core.core_klass).to.be.instanceof(Function)
    })
  })

  describe('get #klass_name_descriptor', () => {
    it('returns an object property descriptor', () => {
      const core = new CoreRecord('User')
      expect(core.klass_name_descriptor).to.be.a('object')
    })

    it('has a value including the original class name', () => {
      const core = new CoreRecord('User')
      expect(core.klass_name_descriptor.value).to.include('User')
    })
  })

  describe('get #klass', () => {
    it('returns a class(function)', () => {
      const core = new CoreRecord('User')
      expect(core.klass).to.be.a('function')
    })

    it('returns a class with a name including the original', () => {
      const core = new CoreRecord('User')
      expect(core.klass.name).to.include('User')
    })

    it('has a prototype of Record.Core', () => {
      const core = new CoreRecord('User')
      const klass = core.klass
      expect(Core.isPrototypeOf(klass)).to.equal(true)
    })
  })
})
