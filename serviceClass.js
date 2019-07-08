class serviceClass {
    
    constructor(field)
    {
        this.field = field
    }
    start(config){}
    stop(reason){}
    request(params){}
    send(data){}
}

exports.ServiceClass = serviceClass