import Path from 'path'

const fixture_path = Path.resolve(__dirname, '..', 'fixtures')
const Resolver = Support.Dependency.Resolver

describe('Resolver', () => {
  it('exists as a class', () => {
    expect(Resolver).to.not.equal(undefined)
    expect(Resolver).to.be.a('function')
  })

})
