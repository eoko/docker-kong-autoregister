#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const Joi  = require('joi');

const cmd      = argv['_'][0];
const hostname = argv['hostname'];
const kongurl  = argv['kong-url'];
const file     = require(argv['file']);

process.env.KONG_URL = kongurl;

const Api = require('./src/api');

switch (cmd) {
  case 'validate':
    validate();
    break;
  case 'reload':
    reload();
    break;
  case 'register':
    register();
    break;
  case 'unregister':
    unregister();
    break;
  default:
    throw new Error('Not found command');
}

function validate(service) {
  const schema = Joi
    .object()
    .keys({
      name: Joi
        .string()
        .alphanum()
        .required(),
      endpoint: Joi
        .string()
        .required(),
      port: Joi
        .number()
        .integer()
        .required()
    });

  const result = Joi.validate(service, schema);

  if (result.error) {
    console.warn('Your configuration file "${serviceSrc}" is not valid for the following reason(s) :');
    console.warn(result.error.details.forEach(detail => console.log(`  - ${detail.message}`)));
  } else {
    console.info(`You configuration file "${serviceSrc}" is valid.`);
  }
}

function reload() {
  throw new Error('Reload is not implemented.');
}

function register() {
  console.info(`Registering new service "${service.name}"`);
  const api = new Api(service.name, service.endpoint);

  return api.register();
}

/**
 * @todo handle unregister for API & Upstream
 */
function unregister() {
  throw new Error('Unregister is not implemented.');
}