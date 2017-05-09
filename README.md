Autoregister to Kong
====================

> Simple utility to autoregister an API to Kong in a containerized environment.

It is useful ?
--------------
In fact, this little CLI utility can be mimic using a simple Curl request.
The main goal of this library is to prepare the next steps :

- Being adapter based (not only dedicated to an API exposed through Kong)
- Replace `containerpilot` with a full JS implementation
- Being tight coupled with `pm2`

Usage
-----
This utility works well with `containerpilot` but can be used also with
`registrator` (any other container utility dedicated to manage services
inside container should be compatible).

The following commands are available :

```
# register config
node autoregister register

# unregister config
node autoregister unregister

# reload config
node autoregister reload

# with args
node autoregister register --file /usr/src/app/service.json --kongurl 'kong-8001:8001' --hostname node
```

This is a demo configuration that we can use with `containerpilot` :

```
{
  "consul": "consul:8500",
  // add prestart here!
  "services": [
    {
      "name": "organizations",
      "port": 3000,
      "health": "/usr/bin/curl -o /dev/null -s http://localhost:3000/health",
      "poll": 3,
      "ttl": 10
    }
  ],

  "backends": [
    {
      "name": "kong-8001",
      "poll": 4,
      "onChange": "node /usr/src/app/src/autoregister.js register --file /usr/src/app/service.json --kongurl 'kong-8001:8001' --hostname node"
    }
  ]
}
```