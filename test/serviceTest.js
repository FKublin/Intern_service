const {ServiceClass} = require('../serviceClass')
const {assert} = require('chai')
const {ServiceStatus} = require('../symbolConstants')

describe('Environment', ()=>{
    it('is ready', ()=>{
        assert.isTrue(true);
    })
})

describe('Service class', ()=>{
    it('is a function', ()=>{
        assert(ServiceClass instanceof Function)        
    })

    it('creates an object', ()=>{
        const instance = new ServiceClass()
        assert(instance instanceof ServiceClass)
    })

    it('get status returns STARTED', ()=>{
        const instance = new ServiceClass()
        assert.equal(instance.status, ServiceStatus.STARTED, 'should be STARTED')
    })

    it('subscribe checks if handlers are functions', ()=>{
        //const testObject = 'value'
        const instance = new ServiceClass()
        const tester = () => instance.subscribe( {})
        assert.throws(tester, 'Handler is not a function')
    })

    it('subscribe adds handlers correctly', ()=>{
        function handler1(){}
        const instance = new ServiceClass()
        instance.subscribe(handler1)
        assert.isTrue(instance.handlers.includes(handler1), 'Handlers should include handler1')
    })

    it('send checks if data is an object', ()=> {
        const instance = new ServiceClass()
        const tester = () => instance.send(()=>{})
        assert.throws(tester, 'Data is not an object')
    })

    it('send returns true if an object is passed', ()=>{
        const instance = new ServiceClass()
        assert(instance.send({}), 'Send should return true')
    })

    it('receive runs functions provided by handlers', ()=>{
        const instance = new ServiceClass()
        function handler1(input){console.log(input)}
        function handler2(){
            console.log('test')
            throw(new Error('Exception'))
        }
        function handler3(input){console.log(input)}
        instance.subscribe(handler1)
        instance.subscribe(handler2)
        instance.subscribe(handler3)
        const testObject = {text: 'testMSG'}
        assert.isTrue(instance.receive(testObject), 'fuckup')

    })
})