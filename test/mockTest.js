const {assert} = require('chai')

describe('This is a mock test', () => {
    it('true==true', () => {
        assert.isTrue(true, 'environment is compromised')
    })

    it('true!=false', () => {
        assert.isFalse(false, 'environment is compromised')
    })
})