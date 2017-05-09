const chai           = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

require('dotenv').load(__dirname + '/./env.test');

const Api = require('./../src/api');

describe('Api', function () {

  describe('Api', function () {
    const apiSample = new Api('sample', '/sample');
    let previous;

    it('Should registrer an api', function () {
      return apiSample
        .register()
        .then(res => previous = res)
        .should
        .eventually
        .be
        .an('object')
    });

    it('Should not registrer an api twice with an error', function () {
      return apiSample
        .register()
        .should
        .eventually
        .be
        .deep
        .equal(previous)
    });

    it('Should unregister an api', () => {
      return apiSample
        .unregister()
        .should
        .eventually
        .be
        .equal(true)
    })
  })

});
