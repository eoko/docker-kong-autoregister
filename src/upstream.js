const kong = require('./getKong');

class Upstream {

  constructor(name) {
    this.kong = kong;
    this.name = name;
  }

  /**
   * @return {Promise.<Object>}
   */
  register() {
    return kong
      .post('/upstreams', { name : this.name })
      .catch(err => {
        if(err.statusCode === 409) {
          return kong.get(`/upstreams/${this.name}`);
        }
        throw err;
      });
  }

  /**
   *
   * @return {Promise<true>}
   */
  unregister() {
    return kong.delete(`/upstreams/${this.name}`).then(() => true);
  }

  isRegistered() {
    return kong
      .get(`/upstreams/${this.name}`)
      .then(() => true)
      .catch(err => {
        if(err.statusCode === 404) return false;
        throw err;
      });
  }
}

module.exports = Upstream;