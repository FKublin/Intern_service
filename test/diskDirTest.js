const fs = require('fs')
const {DiscDirectory} = require('../discDirectoryClass')
const {assert} = require('chai')

describe('Disc Directory', ()=>{
    it('ask returns true as a result', ()=>{
        const testDir = 'C:\\Users\\Filip\\Desktop\\testFolder'
        function testFun(value){console.log(value)}
        const instance = new DiscDirectory(testDir)
        instance.subscribe(testFun)
        
        assert.isTrue(instance.ask(testDir), 'ask to return true')
    })

    it('ask checks if path already exists', ()=>{
        const instance = new DiscDirectory('')
        
        instance.content.set('key', 'value')
        
        assert.equal(instance.ask('key'), 'key', 'ask failed to check')
    })

    it('respond responds to changes in observed files', ()=>{
        const testDir = 'C:\\Users\\Filip\\Desktop\\testFolder'
        //assert.isTrue(fs.existsSync('C:\\Users\\Filip\\Desktop\\testFolder\\newText.txt'), 'writeFile failed')
        const instance = new DiscDirectory(testDir)
        function testFun(value){console.log(value)}
        instance.subscribe(testFun)
        fs.writeFileSync('C:\\Users\\Filip\\Desktop\\testFolder\\newText.txt', '')
        instance.ask(testDir)

          

        // fs.unlinkSync('C:\\Users\\Filip\\Desktop\\testFolder\\newText.txt');
        // assert.isFalse(fs.existsSync('C:\\Users\\Filip\\Desktop\\testFolder\\newText.txt'), 'unlink failed')
        

    })
})