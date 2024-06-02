# Manablox CMS

Manablox CMS is a simple dynamic content management system. 


## Requirements

- Node
- Docker (with compose)


## Setup

Go to the folders ``` packages/server ``` and ``` packages/admin ``` and copy the .env.example files to .env files.

Add following host entries to your hosts file:

``` 
127.0.0.1 api.manablox.test
127.0.0.1 admin.manablox.test
```

Start Manablox with docker compose: ``` docker compose -f docker-compose.dev.yml up -d ```
