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
127.0.0.1 api.public.manablox.test
127.0.0.1 admin.manablox.test
127.0.0.1 files.manablox.test
```

Start Manablox with docker compose: ``` docker compose -f docker-compose.dev.yml up -d ```

Go to http://admin.manablox.test

### Create first user

Go to http://api.manablox.test/graphql

and run the ```signUp``` mutation

### Getting access token

After you created the user with the signUp mutation, you can obtain an access token with the ```signIn``` query.

### Upload files

The file upload is handled through the manablox-files service, which is located at http://files.manablox.test

the upload is running through a multipart form post to the endpoint http://files.manablox.test/upload/:space

The space parameter is a spaceId. The space must be created before in the admin or through the createSpace mutation.

You will also need an access token to be able to upload files.
