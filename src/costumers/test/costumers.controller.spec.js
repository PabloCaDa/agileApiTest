const { createJAR } = require('../../services/jsonapi')
const costumersController = require('../costumers.controller')
const stubs = require('./stubs')

jest.mock('../costumers.controller', () => () => {
    const { fake } = require('./stubs')
    return {
        getAll: jest.fn(() => fake),
        getByID: jest.fn(() => fake),
        create: jest.fn(() => fake),
        deleteByID: jest.fn(() => fake),
        updateByID: jest.fn(() => fake) 
    }
})

describe('operation routes', () => {
    it('should return all ops from getByID', async () => {
        const req = stubs.createReq()
        const res = stubs.createRes()

        await costumersController.getByID(rea,res)

        expect(res.send).toHaveBeenCalledWith(createJAR('costumer',stubs.fake,stubs.fake))
        expect(Object.entries(costumersController.getByID)).toMatchSnapshot()
    })
})