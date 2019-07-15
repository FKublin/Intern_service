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
        assert.throws(tester, 'Handler must be a function')
    })

    it('subscribe adds handlers correctly', ()=>{
        function handler1(){}
        const instance = new ServiceClass()
        instance.subscribe(handler1)
        assert.isTrue(instance.handlers.includes(handler1), 'Handlers should include handler1')
    })

    it('ask checks if data is an object', ()=> {
        const instance = new ServiceClass()
        const tester = () => instance.ask(()=>{})
        assert.throws(tester, 'Data is not an object')
    })

    it('ask returns true if an object is passed', ()=>{
        const instance = new ServiceClass()
        assert(instance.ask({}), 'ask should return true')
    })

    it('respond runs functions provided by handlers', ()=>{
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
        assert.isTrue(instance.respond(testObject), 'fuckup')

    })
})