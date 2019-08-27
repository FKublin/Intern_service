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
        

        instance.ask({action : ActionSymbols.LOAD, newPath : testDir}).then((result) =>{assert.isTrue(result, 'ask to return true')})
        
        // assert.isTrue(result, 'ask to return true')
    })

    it('ask checks if path already exists', ()=>{
        const instance = new DiscDirectory('')
        
        instance.content.set('key', 'value')
        function testFun1(value){console.log(value)}
        instance.subscribe(testFun1)
        instance.ask({action: ActionSymbols.LOAD, newPath : 'key'}).then((result)=>{assert.equal(result, 'key', 'ask failed to check')})
        
    })

    it('respond responds to changes in observed files', ()=>{
        const testDir = 'C:\\Users\\Filip\\Desktop\\testFolder'
        const instance = new DiscDirectory(testDir)
        function testFun1(value){console.log(value)}
        instance.subscribe(testFun1)
        const dir2 = 'C:\\Users\\Filip\\Desktop\\testFolder2'
        instance.ask({action : ServiceStatus.LOAD, newPath : dir2}).then(() => {console.log('something')})


        // fs.writeFileSync('C:\\Users\\Filip\\Desktop\\testFolder\\newText.txt', '')

          
        // setTimeout(() => {
        //     fs.unlink('C:\\Users\\Filip\\Desktop\\testFolder\\newText.txt', (err)=>{console.log(err)})
        // }, 2000)

        // setTimeout(()=>{

        //     assert.isFalse(fs.existsSync('C:\\Users\\Filip\\Desktop\\testFolder\\newText.txt'), 'unlink failed')
        // }, 3000)
        

    })

    it('ask with UNLOAD clears a watcher and a path from content', ()=>{
        const testDir = 'C:\\Users\\Filip\\Desktop\\testFolder'
        const instance = new DiscDirectory(testDir)
        function testFun1(value){console.log(value)}
        instance.subscribe(testFun1)
        
        instance.ask({action : ActionSymbols.UNLOAD, newPath : testDir}).then(()=>assert.isEmpty(instance.content.get(testDir), 'UNLOAD failed to empty'))
        

    })
})

