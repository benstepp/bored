class Dependency {

  constructor (file) {
    this.file = file
  }

  resolve () {
    return this.file.read_file()
    .then(contents => this.create_script(contents))
  }

  read_file () {
    return this.file.read_file()
  }

  create_script (contents) {
    console.log(contents)

  }

}

export { Dependency }
