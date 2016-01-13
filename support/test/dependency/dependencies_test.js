import Path from 'path'

const Dependencies = Support.Dependency.Dependencies
const Context = Support.Dependency.Context
const fixture_path = Path.resolve(__dirname, '..', 'fixtures')

describe('Dependencies', () => {
  it('exists as a class', () => {
    expect(Dependencies).to.not.equal(undefined)
    expect(Dependencies).to.be.a('function')
  })

  describe('#constructor(context, load_path)', () => {
    it('doesnt blow up', async () => {
      const context = new Context()
      const dependencies = new Dependencies(context, fixture_path)
      expect(await dependencies.resolve).to.not.throw
    })
  })

  describe('get', () => {
    it('returns the class requested', async () => {
      const context = new Context()
      const dependencies = new Dependencies(context, fixture_path)
      await dependencies.resolve()

      const dependency = await dependencies.get('FileTestClass')
      expect(dependency).to.not.equal(undefined)
      expect(dependency).to.be.a('function')
      expect(dependency.name).to.equal('FileTestClass')
    })
  })
})
