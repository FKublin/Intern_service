const {ServiceClass} = require('./serviceClass')
const fs = require('fs')
const chokidar = require('chokidar')

class discDirectory extends ServiceClass{

    constructor(config){
        super()
        this.path = config
        this.content = new Map()
        this.ask(this.path)
        this.watchers = []
        
    }

    ask(newPath){
        
        this.path = newPath
        if(this.content.has(newPath))
        {     
            return newPath
        }
        else
        {

            const options = {withFileTypes: true}
            fs.readdir(this.path, options, (err, fileArray) =>{
                
                this.respond(fileArray)
            })
            return true
        }
    }

    respond(files){
        
        
        console.log(`Created a watcher for ${this.path}`)
        
        const map = new Map()
        try{
            for(let file of files){
                map.set(file.name, file)
            }
            const watcher = chokidar.watch(this.path)
            watcher.on('add', changedPath=>{
                console.log(`${changedPath} has been added`)
                this.content.set(changedPath, {map, watcher})
            })
            watcher.on('change', changedPath=>{
                console.log(`${changedPath} has been changed`)
                this.content.set(changedPath, {map, watcher})
            })
            watcher.on('unlink', changedPath=>{
                console.log(`${changedPath} has been removed`)
                this.content.delete(changedPath)
            }) 
            watcher.on('unlinkDir', changedPath=>{
                console.log(`${changedPath} has been removed`)
                watcher.close()
            })
            this.content.set(this.path, {map, watcher})

            super.respond(this.content)
            
        
        
        }
        catch(e)
        {
            console.log(e)
        }
    }

    stop(){
        for(let element of this.content.values()){
            element.watcher.close()
        }
        this.content.clear()
        super.stop()
    }

    
    
}
exports.DiscDirectory = discDirectory