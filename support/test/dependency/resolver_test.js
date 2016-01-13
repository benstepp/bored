import Path from 'path'

const fixture_path = Path.resolve(__dirname, '..', 'fixtures')
const Resolver = Support.Dependency.Resolver

describe('Resolver', () => {
  it('exists as a class', () => {
    expect(Resolver).to.not.equal(undefined)
    expect(Resolver).to.be.a('function')
  })

  describe('#resolve', () => {
    it('adds dependencies to the resolver', async () => {
      const resolver = new Resolver(fixture_path)
      await resolver.resolve()

      expect(resolver.dependencies).to.not.equal(undefined)
      expect(resolver.dependencies).to.be.a('object')
    })
  })

  describe('#get(dependency)', () => {
    it('returns a dependency', async () => {
      const resolver = new Resolver(fixture_path)
      await resolver.resolve()
      const dependency = await resolver.get('FileTestClass')

      expect(dependency).to.not.equal(undefined)
      expect(dependency).to.be.instanceof(Support.Dependency.Dependency)
    })
  })

})
