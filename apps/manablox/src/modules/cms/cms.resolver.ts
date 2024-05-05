import { Query, Resolver } from '@nestjs/graphql';
import { Content } from './entities/content/content.model';

@Resolver(() => Content)
export class CmsResolver {
  constructor() {
    console.log('CmsResolver');
  }

  @Query(() => [Content])
  async contents() {
    return [
      {
        id: '1',
        parent: null,
        locale: 'en',
        fields: [
          {
            name: 'title',
            type: 'string',
            string: 'Hello World!',
          },
          {
            name: 'description',
            type: 'string',
            string: 'This is a description',
          },
          {
            name: 'content',
            type: 'relation',
            relation: {
              type: 'contentrelation',
              content: '2',
            },
          },
          {
            name: 'author',
            type: 'relation',
            relation: {
              type: 'userrelation',
              user: '1',
            },
          },
          {
            name: 'featuredImage',
            type: 'relation',
            relation: {
              type: 'assetrelation',
              asset: '1',
            },
          },
        ],
      },
      {
        id: '2',
        parent: null,
        locale: 'en',
        fields: [
          {
            name: 'title',
            type: 'string',
            string: 'Hello relation World!',
          },
        ],
      },
    ];
  }
}
