import { Field, ObjectType } from '@nestjs/graphql';
import { Asset } from '../../../asset/entities/asset/asset.model';

@ObjectType()
export class AssetRelationField {
  @Field()
  type: 'assetrelation';

  @Field(() => Asset)
  asset: Asset;
}
