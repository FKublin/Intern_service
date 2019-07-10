const {ServiceClass} = require('./serviceClass')
const fs = require('fs')

class discDirectory extends ServiceClass{

    constructor(config){
        super()
        this.path = config
        this.content = new Map()
    }

    send(path){
        this.path = path
        if(this.content.has(path))
        {
            return this.path
        }
        else
        {
            fs.readdir(path, options.withFileTypes = true, receive(err, files))
            return true
        }

    }

    receive(err, files){
        const map = new Map()
        files.forEach(file =>{
            map.set(file.name, file)
        })
        this.content.set(this.path, map)
        super.receive(this.content)
    }

}

exports.disc = serviceClass