import type {
  AssetRelationFieldTypeSettings,
  BlockItemFieldTypeSettings,
  BlockItemsFieldTypeSettings,
  BooleanFieldTypeSettings,
  ContentRelationFieldTypeSettings,
  ContentTypeFieldAdminSettings,
  ContentTypeFieldSettings,
  DateFieldTypeSettings,
  NumberFieldTypeSettings,
  StringFieldTypeSettings,
  UserRelationFieldTypeSettings,
} from './generated/graphql/graphql';

export type ContentConfig = {
  content: {
    fieldTypes: {
      StringField: {
        label: string;
        icon: string;
        default: {
          name: string;
          type: string;
          fieldSettings: ContentTypeFieldSettings;
          adminSettings: ContentTypeFieldAdminSettings;
          stringSettings: StringFieldTypeSettings;
        };
      };
      NumberField: {
        label: string;
        icon: string;
        default: {
          name: string;
          type: string;
          fieldSettings: ContentTypeFieldSettings;
          adminSettings: ContentTypeFieldAdminSettings;
          numberSettings: NumberFieldTypeSettings;
        };
      };
      DateField: {
        label: string;
        icon: string;
        default: {
          name: string;
          type: string;
          fieldSettings: ContentTypeFieldSettings;
          adminSettings: ContentTypeFieldAdminSettings;
          dateSettings: DateFieldTypeSettings;
        };
      };
      BooleanField: {
        label: string;
        icon: string;
        default: {
          name: string;
          type: string;
          fieldSettings: ContentTypeFieldSettings;
          adminSettings: ContentTypeFieldAdminSettings;
          booleanSettings: BooleanFieldTypeSettings;
        };
      };
      UserRelationField: {
        label: string;
        icon: string;
        default: {
          name: string;
          type: string;
          fieldSettings: ContentTypeFieldSettings;
          adminSettings: ContentTypeFieldAdminSettings;
          userSettings: UserRelationFieldTypeSettings;
        };
      };
      AssetRelationField: {
        label: string;
        icon: string;
        default: {
          name: string;
          type: string;
          fieldSettings: ContentTypeFieldSettings;
          adminSettings: ContentTypeFieldAdminSettings;
          assetSettings: AssetRelationFieldTypeSettings;
        };
      };
      ContentRelationField: {
        label: string;
        icon: string;
        default: {
          name: string;
          type: string;
          fieldSettings: ContentTypeFieldSettings;
          adminSettings: ContentTypeFieldAdminSettings;
          contentSettings: ContentRelationFieldTypeSettings;
        };
      };
      BlockItemField: {
        label: string;
        icon: string;
        default: {
          name: string;
          type: string;
          fieldSettings: ContentTypeFieldSettings;
          adminSettings: ContentTypeFieldAdminSettings;
          blockSettings: Partial<BlockItemFieldTypeSettings>;
        };
      };
      BlockItemsField: {
        label: string;
        icon: string;
        default: {
          name: string;
          type: string;
          fieldSettings: ContentTypeFieldSettings;
          adminSettings: ContentTypeFieldAdminSettings;
          blocksSettings: Partial<BlockItemsFieldTypeSettings>;
        };
      };
    };
  };
};

export default defineAppConfig<ContentConfig>({
  content: {
    fieldTypes: {
      StringField: {
        label: 'String field',
        icon: 'i-mdi-signature-text',
        default: {
          name: '',
          type: 'StringFieldType',
          fieldSettings: {
            isRequired: false,
          },
          adminSettings: {
            zone: 'main',
            width: 100,
          },
          stringSettings: {},
        },
      },
      NumberField: {
        label: 'Number field',
        icon: 'i-mdi-numeric',
        default: {
          name: '',
          type: 'NumberFieldType',
          fieldSettings: {
            isRequired: false,
          },
          adminSettings: {
            zone: 'main',
            width: 100,
          },
          numberSettings: {},
        },
      },
      BooleanField: {
        label: 'Boolean field',
        icon: 'i-mdi-toggle-switch',
        default: {
          name: '',
          type: 'BooleanFieldType',
          fieldSettings: {
            isRequired: false,
          },
          adminSettings: {
            zone: 'main',
            width: 100,
          },
          booleanSettings: {},
        },
      },
      DateField: {
        label: 'Date field',
        icon: 'i-mdi-calendar-blank',
        default: {
          name: '',
          type: 'DateFieldType',
          fieldSettings: {
            isRequired: false,
          },
          adminSettings: {
            zone: 'main',
            width: 100,
          },
          dateSettings: {},
        },
      },
      UserRelationField: {
        label: 'UserRelation field',
        icon: 'i-mdi-account-settings',
        default: {
          name: '',
          type: 'UserRelationFieldType',
          fieldSettings: {
            isRequired: false,
          },
          adminSettings: {
            zone: 'main',
            width: 100,
          },
          userSettings: {},
        },
      },
      AssetRelationField: {
        label: 'AssetRelation field',
        icon: 'i-mdi-content-save-settings',
        default: {
          name: '',
          type: 'AssetRelationFieldType',
          fieldSettings: {
            isRequired: false,
          },
          adminSettings: {
            zone: 'main',
            width: 100,
          },
          assetSettings: {},
        },
      },
      ContentRelationField: {
        label: 'ContentRelation field',
        icon: 'i-mdi-file-settings',
        default: {
          name: '',
          type: 'ContentRelationFieldType',
          fieldSettings: {
            isRequired: false,
          },
          adminSettings: {
            zone: 'main',
            width: 100,
          },
          contentSettings: {},
        },
      },
      BlockItemField: {
        label: 'Single Block field',
        icon: 'i-mdi-card-outline',
        default: {
          name: '',
          type: 'BlockItemFieldType',
          fieldSettings: {
            isRequired: false,
          },
          adminSettings: {
            zone: 'main',
            width: 100,
          },
          blockSettings: {},
        },
      },
      BlockItemsField: {
        label: 'Multiple Blocks field',
        icon: 'i-mdi-card-multiple-outline',
        default: {
          name: '',
          type: 'BlockItemsFieldType',
          fieldSettings: {
            isRequired: false,
          },
          adminSettings: {
            zone: 'main',
            width: 100,
          },
          blocksSettings: {},
        },
      },
    },
  },
});
