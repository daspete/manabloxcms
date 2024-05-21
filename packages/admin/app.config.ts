import type { AssetRelationFieldTypeSettings, BlockItemFieldTypeSettings, BlockItemsFieldTypeSettings, BooleanFieldTypeSettings, ContentRelationFieldTypeSettings, DateFieldTypeSettings, NumberFieldTypeSettings, StringFieldTypeSettings, UserRelationFieldTypeSettings } from "./generated/graphql/graphql";

type FieldSettings = {
  isRequired: boolean
}

export type ContentConfig = {
  content: {
    fieldTypes: {
      StringField: {
        label: string,
        icon: string,
        default: {
          name: string,
          type: string,
          fieldSettings: FieldSettings,
          stringSettings: StringFieldTypeSettings
        }
      },
      NumberField: {
        label: string,
        icon: string,
        default: {
          name: string,
          type: string,
          fieldSettings: FieldSettings,
          numberSettings: NumberFieldTypeSettings
        }
      },
      DateField: {
        label: string,
        icon: string,
        default: {
          name: string,
          type: string,
          fieldSettings: FieldSettings,
          dateSettings: DateFieldTypeSettings
        }
      },
      BooleanField: {
        label: string,
        icon: string,
        default: {
          name: string,
          type: string,
          fieldSettings: FieldSettings,
          booleanSettings: BooleanFieldTypeSettings
        }
      },
      UserRelationField: {
        label: string,
        icon: string,
        default: {
          name: string,
          type: string,
          fieldSettings: FieldSettings,
          userSettings: UserRelationFieldTypeSettings
        }
      },
      AssetRelationField: {
        label: string,
        icon: string,
        default: {
          name: string,
          type: string,
          fieldSettings: FieldSettings,
          assetSettings: AssetRelationFieldTypeSettings
        }
      },
      ContentRelationField: {
        label: string,
        icon: string,
        default: {
          name: string,
          type: string,
          fieldSettings: FieldSettings,
          contentSettings: ContentRelationFieldTypeSettings
        }
      },
      BlockItemField: {
        label: string,
        icon: string,
        default: {
          name: string,
          type: string,
          fieldSettings: FieldSettings,
          blockSettings: Partial<BlockItemFieldTypeSettings>
        }
      },
      BlockItemsField: {
        label: string,
        icon: string,
        default: {
          name: string,
          type: string,
          fieldSettings: FieldSettings,
          blocksSettings: Partial<BlockItemsFieldTypeSettings>
        }
      }
    }
  }
}

export default defineAppConfig<ContentConfig>({
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
      BlockItemField: {
        label: "Single Block field",
        icon: "i-mdi-card-outline",
        default: {
          name: '',
          type: 'BlockItemFieldType',
          fieldSettings: {
            isRequired: false
          },
          blockSettings: {}
        }
      },
      BlockItemsField: {
        label: "Multiple Blocks field",
        icon: "i-mdi-card-multiple-outline",
        default: {
          name: '',
          type: 'BlockItemsFieldType',
          fieldSettings: {
            isRequired: false
          },
          blocksSettings: {}
        }
      }
    },
  },
});
