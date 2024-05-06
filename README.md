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
