import Path from 'path'

class Inflector {

  static underscore (string) {
    return string.replace(/\./g, Path.sep)
    .replace(/([a-z])([A-Z])/g, `$1_$2`)
    .toLowerCase()
  }

}

export { Inflector }
