import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import mongoose from 'mongoose';
import { Content } from './content.model';
import { ContentService } from './content.service';
import { ContentInput } from './content.input';
import { ContentTypeService } from '../content-type/content-type.service';

@Resolver(() => Content)
export class ContentResolver {
  constructor(private readonly contentService: ContentService, private readonly contentTypeService: ContentTypeService) { }

  @Query(() => [Content])
  async contents() {
    return this.contentService.findAll();
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

    return this.contentService.find(query);
    // return this.contentService.find({
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

    return this.contentService.create(content);
  }

  @Mutation(() => Content)
  async deleteContent(@Args('contentId') contentId: string) {
    return this.contentService.delete(contentId);
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

  // @ResolveField()
  // async type(@Parent() content: Content) {
  //   return this.contentTypeService.findOne({ name: content.type });
  // }

  @ResolveField()
  async parent(@Parent() content: Content) {
    if (!content.parent) return null;
    return this.contentService.findOne(content.parent);
  }
}
