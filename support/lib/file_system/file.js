import NodeFileSystem from 'fs'
import Bluebird from 'bluebird'

const FileSystem = Bluebird.promisifyAll(NodeFileSystem)
const UTF8 = 'utf-8'

class File {

  constructor (path) {
    this.path = path
    this.resolved = false
  }

  async resolve () {
    if (!this.resolved) {
      this.stats = await this.check_file()
      this.exists = this.validate_file_existence()
      this.content = await this.fetch_content()
      this.resolved = true
    }
  }

  validate_file_existence() {
    return this.stats !== undefined
  }

  check_file () {
    return FileSystem.statAsync(this.path)
             .catch(error => {})
  }

  fetch_content() {
    if (this.exists) {
      return this.read_file()
    }
  }

  read_file () {
    return FileSystem.readFileAsync(this.path, UTF8)
  }

}

export { File }
