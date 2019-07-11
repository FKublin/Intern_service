const {ServiceClass} = require('./serviceClass')
const fs = require('fs')
const chokidar = require('chokidar')

class discDirectory extends ServiceClass{

    constructor(config){
        super()
        this.path = config
        this.content = new Map()
        this.send(this.path)
        this.watchers = []
        var testVar = 'receive is called'
        this.getter = ()=> testVar
    }

    send(newPath){
        
        this.path = newPath
        if(this.content.has(newPath))
        {     
            return newPath
        }
        else
        {
            
            
            const options = {withFileTypes: true}
            fs.readdir(this.path, options, (err, fileArray) =>{
                
                this.receive(fileArray)
            })
            return true
        }
    }

    receive(files){
        console.log(this.getter())
        const watcher = chokidar.watch(this.path)
        
        const map = new Map()
        try{
            for(let file of files){
                map.set(file.name, file)
            }
            watcher.on('add', changedPath=>{
                this.content.set(changedPath, {map, watcher})
            })
            watcher.on('change', changedPath=>{
                this.content.set(changedPath, {map, watcher})
            })
            watcher.on('unlink', changedPath=>{
                this.content.delete(changedPath)
                watcher.close()
            })
            this.content.set(this.path, {map, watcher})

            super.receive(this.content)
        
        
        }
        catch(e)
        {
            console.log(e)
        }
    }

    
    
}



exports.DiscDirectory = discDirectory