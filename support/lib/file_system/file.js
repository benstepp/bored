import { FileSystem } from './native'
import { Base } from './base'

const UTF8 = 'utf-8'

class File extends Base {

  constructor (path) {
    super(path)
    this.resolved = false
  }

  async resolve () {
    if (!this.resolved) {
      await this.check_file()
      this.content = await this.fetch_content()
      this.resolved = true
    }
  }

  fetch_content() {
    if (this.exists) {
      return this.read_file()
    }
  }

  read_file () {
    return FileSystem.readFileAsync(this.path, UTF8)
  }

  set_short_path(path) {
    this.short_path = this.path.replace(path, '').replace(/^\//, '')
  }

}

export { File }
