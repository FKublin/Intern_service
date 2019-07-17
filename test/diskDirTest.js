const fs = require('fs')
const {DiscDirectory} = require('../discDirectoryClass')
const {assert} = require('chai')
const {ServiceStatus} = require('../symbolConstants')
const {ActionSymbols} = require('../symbolConstants')

describe('Disc Directory', ()=>{
    it('ask returns true as a result', ()=>{
        const testDir = 'C:\\Users\\Filip\\Desktop\\testFolder'
        function testFun(value){console.log(value)}
        const instance = new DiscDirectory(testDir)
        instance.subscribe(testFun)
        const testObject = {action : ActionSymbols.LOAD, newPath : testDir}

        
        
        assert.isTrue(instance.ask({action : ActionSymbols.LOAD, newPath : testDir}), 'ask to return true')
    })

    it('ask checks if path already exists', ()=>{
        const instance = new DiscDirectory('')
        
        instance.content.set('key', 'value')
        function testFun1(value){console.log(value)}
        instance.subscribe(testFun1)
        
        assert.equal(instance.ask({action: ActionSymbols.LOAD, newPath : 'key'}), 'key', 'ask failed to check')
    })

    it('respond responds to changes in observed files', ()=>{
        const testDir = 'C:\\Users\\Filip\\Desktop\\testFolder'
        const instance = new DiscDirectory(testDir)
        function testFun1(value){console.log(value)}
        instance.subscribe(testFun1)
        fs.writeFileSync('C:\\Users\\Filip\\Desktop\\testFolder\\newText.txt', '')
        //instance.ask({action : ServiceStatus.LOAD, newPath : testDir})

          
        setTimeout(() => {
            fs.unlink('C:\\Users\\Filip\\Desktop\\testFolder\\newText.txt', (err)=>{console.log(err)})
        }, 2000)

        setTimeout(()=>{

            assert.isFalse(fs.existsSync('C:\\Users\\Filip\\Desktop\\testFolder\\newText.txt'), 'unlink failed')
        }, 3000)
        

    })

    it('ask with UNLOAD clears a watcher and a path from content', ()=>{
        const testDir = 'C:\\Users\\Filip\\Desktop\\testFolder'
        const instance = new DiscDirectory(testDir)
        function testFun1(value){console.log(value)}
        instance.subscribe(testFun1)
        setTimeout(()=>{
            instance.ask({action : ActionSymbols.UNLOAD, newPath : testDir})
        }, 1000)
            
        setTimeout(()=>{
            assert.isEmpty(instance.content.get(testDir), 'UNLOAD failed to empty')
        }, 3000)

    })
})

