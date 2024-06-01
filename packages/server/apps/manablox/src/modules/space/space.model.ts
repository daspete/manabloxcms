import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Block, BlockSchema } from '../cms/entities/block/block.model';
import { ContentType } from '../cms/entities/content-type/content-type.model';

@ObjectType()
@Schema({
  collection: 'spaces',
  toJSON: {
    virtuals: true,
  },
})
export class Space {
  @Field()
  @Prop()
  spaceId: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  technicalName: string;

  @Field()
  @Prop()
  description: string;

  @Field()
  @Prop()
  url: string;

  @Field(() => ContentType)
  @Prop()
  settingsBlockType: string;

  @Field(() => Block)
  @Prop({ type: BlockSchema })
  settings: Block;
}

export const SpaceSchema = SchemaFactory.createForClass(Space);
