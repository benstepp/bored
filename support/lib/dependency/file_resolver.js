import { Base, File, Directory } from '../file_system'

class FileResolver extends Base {

  resolve () {
    return this.check_file()
    .then(this.directory_or_file.bind(this))
  }

  directory_or_file () {
    if (this.exists && this.is_directory()) {
      return this.resolved_directory
    } else if (this.exists) {
      return this.resolved_file
    }
  }

  get resolved_file () {
    const file = new File(this.path)
    file.stats = this.stats
    file.resolved = true
    return file
  }

  get resolved_directory () {
    const directory = new Directory(this.path)
    directory.stats = this.stats
    return directory.resolve()
  }

}

export { FileResolver }
