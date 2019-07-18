const fs = require('fs')
const {DiscDirectory} = require('../discDirectoryClass')
const {assert} = require('chai')
const {ActionSymbols} = require('../symbolConstants')

describe('DiscDirAsync', ()=>{
    it('ask executes asynchronously', async ()=>{
        const testDir = 'C:\\Users\\Filip\\Desktop\\testFolder'
        const instance = new DiscDirectory(testDir)
        function testFun1(value){console.log(value)}
        instance.subscribe(testFun1)
        const dir2 = 'C:\\Users\\Filip\\Desktop\\testFolder2'

        await instance.ask({action: ActionSymbols.LOAD, newPath : dir2})
        assert.exists(instance.content.has(dir2))
        await instance.ask({action: ActionSymbols.UNLOAD, newPath : dir2})
        assert.isFalse(instance.content.has(dir2))
    })

    it('stop clears closes watchers and clears content', async ()=>{
        const testDir = 'C:\\Users\\Filip\\Desktop\\testFolder'
        const instance = new DiscDirectory(testDir)
        function testFun1(value){console.log(value)}
        instance.subscribe(testFun1)
        const dir2 = 'C:\\Users\\Filip\\Desktop\\testFolder2'

        await instance.ask({action: ActionSymbols.LOAD, newPath : dir2})

        await instance.stop()
        assert.isEmpty(instance.content, 'stop failed to empty content')

    })


})