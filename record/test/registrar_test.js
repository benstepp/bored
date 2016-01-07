const Registrar = Record.Registrar

describe('Registrar', () => {
  it('exists', () => {
    expect(Registrar).to.not.equal(undefined)
    expect(Registrar).to.be.a('function')
  })

  describe('register', () => {
    it('accepts many paths', () => {
      const registrar = new Registrar
      expect(registrar.register(`${__dirname}/fixtures`)).to.not.throw
      expect(registrar.register(`${__dirname}/fixtures`, `${__dirname}/fixtures2`)).to.not.throw
    })
  })

  describe('#model_paths', () => {
    it('is an array of strings', async () => {
      const registrar = new Registrar
      await registrar.register(`${__dirname}/fixtures`)
      await registrar.register(`${__dirname}/fixtures`, `${__dirname}/fixtures2`)

      await expect(registrar.model_paths).to.be.an('array')
      registrar.model_paths.forEach(async (model_path) => {
        await expect(model_path).to.be.a('string')
      })
    })
  })
})
