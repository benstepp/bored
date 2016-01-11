TODO: Write a framework that doesn't blow goat ass

router needs a dependency resolver
record needs a dependncy resolver

main app
new ApplicationContext
- record:deps /app/models --inject decorators
  * context --shared
  * inject application.context, .cwd
  - router:deps /app/controllers
  * context --shared
  - view:deps /app/views, /app/components, /app/templates
  * context  --shared

  LoadPath
  has_many Files

  Resolver {
  new(app = new App) //context/cwd/register_resolver for to_prepare
    load_path with files
    scripts from load_path.files
    reload_files!
  }

  Application {
  context
  cwd
  initializer
  register_resolver(Resolver)
  }

Framework.Application
  - new RecordInstance
Support.Dependency.Resolver
Support.Dependency.Context
Support.Dependency.Script
Support.Dependency.Decorator
Support.Dependency.LoadPathSet
Support.Dependency.LoadPath
Support.FileSystem.Directory
Support.FileSystem.File
