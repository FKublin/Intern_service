const {ServiceStatus} = require('./symbolConstants')
const assert = require('assert')

class serviceClass {
    constructor(){

        this._status = ServiceStatus.STARTED
        this.handlers = []
    }

    get status(){
        return this._status
    }

    stop(){
        this._status = ServiceStatus.STOPPED
        this.handlers.length = 0
    }

    subscribe(handler){
        assert(typeof handler === 'function', 'Handler is not a function')
        this.handlers.push(handler)
    }

    send(data){
        assert(typeof data === 'object' &&  data !== null && typeof data !== 'function', 'Data is not an object')
        return true
    }

    errorHandler(error)
    {
        console.log(error)
    }

    receive(data){
        assert(typeof data === 'object' &&  data !== null && typeof data !== 'function', 'Data is not an object')
        for (let fun of this.handlers){
            try
            {
                fun(data)    
            }
            catch (e)
            {
                this.errorHandler(e)
            }
        }
        return true
    }
    
}

exports.ServiceClass = serviceClass