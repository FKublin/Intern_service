const fs = require('fs')
const {DiscDirectory} = require('../discDirectoryClass')
const {assert} = require('chai')
const {ActionSymbols} = require('../symbolConstants')

describe('DiscDirAsync', ()=>{

    
    it('askAsync LOAD and UNLOAD executes asynchronously', async ()=>{
        const testDir = 'C:\\Users\\Filip\\Desktop\\testFolder'
        const instance = new DiscDirectory()
        function testFun1(value){console.log(value)}
        instance.subscribe(testFun1)
        const dir2 = 'C:\\Users\\Filip\\Desktop\\testFolder2'

        

        instance.askAsync(ActionSymbols.LOAD, {newPath : testDir})
            .then(() => {assert.isTrue(instance.content.has(testDir), 'testDir failed to load')}).catch((err) => {console.log(err)})
            .then(() => {instance.askAsync(ActionSymbols.LOAD, {newPath : dir2})})
            .then(() => {assert.isTrue(instance.content.has(dir2), 'dir2 failed to load')}).catch((err) => {console.log(err)})

        
    })

    it('stop clears closes watchers and clears content', async ()=>{
        const testDir = 'C:\\Users\\Filip\\Desktop\\testFolder'
        const instance = new DiscDirectory(testDir)
        function testFun1(value){console.log(value)}
        instance.subscribe(testFun1)
        const dir2 = 'C:\\Users\\Filip\\Desktop\\testFolder2'

        instance.askAsync(ActionSymbols.LOAD, {newPath : dir2})
        .then(() => {
            assert.isTrue(instance.content.has(dir2), 'content could not be filled' )
        })
        .catch((err) => {console.log(err)})
        
        
         instance.stop()
        .then(() => {assert.isEmpty(instance.content, 'stop failed to empty content')})

    })




})