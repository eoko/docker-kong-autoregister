const kong = require('./getKong');

class Api {

  constructor(name, endpoint) {
    this.kong     = kong;
    this.name     = name;
    this.endpoint = endpoint;
  }

  /**
   * Register an API
   * @return {Promise.<Object>}
   */
  register(retry = 3) {
    return kong
      .post(`/apis`, {
        upstream_url: `http://${this.name}.service.consul`,
        uris: this.endpoint,
        preserve_host: false,
        name: this.name
      })
      .catch(err => {
        if (err.statusCode === 409) {
          return kong.get(`/apis/${this.name}`);
        }
        throw err;
      })
  }

  unregister() {
    return kong.delete(`/apis/${this.name}`).then(() => true);
  }
}

module.exports = Api;