import Path from 'path'

const fixture_path = Path.resolve(__dirname, '..', 'fixtures')
const nonexistent_path = Path.resolve(__dirname, '..', 'nonexistent_folder')
const Directory = Support.FileSystem.Directory

describe('Directory', () => {
  it('exists as a class', () => {
    expect(Directory).to.not.equal(undefined)
    expect(Directory).to.be.a('function')
  })

  describe('exists', () => {
    it('is true for real folders', async () => {
      const directory = new Directory(fixture_path)
      await directory.resolve()
      expect(directory.exists).to.eq(true)
    })

    it('is false for not real folders', async () => {
      const directory = new Directory(nonexistent_path)
      await directory.resolve()
      expect(directory.exists).to.eq(false)
    })
  })

  describe('files', () => {
    it('is an array of strings for a real directory', async () => {
      const directory = new Directory(fixture_path)
      await directory.resolve()
      expect(directory.files).to.be.an('array')
      directory.files.forEach(file => {
        expect(file).to.be.a('string')
      })
    })
  })
})
