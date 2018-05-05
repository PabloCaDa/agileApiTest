# THEAM SMALL SHOP API

This API works as a mangament system for users and costumers in a Small Shop. It will provide resources to a CRM
Front-End client. The Api will only by accessible by a registered user, that's why we implement a authorization and authentication services. 

There are two resources that can be invoked: **costumers** and **users**.

**Costumers**: Every registered user can manipulate this resource by doing the next actions: 

    • List all costumers in the DB.
    • Get one constumer in concrete.
    • Create a new costumer.
    • Update a costumer's information.
    • Delete a costumer in the DB.

**Users**: Only users with *admin permission* can manage this resource by doing the next actions: 

    • List all users in DB.
    • Get one user in concrete.
    • Create a new costumer.
    • Update a costumer's information.
    • Delete a costumer in the DB


## Getting Started

Clone the repository to your workspace 
```
git clone https://github.com/PabloCaDa/agileApiTest
```
Install npm packages

```
npm i
```

And Run the API

```
npm run dev
```

**By default the API runs on:** *localhost:5000*

## Using the API 

### Auth

The first step to reach the resources of the API is to **authenticate yourself** by doing: 

```
POST api/auth/login
```
 Providing a valid username and password, the API will sent you a token that you have to add to your header requests on the field **authorization**. Be aware, even if your user and password are correct, if you don't add this token to your headers you will never pass through the authorization middleware. 

 In the **users' folder** you will find some default users with different permissions, feel free to play with them.

**For a better explanation of the authorization POST, go to** */docs/auth/signin*

### Costumers

Once you are authorizated, you can access to this resource, this are the **endpoints** for each action:

- **Get all costumers**: 
```
GET api/customers
```

- **Get one costumer**: 
```
GET api/customers/id
```

- **Create a customer**: 
```
POST api/customers
```

- **Delete a costumer**: 
```
DELETE api/customers/id
```

- **Update a costumer**: 
```
PATCH api/customers/id
```

**For a better explanation of the costumers endpoints, go to** */docs/costumers*


### Users

**Remember!** You can only access this resources logged as an admin user. Here comes the **endpoints**:

- **Create a user**: 

```
POST api/users
```

- **Get all users**: 
```
GET api/users
```

- **Get one user**: 
```
GET api/users/id
```

- **Delete a user**: 
```
DELETE api/users/id
```

- **Update a user**: 
```
PATCH /users/id
```
**For a better explanation of the users endpoints, go to** */docs/users*
