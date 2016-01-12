import Path from 'path'

const LoadPathSet = Support.Dependency.LoadPathSet
const LoadPathError = Support.Dependency.LoadPathError
const fixture_path = Path.resolve(__dirname, '..', 'fixtures')

describe('LoadPathSet', () => {
  it('exists as a class', () => {
    expect(LoadPathSet).to.not.equal(undefined)
    expect(LoadPathSet).to.be.a('function')
  })

  describe('#constructor', () => {
    it('accepts any number of load paths', () => {
      expect(new LoadPathSet('a')).to.not.throw
      expect(new LoadPathSet('a', 'b')).to.not.throw
      expect(new LoadPathSet('a', 'b', 'c')).to.not.throw
    })
  })

  describe('resolve', () => {
    it('converts load paths to loadpath objects', async () => {
      const load_path_set = new LoadPathSet(fixture_path)
      await load_path_set.resolve()
      load_path_set.load_paths.forEach(load_path => {
        expect(load_path).to.be.instanceOf(Support.Dependency.LoadPath)
      })
    })

    it('throws on bad directories', async () => {
      const bad_path = Path.resolve(fixture_path, 'nonexistent_directory')
      const load_path_set = new LoadPathSet(bad_path)

      try {
        await load_path_set.resolve()
      } catch(error) {
        expect(error).to.not.equal(undefined)
        expect(error).to.be.instanceOf(LoadPathError)
      }
    })
  })
})
