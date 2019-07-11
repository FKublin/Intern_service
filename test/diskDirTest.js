const {DiscDirectory} = require('../discDirectoryClass')
const {assert} = require('chai')


describe('Disc Directory', ()=>{
    it('send returns true as a result', ()=>{
        const testDir = 'C:\\Users\\Filip\\Desktop\\testFolder'
        function testFun(value){console.log(value)}
        const instance = new DiscDirectory(testDir)
        instance.subscribe(testFun)
        
        assert.isTrue(instance.send(testDir), 'send to return true')
    })

    it('send checks if path already exists', ()=>{
        const instance = new DiscDirectory('')
        
        instance.content.set('key', 'value')
        
        assert.equal(instance.send('key'), 'key', 'send failed to check')
    })
})