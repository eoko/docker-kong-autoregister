const chai           = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

require('dotenv').load(__dirname + '/./env.test');

const Upstream = require('./../src/upstream');
const Target   = require('./../src/target');

const upstreamSample = new Upstream('sample');

describe('Target', function () {

  before(() => upstreamSample.register());
  after(() => upstreamSample.unregister());

  describe('Target', function () {
    const targetSample = new Target('sample', '10.0.0.1', 3000);

    it('Should registrer a target', function () {
      return targetSample
        .register()
        .should
        .eventually
        .be
        .an('object')
    });

    it('Should check if already exist', () => {
      return targetSample
        .isRegistered()
        .should
        .eventually
        .be
        .equal(true)
    });

    it('Should unregister an upstream', () => {
      return targetSample
        .unregister()
        .should
        .eventually
        .be
        .equal(true)
    })
  })

});
