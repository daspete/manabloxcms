import type { BlockItemField, BlockItemFieldType, BooleanField, BooleanFieldType, Content, ContentFieldUnion, ContentType, DateField, DateFieldType, NumberField, NumberFieldType, StringField, StringFieldType, UserRelationField, UserRelationFieldType } from "~/generated/graphql/graphql";
import{ v4 as uuid4 } from 'uuid';

export const initContentFields = (contentType: ContentType, content: Partial<Content>) => {
  console.log(contentType.name);
  for (let i = 0; i < contentType.fields.length; i++) {
    const fieldType = contentType.fields[i];
    const fieldId = fieldType.fieldId;
    const field = content.fields?.find((field: ContentFieldUnion) => field.fieldId === fieldId);

    if (!field) {
      const newField = {
        fieldId: fieldId,
        type: fieldType.type.replace('Type', ''),
        name: fieldType.name,
      }

      if(fieldType.type === 'StringFieldType') {
        (newField as StringField).string = (fieldType as StringFieldType).stringSettings?.defaultValue || '';
      }

      if(fieldType.type === 'NumberFieldType') {
        (newField as NumberField).number = (fieldType as NumberFieldType).numberSettings?.defaultValue || 0;
      }

      if(fieldType.type === 'BooleanFieldType') {
        (newField as BooleanField).boolean = (fieldType as BooleanFieldType).booleanSettings?.defaultValue || false;
      }

      if(fieldType.type === 'DateFieldType') {
        (newField as DateField).date = (fieldType as DateFieldType).dateSettings?.defaultValue || null;
      }

      if(fieldType.type === 'BlockItemFieldType') {
        (newField as BlockItemField).block = {
          blockId: uuid4(),
          type: (fieldType as BlockItemFieldType).blockSettings?.blockType.name || 'undefined',
          fields: []
        }
      }

      //TODO: add block injection

      content.fields?.push(newField as ContentFieldUnion);
    }
  }

  return content;
}

