import { FileSystem } from './native'
import { File } from './file'
import { Base } from './base'

class Directory extends Base {

  constructor (path) {
    super(path)
    this.resolved = false
  }

  async resolve() {
    if (!this.resolved) {
      await this.check_file()
      this.files = await this.fetch_files()
      this.resolved = true
    }
  }

  resolve_with_files() {

  }

  validate_existence () {
    return super.validate_existence() && this.stats.isDirectory()
  }


  fetch_files() {
    if (this.exists) {
      return this.read_directory()
    }
  }

  read_directory() {
    return FileSystem.readdirAsync(this.path)
  }

}

export { Directory }
