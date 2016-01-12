import Path from 'path'

const LoadPath = Support.Dependency.LoadPath
const fixture_path = Path.resolve(__dirname, '..', 'fixtures')

describe('LoadPath', () => {
  it('exists as a class', () => {
    expect(LoadPath).to.not.equal(undefined)
    expect(LoadPath).to.be.a('function')
    expect(new LoadPath).to.not.throw
  })

  describe('#resolve', () => {
    it('has a list of files', async () => {
      const load_path = new LoadPath(fixture_path)
      await load_path.resolve()

      expect(load_path.files).to.not.equal(undefined)
    })
  })
})
