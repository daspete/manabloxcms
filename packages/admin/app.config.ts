export default defineAppConfig({
  content: {
    fieldTypes: {
      StringField: {
        label: "String field",
        icon: "i-mdi-signature-text",
        default: {
          name: '',
          type: 'StringFieldType',
          fieldSettings: {
            isRequired: false
          },
          stringSettings: {}
        }
      },
      NumberField: {
        label: "Number field",
        icon: "i-mdi-numeric",
        default: {
          name: '',
          type: 'NumberFieldType',
          fieldSettings: {
            isRequired: false
          },
          numberSettings: {}
        }
      },
      BooleanField: {
        label: "Boolean field",
        icon: "i-mdi-toggle-switch",
        default: {
          name: '',
          type: 'BooleanFieldType',
          fieldSettings: {
            isRequired: false
          },
          booleanSettings: {}
        }
      },
      DateField: {
        label: "Date field",
        icon: "i-mdi-calendar-blank",
        default: {
          name: '',
          type: 'DateFieldType',
          fieldSettings: {
            isRequired: false
          },
          dateSettings: {}
        }
      },
      UserRelationField: {
        label: "UserRelation field",
        icon: "i-mdi-account-settings",
        default: {
          name: '',
          type: 'UserRelationFieldType',
          fieldSettings: {
            isRequired: false
          },
          userSettings: {}
        }
      },
      AssetRelationField: {
        label: "AssetRelation field",
        icon: "i-mdi-content-save-settings",
        default: {
          name: '',
          type: 'AssetRelationFieldType',
          fieldSettings: {
            isRequired: false
          },
          assetSettings: {}
        }
      },
      ContentRelationField: {
        label: "ContentRelation field",
        icon: "i-mdi-file-settings",
        default: {
          name: '',
          type: 'ContentRelationFieldType',
          fieldSettings: {
            isRequired: false
          },
          contentSettings: {}
        }
      },
    },
  },
});
