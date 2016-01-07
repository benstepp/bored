import { Base, User, Manager, Admin } from '../fixtures'

const PrototypeChain = Support.Meta.PrototypeChain

describe('PrototypeChain', () => {
  it('exists', () => {
    expect(PrototypeChain).to.not.equal(undefined)
    expect(PrototypeChain).to.be.a('function')
  })

  it('can be construced', () => {
    expect(new PrototypeChain(User)).to.not.throw
    expect(new PrototypeChain(User)).to.be.an('object')
  })

  describe('get #chain', () => {
    it('returns an array', () => {
      const chain = new PrototypeChain(User)
      expect(chain.chain).to.be.an('array')
    })
  })

  describe('#add_to_chain()', () => {
    it('adds a class to the current chain', () => {
      const chain = new PrototypeChain(User)
      chain.$chain = []
      chain.add_to_chain(User)
      expect(chain.chain).to.include(User)
    })
  })

  describe('get #chain_has_prototype', () => {
    it('returns false if null is in the chain', () => {
      const chain = new PrototypeChain(User)
      chain.$chain = [null]
      expect(chain.chain_has_prototype).to.eq(false)
    })

    it('returns true if null is not in the chain', () => {
      const chain = new PrototypeChain(User)
      chain.$chain = [User, Base, {}]
      expect(chain.chain_has_prototype).to.eq(true)
    })
  })

  describe('User Chain', () => {
    it('always ends in null', () => {
      const chain_user = (new PrototypeChain(User)).chain
      const chain_manager = (new PrototypeChain(Manager)).chain
      const chain_admin = (new PrototypeChain(Admin)).chain

      expect(chain_user[chain_user.length - 1]).to.equal(null)
      expect(chain_manager[chain_manager.length - 1]).to.equal(null)
      expect(chain_admin[chain_admin.length - 1]).to.equal(null)
    })

    it('integration for user', () => {
      const chain_user = (new PrototypeChain(User)).chain
      expect(chain_user).to.eql([User, Base, Function.prototype, {}, null])
    })

    it('integration for manager', () => {
      const chain_manager = (new PrototypeChain(Manager)).chain
      expect(chain_manager).to.eql([Manager, User, Base, Function.prototype, {}, null])
    })

    it('integration for user', () => {
      const chain_admin = (new PrototypeChain(Admin)).chain
      expect(chain_admin).to.eql([Admin, Manager, User, Base, Function.prototype, {}, null])
    })
  })
})
