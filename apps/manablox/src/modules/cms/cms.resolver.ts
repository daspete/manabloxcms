import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Content } from './entities/content/content.model';
import { CmsService } from './cms.service';
import { ContentInput } from './entities/content/content.input';
import mongoose from 'mongoose';

@Resolver(() => Content)
export class CmsResolver {
  constructor(private readonly cmsService: CmsService) {}

  @Query(() => [Content])
  async contents() {
    return this.cmsService.findAll();
  }

  @Query(() => [Content])
  async findContents(
    @Args('types', { type: () => [String], nullable: true })
    types: string[] = [],
  ) {
    const query = {};

    if (types.length > 0) {
      query['type'] = {
        $in: types,
      };
    }

    return this.cmsService.find(query);
    // return this.cmsService.find({
    //   $and: [
    //     {
    //       fields: {
    //         $elemMatch: {
    //           name: 'slug',
    //           string: 'home',
    //         },
    //       },
    //     },
    //     {
    //       fields: {
    //         $elemMatch: {
    //           name: 'title',
    //           string: {
    //             $regex: '^S',
    //           },
    //         },
    //       },
    //     },
    //   ],
    // });
  }

  @Mutation(() => Content)
  async createContent(@Args('content') content: ContentInput) {
    if (content.fields.length > 0) {
      for (let i = 0; i < content.fields.length; i++) {
        const field = content.fields[i];
        switch (field.type) {
          case 'AssetRelationField':
            field.asset = new mongoose.Types.ObjectId(`${field.asset}`);
            break;
          case 'UserRelationField':
            field.user = new mongoose.Types.ObjectId(`${field.user}`);
            break;
          case 'ContentRelationField':
            field.content = new mongoose.Types.ObjectId(`${field.content}`);
            break;
          default:
            break;
        }
      }
    }

    return this.cmsService.create(content);
  }

  @ResolveField()
  async fields(
    @Args('fields', { type: () => [String], nullable: true })
    fields: string[] = [],
    @Parent() content: Content,
  ) {
    if (fields.length === 0) {
      return content.fields;
    }

    return content.fields.filter((field) => fields.includes(field.name));
  }

  @ResolveField()
  async parent(@Parent() content: Content) {
    if (!content.parent) return null;
    return this.cmsService.findOne(content.parent);
  }
}
