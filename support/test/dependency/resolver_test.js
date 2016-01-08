import Path from 'path'

const Resolver = Support.Dependency.Resolver
const LoadPathError = Support.Dependency.LoadPathError
const fixture_path = Path.resolve(__dirname, '..', 'fixtures')

describe('Resolver', () => {
  it('exists as a class', () => {
    expect(Resolver).to.not.equal(undefined)
    expect(Resolver).to.be.a('function')
  })

  describe('#constructor', () => {
    it('accepts any number of load paths', () => {
      expect(new Resolver('a')).to.not.throw
      expect(new Resolver('a', 'b')).to.not.throw
      expect(new Resolver('a', 'b', 'c')).to.not.throw
    })
  })

  describe('resolve', () => {
    it('converts load paths to directory objects', async () => {
      const resolver = new Resolver(fixture_path)
      await resolver.resolve()
      resolver.load_paths.forEach(load_path => {
        expect(load_path).to.be.instanceOf(Support.FileSystem.Directory)
      })
    })

    it('throws on bad directories', async () => {
      const bad_path = Path.resolve(fixture_path, 'nonexistent_directory')
      const resolver = new Resolver(bad_path)

      try {
        await resolver.resolve()
      } catch(error) {
        expect(error).to.not.equal(undefined)
        expect(error).to.be.instanceOf(LoadPathError)
      }
    })
  })
})
