const {ServiceClass} = require('./serviceClass')
const fs = require('fs')
const chokidar = require('chokidar')
const {ServiceStatus} = require('./symbolConstants')
const {ActionSymbols} = require('./symbolConstants')

class discDirectory extends ServiceClass{

    constructor(config){
        super()
        this.content = new Map()
        //this.askAsync(ActionSymbols.LOAD, {newPath : config})
        
    
    }


    async askAsync(action, {newPath}){


        switch(action){
            case ActionSymbols.LOAD : {

                if(this.content.has(newPath)) {   
                    return new Promise((resolve, reject) => {
                        resolve(this.content.get(newPath))
                    })
                }
                else{
                    return new Promise((resolve, reject) => {
                        const options = {withFileTypes: true}
                        fs.readdir(newPath, options, (err, fileArray) => {
                            this.respond(fileArray, newPath)
                            resolve(true)
                        })
                    })
                }
            }
    
            case ActionSymbols.UNLOAD : {

                return new Promise((resolve, reject) => {
                    try{
                        this.content.delete(newPath)
                        resolve(true)
                    }
                    catch(err){
                        reject(err)
                    }

                })

            }
        }

    }


    respond(files, newPath){
  
        const map = new Map()
        try{
            for(let file of files){
                map.set(file.name, file)
            }
            const watcher = chokidar.watch(newPath)
            console.log(`Created a watcher for ${newPath}`)
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
            this.content.set(newPath, {map, watcher})

            super.respond(this.content)

        }
        catch(e)
        {
            console.log(e)
        }
    }

    async stop(){

        const stopWatchers = new Promise((resolve, reject)=>{
            for(let element of this.content.values()){
                element.watcher.close()
            }
            resolve(true)
        })
        await stopWatchers
        this.content.clear()
        super.stop()
        
    }

    contentFromJSON(newPath){
        fs.readFile(newPath, (err, newContent) => {
            if(err){
                return err
            }
            try{
                const JSONobject = JSON.parse(newContent)
                for(JSONkey of Object.keys(JSONobject)){
                    this.content.set(JSONkey, JSONobject[JSONkey])
                }
                
            }
            catch(err){
                return err
            }

            
        })

    }

    ask({action, newPath}){

        return new Promise((resolve, reject) =>{
           switch(action){
               case ActionSymbols.LOAD:{
                   if(this.content.has(newPath))
                   {     
                       resolve(newPath)
                   }
                   else
                   {
           
                       const options = {withFileTypes: true}
                       fs.readdir(newPath, options, (err, fileArray) =>{
                           
                           this.respond(fileArray)
                       })
                       resolve(true)
                   }
                   
               }break
               
               case ActionSymbols.UNLOAD : {
                   const closeWatchers = new Promise((resolve, reject)=>{
                       this.content.get(newPath).watcher.close()
                       resolve(true)
                   })

                   closeWatchers.then(this.content.delete(newPath))
                   

                   resolve(true)
               } 
           }
           
       })
   }
   

    
    
}
exports.DiscDirectory = discDirectory