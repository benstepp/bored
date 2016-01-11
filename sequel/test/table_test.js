const Table = Sequel.Table
let table

describe('Table', () => {
  beforeEach(() => {
    table = new Table('users')
  })

  describe('#constructor', () => {
    it('exists as a class', () => {
      expect(Table).to.not.equal(undefined)
      expect(Table).to.be.a('function')
      expect(new Table).to.not.throw
    })
  })

  describe('#project', () => {
    it('returns a SelectManager', () => {
      const manager = table.project('*')
      expect(manager).to.be.instanceof(Sequel.Managers.SelectManager)
    })
  })
})
