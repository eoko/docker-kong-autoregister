const Kong = require('@eoko/kong-client');

const baseUrl    = process.env.KONG_URL;
const apiKey     = process.env.KONG_API_KEY;
const apiKeyName = process.env.KONG_API_KEYNAME;

const kong = new Kong({ baseUrl, apiKey, apiKeyName });

module.exports = kong;