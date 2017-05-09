const kong = require('./getKong');

class Upstream {

  constructor(name, ipOrHostname, port) {
    this.name   = name;
    this.target = port ? `${ipOrHostname}:${port}` : ipOrHostname;
  }

  register() {
    return kong
      .post(`/upstreams/${this.name}/targets`, { target: this.target });
  }

  unregister() {
    return kong
      .get(`/upstreams/${this.name}/targets`)
      .then(res => {
        const targets  = res.data;
        const promises = [];

        targets
          .forEach(target => {
            if (target.target === this.target) {
              promises.push(kong.delete(`/upstreams/${this.name}/targets/${target.id}`))
            }
          });

        return Promise.all(promises);
      });
  }

  isRegistered() {
    return kong
      .get(`/upstreams/${this.name}/targets`)
      .then(res => {
        const targets = res.data;
        return targets
          .some(target => {
            if (target.target === this.target) return true;
          });
      });
  }
}

module.exports = Upstream;