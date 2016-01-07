class Registrar {

  constructor() {
    this.model_paths = []
  }

  async register(...model_paths) {
    await Array.prototype.push.apply(this.model_paths, model_paths)
  }

  verify_model_paths() {

  }

  // turn paths into a set of files

  // feed files into a model registrar
  // have registrar run files in a machine
  // feed info into a record_factory
  // in order of prototype chain
  // define the framework models and save in this class

  // pull model out and use in app
  require_model() {

  }

}

export { Registrar }
