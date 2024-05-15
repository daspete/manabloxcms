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

export type AssetRelationField = {
  __typename?: 'AssetRelationField';
  asset: Asset;
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
  defaultValue?: Maybe<Scalars['Boolean']['output']>;
};

export type AssetRelationFieldTypeSettingsInput = {
  defaultValue?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BooleanField = {
  __typename?: 'BooleanField';
  boolean: Scalars['Boolean']['output'];
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
  fields: Array<ContentFieldUnion>;
  id: Scalars['ID']['output'];
  locale: Scalars['String']['output'];
  parent?: Maybe<Content>;
  type: Scalars['String']['output'];
};


export type ContentFieldsArgs = {
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ContentFieldInput = {
  asset?: InputMaybe<Scalars['ID']['input']>;
  boolean?: InputMaybe<Scalars['Boolean']['input']>;
  content?: InputMaybe<Scalars['ID']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  number?: InputMaybe<Scalars['Float']['input']>;
  string?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type ContentFieldUnion = AssetRelationField | BooleanField | ContentRelationField | DateField | NumberField | StringField | UserRelationField;

export type ContentInput = {
  fields?: InputMaybe<Array<ContentFieldInput>>;
  id?: InputMaybe<Scalars['String']['input']>;
  locale: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type ContentRelationField = {
  __typename?: 'ContentRelationField';
  content: Content;
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
  defaultValue?: Maybe<Scalars['Boolean']['output']>;
};

export type ContentRelationFieldTypeSettingsInput = {
  defaultValue?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentType = {
  __typename?: 'ContentType';
  canBeVisibleInMenu: Scalars['Boolean']['output'];
  contentTypeId: Scalars['String']['output'];
  fields: Array<ContentTypeFieldUnion>;
  id: Scalars['ID']['output'];
  isPublishable: Scalars['Boolean']['output'];
  isVisibleInTree: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type ContentTypeFieldInput = {
  assetSettings?: InputMaybe<AssetRelationFieldTypeSettingsInput>;
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

export type ContentTypeFieldUnion = AssetRelationFieldType | BooleanFieldType | ContentRelationFieldType | DateFieldType | NumberFieldType | StringFieldType | UserRelationFieldType;

export type ContentTypeInput = {
  canBeVisibleInMenu: Scalars['Boolean']['input'];
  contentTypeId: Scalars['String']['input'];
  fields?: InputMaybe<Array<ContentTypeFieldInput>>;
  id?: InputMaybe<Scalars['String']['input']>;
  isPublishable: Scalars['Boolean']['input'];
  isVisibleInTree: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type DateField = {
  __typename?: 'DateField';
  date: Scalars['DateTime']['output'];
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
};

export type Mutation = {
  __typename?: 'Mutation';
  createContent: Content;
  createContentType: ContentType;
  updateContentType: ContentType;
};


export type MutationCreateContentArgs = {
  content: ContentInput;
};


export type MutationCreateContentTypeArgs = {
  contentType: ContentTypeInput;
};


export type MutationUpdateContentTypeArgs = {
  contentType: ContentTypeInput;
};

export type NumberField = {
  __typename?: 'NumberField';
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

export type Query = {
  __typename?: 'Query';
  assets: Array<Asset>;
  contentType: ContentType;
  contentTypes: Array<ContentType>;
  contents: Array<Content>;
  findContents: Array<Content>;
  users: Array<User>;
};


export type QueryContentTypeArgs = {
  name: Scalars['String']['input'];
};


export type QueryFindContentsArgs = {
  types?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type StringField = {
  __typename?: 'StringField';
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
  maxCharacters?: Maybe<Scalars['Float']['output']>;
  minCharacters?: Maybe<Scalars['Float']['output']>;
  regex?: Maybe<Scalars['String']['output']>;
};

export type StringFieldTypeSettingsInput = {
  defaultValue?: InputMaybe<Scalars['String']['input']>;
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

export type UserRelationField = {
  __typename?: 'UserRelationField';
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  user: User;
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
  defaultValue?: Maybe<Scalars['Boolean']['output']>;
};

export type UserRelationFieldTypeSettingsInput = {
  defaultValue?: InputMaybe<Scalars['Boolean']['input']>;
};
