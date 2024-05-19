import type { ContentFieldUnion, ContentType } from "~/generated/graphql/graphql";

export const getFieldType = (contentType: ContentType, field: ContentFieldUnion) => {
  return contentType.fields.find((fieldType) => fieldType.fieldId === field.fieldId);
}
