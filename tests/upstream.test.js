const chai           = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

require('dotenv').load(__dirname + '/./env.test');

const Upstream = require('./../src/upstream');

describe('Upstream', function () {

  describe('Upstream', function () {
    const upstreamSample = new Upstream('sample');
    let previous;

    it('Should registrer an upstream', function () {
      return upstreamSample
        .register()
        .then(res => previous = res)
        .should
        .eventually
        .be
        .an('object')
    });

    it('Should not registrer an upstream twice with an error', function () {
      return upstreamSample
        .register()
        .should
        .eventually
        .be
        .deep
        .equal(previous)
    });

    it('Should check if already exist', () => {
      return upstreamSample
        .isRegistered()
        .should
        .eventually
        .be
        .equal(true)
    });

    it('Should unregister an upstream', () => {
      return upstreamSample
        .unregister()
        .should
        .eventually
        .be
        .equal(true)
    })
  })

});
