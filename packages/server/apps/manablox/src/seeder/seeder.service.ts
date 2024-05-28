import { Injectable } from '@nestjs/common';
import { ContentService } from '../modules/cms/entities/content/content.service';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

@Injectable()
export class SeederService {
  constructor(private readonly contentService: ContentService) {}

  async seed() {
    await this.seedContents(1000);
  }

  async seedContents(itemCount: number) {
    for (let i = 0; i < itemCount; i++) {
      await this.contentService.create({
        title: faker.lorem.words(3),
        type: 'Page',
        contentId: randomUUID(),
        slug: faker.lorem.word(),
        locale: 'de',
        fields: [
          {
            type: 'BlockItemField',
            name: 'seo',
            fieldId: '422d6f0c-c1c1-42f4-b02e-f9e5fad96577',
            block: {
              blockId: randomUUID(),
              type: 'SeoSettings',
              fields: [
                {
                  name: 'title',
                  type: 'StringField',
                  fieldId: '68fb9859-c93f-461f-aab3-5842014832ee',
                  string: faker.lorem.words(3),
                },
                {
                  name: 'description',
                  type: 'StringField',
                  fieldId: '329e6969-56d8-4ba4-bed1-0e20c11a9580',
                  string: faker.lorem.words(10),
                },
              ],
            },
          },
          {
            type: 'BlockItemsField',
            name: 'pagecomponents',
            fieldId: 'b0bebc29-e74c-4d0b-8351-fc6f43d97c8f',
            blocks: [],
          },
        ],
      });
    }
  }
}
