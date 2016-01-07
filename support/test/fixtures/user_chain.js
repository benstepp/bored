class Base {

  base_method() {

  }

}

class User extends Base {

  user_method() {

  }

}

class Manager extends User {

  manager_method() {

  }

}

class Admin extends Manager {

  admin_method() {

  }

}

export { Base }
export { User }
export { Manager }
export { Admin }
