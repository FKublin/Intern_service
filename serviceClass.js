const {ServiceStatus} = require('./symbolConstants')
const assert = require('assert')

class serviceClass {
    constructor(config){
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

    receive(data){
        for (let fun of this.handlers){
            try
            {
                fun(data)    
            }
            catch
            {
                throw('Unable to complete function')
            }
        }
    }
    
}

exports.ServiceClass = serviceClass