export default defineAppConfig({
  content: {
    fieldTypes: {
      StringField: {
        label: "String field",
        icon: "i-mdi-signature-text",
      },
      NumberField: {
        label: "Number field",
        icon: "i-mdi-numeric",
      },
      DateField: {
        label: "Date field",
        icon: "i-mdi-calendar-blank",
      },
      BooleanField: {
        label: "Boolean field",
        icon: "i-mdi-toggle-switch",
      },
      UserRelationField: {
        label: "UserRelation field",
        icon: "i-mdi-account-settings",
      },
      AssetRelationField: {
        label: "AssetRelation field",
        icon: "i-mdi-content-save-settings",
      },
      ContentRelationField: {
        label: "ContentRelation field",
        icon: "i-mdi-file-settings",
      },
    },
  },
});
