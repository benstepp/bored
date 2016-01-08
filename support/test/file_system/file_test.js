import Path from 'path'

const fixture_path = Path.resolve(__dirname, '..', 'fixtures')
const file_path = Path.resolve(fixture_path, 'file_test_class.js')
const non_existent_path = Path.resolve(fixture_path, 'non_existent_file.js')
const File = Support.FileSystem.File

describe('File', () => {
  it('exists as a class', () => {
    expect(File).to.not.equal(undefined)
    expect(File).to.be.a('function')
  })

  describe('constructor', () => {
    it('saves off the file path', () => {
      const file = new File(file_path)
      expect(file.path).to.equal(file_path)
    })
  })

  describe('#file_stats', () => {
    it('exists on a real file', async () => {
      const file = new File(file_path)
      await file.resolve()

      expect(file.stats).to.not.equal(undefined)
      expect(file.exists).to.equal(true)
    })

    it('doesnt exist on a nonexistent file', async () => {
      const file = new File(non_existent_path)
      await file.resolve()

      expect(file.stats).to.equal(undefined)
      expect(file.exists).to.equal(false)
    })
  })

  describe('content', () => {
    it('is a string for a real file', async () => {
      const file = new File(file_path)
      await file.resolve()
      expect(file.content).to.be.a('string')
      expect(file.content).to.include('class FileTestClass')
    })

    it('does not exist for a non existent file', async () => {
      const file = new File(non_existent_path)
      await file.resolve()
      expect(file.content).to.equal(undefined)
    })
  })
})
