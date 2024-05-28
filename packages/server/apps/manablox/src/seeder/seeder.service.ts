import { Injectable } from '@nestjs/common';
import { ContentService } from '../modules/cms/entities/content/content.service';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { ContentTypeService } from '../modules/cms/entities/content-type/content-type.service';
import { ContentType } from '../modules/cms/entities/content-type/content-type.model';
import { ContentField } from '../modules/cms/entities/content-field/content-field.model';

@Injectable()
export class SeederService {
  allContentTypes: Array<ContentType> = [];
  contentTypes: Array<ContentType> = [];
  blockTypes: Array<ContentType> = [];

  constructor(
    private readonly contentService: ContentService,
    private readonly contentTypeService: ContentTypeService,
  ) {}

  async seed() {
    this.allContentTypes = await this.contentTypeService.find({});

    this.contentTypes = this.allContentTypes.filter(
      (contentType) => !contentType.isBlockType,
    );

    this.blockTypes = this.allContentTypes.filter(
      (contentType) => contentType.isBlockType,
    );

    await this.seedContents(1000);
  }

  seedContentFields(
    item: { fields: Array<ContentField> },
    contentType: ContentType,
  ) {
    return contentType.fields.map((fieldType) => {
      const type = fieldType['type'].replace('Type', '');

      const field = {
        type,
        name: fieldType.name,
        fieldId: fieldType['fieldId'],
      };

      if (type === 'StringField') {
        field['string'] = faker.lorem.words(3);
      }

      if (type === 'BooleanField') {
        field['boolean'] = faker.datatype.boolean();
      }

      if (type === 'NumberField') {
        field['number'] = faker.number.int(100);
      }

      if (type === 'DateField') {
        field['date'] = faker.date.recent().toISOString();
      }

      if (type === 'BlockItemsField') {
        field['blocks'] = [];

        const possibleBlockTypes = this.blockTypes.filter((_blockType) =>
          fieldType['blocksSettings']['possibleBlockTypes'].includes(
            _blockType.contentTypeId,
          ),
        );

        for (let i = 0; i < faker.number.int({ min: 3, max: 6 }); i++) {
          const blockType = faker.helpers.arrayElement(possibleBlockTypes);

          const block = {
            blockId: randomUUID(),
            type: blockType.name,
            fields: [],
          };

          block.fields = this.seedContentFields(block, blockType);

          field['blocks'].push(block);
        }
      }

      if (type === 'BlockItemField') {
        const blockType = this.blockTypes.find(
          (_blockType) =>
            _blockType.contentTypeId ===
            fieldType['blockSettings']['blockType'],
        );

        field['block'] = {
          blockId: randomUUID(),
          type: blockType.name,
          fields: [],
        };

        field['block'].fields = this.seedContentFields(
          field['block'],
          blockType,
        );
      }

      return field;
    });
  }

  async seedContents(itemCount: number) {
    for (let i = 0; i < itemCount; i++) {
      const currentContentType = faker.helpers.arrayElement(this.contentTypes);

      const content = {
        title: faker.lorem.words(3),
        type: currentContentType.name,
        contentId: randomUUID(),
        slug: faker.lorem.word(),
        locale: 'de',
        fields: [],
      };

      content.fields = this.seedContentFields(content, currentContentType);

      await this.contentService.create(content);
    }
  }
}
