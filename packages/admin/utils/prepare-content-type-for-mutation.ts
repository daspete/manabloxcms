import type { BlockItemFieldType, BlockItemsFieldType, ContentType } from "~/generated/graphql/graphql";

export const prepareContentTypeForMutation = (contentType: Partial<ContentType>) => {
    const _contentType = clone(contentType);

    for(let i = 0; i < _contentType.fields.length; i++){
        const contentTypeField = _contentType.fields[i];

        if(contentTypeField.type === 'BlockItemFieldType') {
            const blockItemFieldType = contentTypeField as any;

            if(blockItemFieldType.blockSettings && blockItemFieldType.blockSettings.blockType){
                blockItemFieldType.blockSettings.blockType = blockItemFieldType.blockSettings.blockType.id;
            }
        }

        if(contentTypeField.type === 'BlockItemsFieldType') {
            const blockItemsFieldType = contentTypeField as any;

            if(blockItemsFieldType.blocksSettings && blockItemsFieldType.blocksSettings.possibleBlockTypes) {
                blockItemsFieldType.blocksSettings.possibleBlockTypes = blockItemsFieldType.blocksSettings.possibleBlockTypes.map((blockType:any) => blockType.id)
            }
        }

        if(contentTypeField.type === 'UserRelationFieldType') {
            const userRelationFieldType = contentTypeField as any;

            if(userRelationFieldType.userSettings) {
                if(userRelationFieldType.userSettings.defaultValue?.id) {
                  userRelationFieldType.userSettings.defaultValue = userRelationFieldType.userSettings.defaultValue.id;
                }else{
                  userRelationFieldType.userSettings.defaultValue = null;
                }
            }
        }

        if(contentTypeField.type === 'AssetRelationFieldType') {
            const assetRelationFieldType = contentTypeField as any;

            if(assetRelationFieldType.assetSettings) {
                if(assetRelationFieldType.assetSettings.defaultValue?.id) {
                  assetRelationFieldType.assetSettings.defaultValue = assetRelationFieldType.assetSettings.defaultValue.id;
                }else{
                  assetRelationFieldType.assetSettings.defaultValue = null;
                }
            }
        }
    }

    return _contentType;
}
