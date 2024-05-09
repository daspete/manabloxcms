# manablox cms

- create a .env file
- start the docker compose instance
- open the playground on http://localhost:3000/graphql

Example query 1:

```graphql
fragment UserFields on User {
  id
  username
  email
}

fragment AssetFields on Asset {
  id
  name
  url
}

fragment ContentFields on Content {
  id
  type
  locale
  parent {
    id
  }
  fields {
    ...ContentFieldFields
  }
}

fragment StringFieldFields on StringField {
  type
  name
  string
}

fragment NumberFieldFields on NumberField {
  type
  name
  number
}

fragment DateFieldFields on DateField {
  type
  name
  date
}

fragment BooleanFieldFields on BooleanField {
  type
  name
  boolean
}

fragment UserRelationFieldFields on UserRelationField {
  type
  name
  user {
    ...UserFields
  }
}

fragment AssetRelationFieldFields on AssetRelationField {
  type
  name
  asset {
    ...AssetFields
  }
}

fragment ContentRelationFieldFields on ContentRelationField {
  type
  name
  content {
    id
    type
    locale
    fields {
      ...StringFieldFields
      ...NumberFieldFields
      ...DateFieldFields
      ...BooleanFieldFields
      ...AssetRelationFieldFields
      ...UserRelationFieldFields
      ... on ContentRelationField {
        type
        name
        content {
          id
        }
      }
    }
  }
}

fragment ContentFieldFields on ContentFieldUnion {
  ...StringFieldFields
  ...NumberFieldFields
  ...DateFieldFields
  ...BooleanFieldFields
  ...AssetRelationFieldFields
  ...UserRelationFieldFields
  ...ContentRelationFieldFields
}

query contents {
  contents {
    ...ContentFields
  }
}
```

Example response:

```json
{
  "data": {
    "contents": [
      {
        "id": "663c670e6c5504d43d3f2202",
        "type": "article",
        "locale": "de",
        "parent": {
          "id": "663c671c6c5504d43d3f2204"
        },
        "fields": [
          {
            "type": "StringField",
            "name": "title",
            "string": "Hello2"
          },
          {
            "type": "BooleanField",
            "name": "isPublished",
            "boolean": false
          },
          {
            "type": "NumberField",
            "name": "timeToRead",
            "number": 1.5
          },
          {
            "type": "UserRelationField",
            "name": "author",
            "user": {
              "id": "6639322feb016cbb28d57cd9",
              "username": "daspete",
              "email": "daspetemail@gmail.com"
            }
          }
        ]
      },
      {
        "id": "663c671c6c5504d43d3f2204",
        "type": "article",
        "locale": "de",
        "parent": null,
        "fields": [
          {
            "type": "StringField",
            "name": "title",
            "string": "Hello"
          },
          {
            "type": "BooleanField",
            "name": "isPublished",
            "boolean": true
          },
          {
            "type": "NumberField",
            "name": "timeToRead",
            "number": 2
          },
          {
            "type": "UserRelationField",
            "name": "author",
            "user": {
              "id": "6639322feb016cbb28d57cd9",
              "username": "daspete",
              "email": "daspetemail@gmail.com"
            }
          }
        ]
      }
    ]
  }
}
```

Example create mutation:

```graphql
mutation createContent($content: ContentInput!) {
  createContent(content: $content) {
    id
  }
}
```

Example Query Params:

```json
{
  "content": {
    "type": "article",
    "locale": "de",
    "fields": [
      {
        "name": "title",
        "type": "StringField",
        "string": "Hello"
      },
      {
        "name": "isPublished",
        "type": "BooleanField",
        "boolean": true
      },
      {
        "name": "timeToRead",
        "type": "NumberField",
        "number": 2
      },
      {
        "name": "author",
        "type": "UserRelationField",
        "user": "6639322feb016cbb28d57cd9"
      }
    ]
  }
}
```

Example Response: 

```json
{
	"data": {
		"createContent": {
			"id": "663c671c6c5504d43d3f2204"
		}
	}
}
```
