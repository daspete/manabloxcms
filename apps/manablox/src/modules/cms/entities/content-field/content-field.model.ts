import { Field, ObjectType, createUnionType } from '@nestjs/graphql';
import { RelationFieldUnion } from '../relation-field/relation-field.model';

@ObjectType()
export class StringField {
  @Field()
  name: string;

  @Field()
  type: 'string';

  @Field()
  string: string;
}

@ObjectType()
export class NumberField {
  @Field()
  name: string;

  @Field()
  type: 'number';

  @Field()
  number: number;
}

@ObjectType()
export class BooleanField {
  @Field()
  name: string;

  @Field()
  type: 'boolean';

  @Field()
  boolean: boolean;
}

@ObjectType()
export class RelationField {
  @Field()
  name: string;

  @Field()
  type: 'relation';

  @Field(() => RelationFieldUnion)
  relation: typeof RelationFieldUnion;
}

export const ContentFieldUnion = createUnionType({
  name: 'ContentFieldUnion',
  types: () => [StringField, NumberField, BooleanField, RelationField],
  resolveType: (
    value: StringField | NumberField | BooleanField | RelationField,
  ) => {
    switch (value.type) {
      case 'string':
        return StringField;
      case 'number':
        return NumberField;
      case 'boolean':
        return BooleanField;
      case 'relation':
        return RelationField;
      default:
        return null;
    }
  },
});
