import Path from 'path'

const ModelFactory = Record.Factory.ModelFactory
const fixture_path = Path.resolve(__dirname, '..', 'fixtures')

describe('ModelFactory', () => {
  it('exists as a class', () => {
    expect(ModelFactory).to.not.equal(undefined)
    expect(ModelFactory).to.be.a('function')
  })

  describe('constructor', () => {
    it('adds a blank context if none provided', () => {
      const model_factory = new ModelFactory()

      expect(model_factory.context).to.not.equal(undefined)
    })

    it('creates a dependencies object when given load path', async () => {
      const model_factory = new ModelFactory()
      await model_factory.add_load_path(fixture_path)

      expect(model_factory.dependencies).to.not.equal(undefined)
    })
  })
})
