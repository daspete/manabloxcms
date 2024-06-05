/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Asset = {
  __typename?: 'Asset';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type AssetInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type AssetRelationField = {
  __typename?: 'AssetRelationField';
  asset?: Maybe<Asset>;
  fieldId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type AssetRelationFieldType = {
  __typename?: 'AssetRelationFieldType';
  assetSettings?: Maybe<AssetRelationFieldTypeSettings>;
  fieldId: Scalars['String']['output'];
  fieldSettings: ContentTypeFieldSettings;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type AssetRelationFieldTypeSettings = {
  __typename?: 'AssetRelationFieldTypeSettings';
  defaultValue?: Maybe<Asset>;
};

export type AssetRelationFieldTypeSettingsInput = {
  defaultValue?: InputMaybe<Scalars['String']['input']>;
};

export type Block = {
  __typename?: 'Block';
  blockId: Scalars['String']['output'];
  fields: Array<BlockFieldUnion>;
  type: Scalars['String']['output'];
};

export type BlockFieldInput = {
  asset?: InputMaybe<Scalars['ID']['input']>;
  block?: InputMaybe<BlockInput>;
  blocks?: InputMaybe<Array<BlockInput>>;
  boolean?: InputMaybe<Scalars['Boolean']['input']>;
  content?: InputMaybe<Scalars['ID']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  fieldId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  number?: InputMaybe<Scalars['Float']['input']>;
  string?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type BlockFieldUnion = AssetRelationField | BlockItemField | BlockItemsField | BooleanField | ContentRelationField | DateField | NumberField | StringField | UserRelationField;

export type BlockInput = {
  blockId: Scalars['String']['input'];
  fields?: InputMaybe<Array<BlockFieldInput>>;
  type: Scalars['String']['input'];
};

export type BlockItemField = {
  __typename?: 'BlockItemField';
  block: Block;
  fieldId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type BlockItemFieldType = {
  __typename?: 'BlockItemFieldType';
  blockSettings?: Maybe<BlockItemFieldTypeSettings>;
  fieldId: Scalars['String']['output'];
  fieldSettings: ContentTypeFieldSettings;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type BlockItemFieldTypeSettings = {
  __typename?: 'BlockItemFieldTypeSettings';
  blockType: ContentType;
};

export type BlockItemFieldTypeSettingsInput = {
  blockType?: InputMaybe<Scalars['ID']['input']>;
};

export type BlockItemsField = {
  __typename?: 'BlockItemsField';
  blocks: Array<Block>;
  fieldId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type BlockItemsFieldType = {
  __typename?: 'BlockItemsFieldType';
  blocksSettings?: Maybe<BlockItemsFieldTypeSettings>;
  fieldId: Scalars['String']['output'];
  fieldSettings: ContentTypeFieldSettings;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type BlockItemsFieldTypeSettings = {
  __typename?: 'BlockItemsFieldTypeSettings';
  possibleBlockTypes: Array<ContentType>;
};

export type BlockItemsFieldTypeSettingsInput = {
  possibleBlockTypes?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type BlockQueryInput = {
  field?: InputMaybe<ContentFieldQueryInput>;
};

export type BooleanField = {
  __typename?: 'BooleanField';
  boolean: Scalars['Boolean']['output'];
  fieldId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type BooleanFieldType = {
  __typename?: 'BooleanFieldType';
  booleanSettings?: Maybe<BooleanFieldTypeSettings>;
  fieldId: Scalars['String']['output'];
  fieldSettings: ContentTypeFieldSettings;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type BooleanFieldTypeSettings = {
  __typename?: 'BooleanFieldTypeSettings';
  defaultValue?: Maybe<Scalars['Boolean']['output']>;
};

export type BooleanFieldTypeSettingsInput = {
  defaultValue?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Content = {
  __typename?: 'Content';
  contentId: Scalars['String']['output'];
  fields: Array<ContentFieldUnion>;
  locale: Scalars['String']['output'];
  parent?: Maybe<Content>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: ContentType;
};


export type ContentFieldsArgs = {
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ContentFieldInput = {
  asset?: InputMaybe<Scalars['ID']['input']>;
  block?: InputMaybe<BlockInput>;
  blocks?: InputMaybe<Array<BlockInput>>;
  boolean?: InputMaybe<Scalars['Boolean']['input']>;
  content?: InputMaybe<Scalars['ID']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  fieldId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  number?: InputMaybe<Scalars['Float']['input']>;
  string?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type ContentFieldQueryInput = {
  asset?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<BlockQueryInput>;
  boolean?: InputMaybe<Scalars['Boolean']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  number?: InputMaybe<Scalars['Float']['input']>;
  string?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type ContentFieldUnion = AssetRelationField | BlockItemField | BlockItemsField | BooleanField | ContentRelationField | DateField | NumberField | StringField | UserRelationField;

export type ContentInput = {
  contentId: Scalars['String']['input'];
  fields?: InputMaybe<Array<ContentFieldInput>>;
  locale: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type ContentQueryInput = {
  fields?: InputMaybe<Array<ContentFieldQueryInput>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ContentRelationField = {
  __typename?: 'ContentRelationField';
  content?: Maybe<Content>;
  fieldId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ContentRelationFieldType = {
  __typename?: 'ContentRelationFieldType';
  contentSettings?: Maybe<ContentRelationFieldTypeSettings>;
  fieldId: Scalars['String']['output'];
  fieldSettings: ContentTypeFieldSettings;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ContentRelationFieldTypeSettings = {
  __typename?: 'ContentRelationFieldTypeSettings';
  defaultValue?: Maybe<Content>;
};

export type ContentRelationFieldTypeSettingsInput = {
  defaultValue?: InputMaybe<Scalars['String']['input']>;
};

export type ContentType = {
  __typename?: 'ContentType';
  canBeVisibleInMenu?: Maybe<Scalars['Boolean']['output']>;
  contentTypeId: Scalars['String']['output'];
  fields: Array<ContentTypeFieldUnion>;
  hasSlug?: Maybe<Scalars['Boolean']['output']>;
  isBlockType: Scalars['Boolean']['output'];
  isPublishable?: Maybe<Scalars['Boolean']['output']>;
  isVisibleInTree?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  space?: Maybe<Space>;
};

export type ContentTypeFieldInput = {
  assetSettings?: InputMaybe<AssetRelationFieldTypeSettingsInput>;
  blockSettings?: InputMaybe<BlockItemFieldTypeSettingsInput>;
  blocksSettings?: InputMaybe<BlockItemsFieldTypeSettingsInput>;
  booleanSettings?: InputMaybe<BooleanFieldTypeSettingsInput>;
  contentSettings?: InputMaybe<ContentRelationFieldTypeSettingsInput>;
  dateSettings?: InputMaybe<DateFieldTypeSettingsInput>;
  fieldId: Scalars['String']['input'];
  fieldSettings: ContentTypeFieldSettingsInput;
  name: Scalars['String']['input'];
  numberSettings?: InputMaybe<NumberFieldTypeSettingsInput>;
  stringSettings?: InputMaybe<StringFieldTypeSettingsInput>;
  type: Scalars['String']['input'];
  userSettings?: InputMaybe<UserRelationFieldTypeSettingsInput>;
};

export type ContentTypeFieldSettings = {
  __typename?: 'ContentTypeFieldSettings';
  isRequired: Scalars['Boolean']['output'];
};

export type ContentTypeFieldSettingsInput = {
  isRequired: Scalars['Boolean']['input'];
};

export type ContentTypeFieldUnion = AssetRelationFieldType | BlockItemFieldType | BlockItemsFieldType | BooleanFieldType | ContentRelationFieldType | DateFieldType | NumberFieldType | StringFieldType | UserRelationFieldType;

export type ContentTypeInput = {
  canBeVisibleInMenu?: InputMaybe<Scalars['Boolean']['input']>;
  contentTypeId: Scalars['String']['input'];
  fields?: InputMaybe<Array<ContentTypeFieldInput>>;
  hasSlug?: InputMaybe<Scalars['Boolean']['input']>;
  isBlockType: Scalars['Boolean']['input'];
  isPublishable?: InputMaybe<Scalars['Boolean']['input']>;
  isVisibleInTree?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  space?: InputMaybe<Scalars['String']['input']>;
};

export type DateField = {
  __typename?: 'DateField';
  date: Scalars['DateTime']['output'];
  fieldId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type DateFieldType = {
  __typename?: 'DateFieldType';
  dateSettings?: Maybe<DateFieldTypeSettings>;
  fieldId: Scalars['String']['output'];
  fieldSettings: ContentTypeFieldSettings;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type DateFieldTypeSettings = {
  __typename?: 'DateFieldTypeSettings';
  defaultValue?: Maybe<Scalars['DateTime']['output']>;
  excludedDates?: Maybe<Array<Scalars['DateTime']['output']>>;
  maxDate?: Maybe<Scalars['DateTime']['output']>;
  minDate?: Maybe<Scalars['DateTime']['output']>;
  possibleDates?: Maybe<Array<Scalars['DateTime']['output']>>;
};

export type DateFieldTypeSettingsInput = {
  defaultValue?: InputMaybe<Scalars['DateTime']['input']>;
  excludedDates?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  maxDate?: InputMaybe<Scalars['DateTime']['input']>;
  minDate?: InputMaybe<Scalars['DateTime']['input']>;
  possibleDates?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  useTime?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAsset: Asset;
  createContent: Content;
  createContentType: ContentType;
  createSpace: Space;
  createUser: User;
  deleteContent: Content;
  deleteContentType: ContentType;
  updateContent: Content;
  updateContentType: ContentType;
  updateSpace: Space;
};


export type MutationCreateAssetArgs = {
  asset: AssetInput;
};


export type MutationCreateContentArgs = {
  content: ContentInput;
};


export type MutationCreateContentTypeArgs = {
  contentType: ContentTypeInput;
};


export type MutationCreateSpaceArgs = {
  space: SpaceInput;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationDeleteContentArgs = {
  contentId: Scalars['String']['input'];
};


export type MutationDeleteContentTypeArgs = {
  contentTypeId: Scalars['String']['input'];
};


export type MutationUpdateContentArgs = {
  content: ContentInput;
};


export type MutationUpdateContentTypeArgs = {
  contentType: ContentTypeInput;
};


export type MutationUpdateSpaceArgs = {
  space: SpaceInput;
};

export type NumberField = {
  __typename?: 'NumberField';
  fieldId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  number: Scalars['Float']['output'];
  type: Scalars['String']['output'];
};

export type NumberFieldType = {
  __typename?: 'NumberFieldType';
  fieldId: Scalars['String']['output'];
  fieldSettings: ContentTypeFieldSettings;
  name: Scalars['String']['output'];
  numberSettings?: Maybe<NumberFieldTypeSettings>;
  type: Scalars['String']['output'];
};

export type NumberFieldTypeSettings = {
  __typename?: 'NumberFieldTypeSettings';
  defaultValue?: Maybe<Scalars['Float']['output']>;
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
  precision?: Maybe<Scalars['Float']['output']>;
};

export type NumberFieldTypeSettingsInput = {
  defaultValue?: InputMaybe<Scalars['Float']['input']>;
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  precision?: InputMaybe<Scalars['Float']['input']>;
};

export type PaginatedContents = {
  __typename?: 'PaginatedContents';
  items: Array<Content>;
  limit: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type PaginatedSpaces = {
  __typename?: 'PaginatedSpaces';
  items: Array<Space>;
  limit: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  assets: Array<Asset>;
  content: Content;
  contentTree: Array<Content>;
  contentType: ContentType;
  contentTypes: Array<ContentType>;
  contents: PaginatedContents;
  space: Space;
  spaces: PaginatedSpaces;
  users: Array<User>;
};


export type QueryContentArgs = {
  contentId: Scalars['String']['input'];
};


export type QueryContentTreeArgs = {
  parentId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryContentTypeArgs = {
  contentTypeId: Scalars['String']['input'];
};


export type QueryContentsArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  query?: InputMaybe<Array<ContentQueryInput>>;
};


export type QuerySpaceArgs = {
  spaceId: Scalars['String']['input'];
};


export type QuerySpacesArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  query?: InputMaybe<Array<SpaceQueryInput>>;
};

export type Space = {
  __typename?: 'Space';
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  settings?: Maybe<Block>;
  settingsBlockType?: Maybe<ContentType>;
  spaceId: Scalars['String']['output'];
  technicalName: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type SpaceInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  settings?: InputMaybe<BlockInput>;
  settingsBlockType?: InputMaybe<Scalars['String']['input']>;
  spaceId: Scalars['String']['input'];
  technicalName: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type SpaceQueryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  spaceId?: InputMaybe<Scalars['String']['input']>;
  technicalName?: InputMaybe<Scalars['String']['input']>;
};

export type StringField = {
  __typename?: 'StringField';
  fieldId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  string: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type StringFieldType = {
  __typename?: 'StringFieldType';
  fieldId: Scalars['String']['output'];
  fieldSettings: ContentTypeFieldSettings;
  name: Scalars['String']['output'];
  stringSettings?: Maybe<StringFieldTypeSettings>;
  type: Scalars['String']['output'];
};

export type StringFieldTypeSettings = {
  __typename?: 'StringFieldTypeSettings';
  defaultValue?: Maybe<Scalars['String']['output']>;
  isCodeBlock?: Maybe<Scalars['Boolean']['output']>;
  isRichText?: Maybe<Scalars['Boolean']['output']>;
  isTextArea?: Maybe<Scalars['Boolean']['output']>;
  maxCharacters?: Maybe<Scalars['Float']['output']>;
  minCharacters?: Maybe<Scalars['Float']['output']>;
  regex?: Maybe<Scalars['String']['output']>;
};

export type StringFieldTypeSettingsInput = {
  defaultValue?: InputMaybe<Scalars['String']['input']>;
  isCodeBlock?: InputMaybe<Scalars['Boolean']['input']>;
  isRichText?: InputMaybe<Scalars['Boolean']['input']>;
  isTextArea?: InputMaybe<Scalars['Boolean']['input']>;
  maxCharacters?: InputMaybe<Scalars['Float']['input']>;
  minCharacters?: InputMaybe<Scalars['Float']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserRelationField = {
  __typename?: 'UserRelationField';
  fieldId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type UserRelationFieldType = {
  __typename?: 'UserRelationFieldType';
  fieldId: Scalars['String']['output'];
  fieldSettings: ContentTypeFieldSettings;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  userSettings?: Maybe<UserRelationFieldTypeSettings>;
};

export type UserRelationFieldTypeSettings = {
  __typename?: 'UserRelationFieldTypeSettings';
  defaultValue?: Maybe<User>;
};

export type UserRelationFieldTypeSettingsInput = {
  defaultValue?: InputMaybe<Scalars['String']['input']>;
};
