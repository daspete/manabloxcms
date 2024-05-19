import type { BooleanField, BooleanFieldType, Content, ContentFieldUnion, ContentType, DateField, DateFieldType, NumberField, NumberFieldType, StringField, StringFieldType, UserRelationField, UserRelationFieldType } from "~/generated/graphql/graphql";

export const initContentFields = (contentType: ContentType, content: Partial<Content>) => {
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

      content.fields?.push(newField as ContentFieldUnion);
    }

  }
  return content;
}

