import type { BlockItemFieldType, ContentType } from "~/generated/graphql/graphql";

export const prepareContentTypeForMutation = (contentType: ContentType) => {
    const _contentType = clone(contentType);

    for(let i = 0; i < _contentType.fields.length; i++){
        const contentTypeField = _contentType.fields[i];

        if(contentTypeField.type == 'BlockItemFieldType') {
            const blockItemFieldType = contentTypeField as any;

            if(blockItemFieldType.blockSettings && blockItemFieldType.blockSettings.blockType){
                blockItemFieldType.blockSettings.blockType = blockItemFieldType.blockSettings.blockType.id;
            }
        }
    }

    return _contentType;
}