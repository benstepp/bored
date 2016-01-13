import Path from 'path'

class Inflector {

  /**
   * Creates an underscored word, all lowercase with a path separator
   * used to replace '.'. This is used to convert Class names and
   * nested class names into path-like structures to be used in a
   * dependency resolver
   *
   * underscore('SomeClass') //=> 'some_class'
   * underscore('Nested.SomeClass') //=> 'nested/some_class'
   *
   */
  static underscore (string) {
    return string
    .replace(/\./g, Path.sep)
    .replace(/([a-z])([A-Z])/g, `$1_$2`)
    .toLowerCase()
  }

}

export { Inflector }
