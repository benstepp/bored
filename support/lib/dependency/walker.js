import Path from 'path'
import { File, Directory } from '../file_system'
import { FileResolver } from './file_resolver'

class Walker {

  /**
   * Invoked by the LoadPath which validates that the path is a
   * directory capable of being walked.
   */
  constructor (directory, parent = this) {
    this.parent = parent
    this.directory = directory
    this.files = []
  }

  /**
   * Walks the directory to resolve all nested files. Returns a
   * Promise and attaches all Files to this object.
   */
  walk () {
    return this.directory.read_directory()
    .then(() => this.resolve_files())
    .then(files => this.attach_files(files))
  }

  /**
   * Resolves a list of files or directories into File or Directory
   * instances.
   */
  resolve_files () {
    return Promise.all(this.directory.files.map(file => {
      const resolver = new FileResolver(Path.resolve(this.directory.path, file))
      return resolver.resolve()
    }))
  }

  /**
   * Attach the nested files to this object.
   */
  attach_files (files) {
    return Promise.all(files.map(file => this.attach_file(file)))
  }

  /**
   * Attaches files to this objects, otherwise begins a walk of a
   * nested directory.
   */
  attach_file (file_or_directory) {
    if (file_or_directory instanceof File) {
      file_or_directory.set_short_path(this.parent.directory.path)
      return this.files.push(file_or_directory)
    } else if (file_or_directory instanceof Directory) {
      return this.walk_nested_directory(file_or_directory)
    }
  }

  /**
   * Create a new instance of a walker, then attach the files to the
   * parent walker. The files are then carried up the chain the the
   * top level walker that the Load Path instantiated.
   */
  walk_nested_directory (directory) {
    const walker = new Walker(directory, this.parent)
    return walker.walk()
    .then(() => this.parent.files.push(...walker.files))
  }

}

export { Walker }
