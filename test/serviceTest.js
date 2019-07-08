const assert = require('assert')
const service = require('../serviceClass')
const {ServiceClass} = require('../serviceClass')
const chai = require('chai')

describe('Environment', ()=>{
    it('is ready', ()=>{
        assert(true)
    })
})

describe('Service class', ()=>{
    it('is a function', ()=>{
        
        assert(ServiceClass instanceof Function)
        
    })
    it('creates an object', ()=>{
        const instance = new ServiceClass('test')
        assert(instance instanceof ServiceClass)
    })
})