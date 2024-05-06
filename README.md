# manablox cms

- create a .env file
- start the docker compose instance
- open the playground on http://localhost:3000/graphql

Example query:

```graphql
fragment SimpleContentFields on ContentFieldUnion {
  ... on StringField {
    name
    type
    string
  }

  ... on NumberField {
    name
    type
    number
  }

  ... on BooleanField {
    name
    type
    boolean
  }
}

fragment UserRelation on UserRelationField {
  type
  user {
    id
    username
    email
  }
}

fragment AssetRelation on AssetRelationField {
  type
  asset {
    id
    name
    type
    url
  }
}

fragment ContentRelation on ContentRelationField {
  type
  content {
    id
    type
    locale
    fields {
      ...SimpleContentFields
      ... on RelationField {
        name
        type
        relation {
          ...SubLevel1RelationContentFields
        }
      }
    }
  }
}

fragment RelationContentFields on RelationTypeUnion {
  ...ContentRelation
  ...UserRelation
  ...AssetRelation
}

fragment SubLevel1RelationContentFields on RelationTypeUnion {
  ... on ContentRelationField {
    type
    content {
      id
      type
      locale
      fields {
        ...SimpleContentFields
        ... on RelationField {
          name
          type
          relation {
            ...SubLevel2RelationContentFields
          }
        }
      }
    }
  }

  ...UserRelation
  ...AssetRelation
}

fragment SubLevel2RelationContentFields on RelationTypeUnion {
  ... on ContentRelationField {
    type
    content {
      id
      type
      locale
      fields {
        ...SimpleContentFields
        ... on RelationField {
          name
          type
          relation {
            __typename
          }
        }
      }
    }
  }

  ...UserRelation
  ...AssetRelation
}

query contents {
  contents {
    id
    type
    locale
    fields {
      ...SimpleContentFields
      ... on RelationField {
        name
        type
        relation {
          ...RelationContentFields
        }
      }
    }
  }
}
```

Example response:

```json
{
  "data": {
    "contents": [
      {
        "id": "66390d12eb016cbb28d57cd7",
        "type": "page",
        "locale": "de",
        "fields": [
          {
            "name": "title",
            "type": "StringField",
            "string": "Startseite"
          },
          {
            "name": "slug",
            "type": "StringField",
            "string": "home"
          },
          {
            "name": "timeToRead",
            "type": "NumberField",
            "number": 4
          },
          {
            "name": "isPublished",
            "type": "BooleanField",
            "boolean": false
          },
          {
            "name": "author",
            "type": "RelationField",
            "relation": {
              "type": "UserRelationField",
              "user": {
                "id": "6639322feb016cbb28d57cd9",
                "username": "daspete",
                "email": "daspetemail@gmail.com"
              }
            }
          }
        ]
      },
      {
        "id": "66392f2ceb016cbb28d57cd8",
        "type": "page",
        "locale": "de",
        "fields": [
          {
            "name": "title",
            "type": "StringField",
            "string": "Testseite"
          },
          {
            "name": "slug",
            "type": "StringField",
            "string": "testing"
          },
          {
            "name": "timeToRead",
            "type": "NumberField",
            "number": 7
          },
          {
            "name": "isPublished",
            "type": "BooleanField",
            "boolean": true
          },
          {
            "name": "homePage",
            "type": "RelationField",
            "relation": {
              "type": "ContentRelationField",
              "content": {
                "id": "66390d12eb016cbb28d57cd7",
                "type": "page",
                "locale": "de",
                "fields": [
                  {
                    "name": "title",
                    "type": "StringField",
                    "string": "Startseite"
                  },
                  {
                    "name": "slug",
                    "type": "StringField",
                    "string": "home"
                  },
                  {
                    "name": "timeToRead",
                    "type": "NumberField",
                    "number": 4
                  },
                  {
                    "name": "isPublished",
                    "type": "BooleanField",
                    "boolean": false
                  },
                  {
                    "name": "author",
                    "type": "RelationField",
                    "relation": {
                      "type": "UserRelationField",
                      "user": {
                        "id": "6639322feb016cbb28d57cd9",
                        "username": "daspete",
                        "email": "daspetemail@gmail.com"
                      }
                    }
                  }
                ]
              }
            }
          },
          {
            "name": "featuredImage",
            "type": "RelationField",
            "relation": {
              "type": "AssetRelationField",
              "asset": {
                "id": "663936caeb016cbb28d57cda",
                "name": "Hello Asset",
                "type": "image",
                "url": "https://loremflickr.com/640/360"
              }
            }
          }
        ]
      }
    ]
  }
}
```
