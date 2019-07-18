const {ServiceClass} = require('./serviceClass')
const fs = require('fs')
const chokidar = require('chokidar')
const {ServiceStatus} = require('./symbolConstants')
const {ActionSymbols} = require('./symbolConstants')

class discDirectory extends ServiceClass{

    constructor(config){
        super()
        this.path = config
        this.content = new Map()
        this.ask({action: ActionSymbols.LOAD, newPath : config})
        this.watchers = []
        this.askAsync = null
        
    }


    ask({action, newPath}){

        return new Promise(async (resolve, reject) =>{
            switch(action){
                case ActionSymbols.LOAD:{
                    this.path = newPath
                    if(this.content.has(newPath))
                    {     
                        resolve(newPath)
                    }
                    else
                    {
            
                        const options = {withFileTypes: true}
                        fs.readdir(this.path, options, (err, fileArray) =>{
                            
                            this.respond(fileArray)
                        })
                        resolve(true)
                    }
                    
                }
                
                case ActionSymbols.UNLOAD : {
                    this.path = newPath
                    // const clearer = this.content.get(newPath)
                    // clearer.watcher.close()
                    const closeWatchers = new Promise((resolve, reject)=>{
                        this.content.get(this.path).watcher.close()
                        resolve(true)
                    })

                    closeWatchers.then(this.content.delete(this.path))
                    

                    resolve(true)
                } 
            }
            
        })
    }
    

    


    respond(files){
  
        const map = new Map()
        try{
            for(let file of files){
                map.set(file.name, file)
            }
            const watcher = chokidar.watch(this.path)
            console.log(`Created a watcher for ${this.path}`)
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

        const stopWatchers = new Promise((resolve, reject)=>{
            for(let element of this.content.values()){
                element.watcher.close()
            }
        })
        stopWatchers.then(()=>{this.content.clear()}).then(()=>{super.stop()})
        
        
    }

    
    
}
exports.DiscDirectory = discDirectory