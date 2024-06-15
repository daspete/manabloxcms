import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { accessSync, mkdirSync, writeFileSync } from 'fs';

@Injectable()
export class ManabloxFilesService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async upload(file: Express.Multer.File, space: string) {
    const rootPath = this.configService.get<string>('FILE_STORAGE_PATH');

    if (!space) {
      throw new Error('file.upload.space.required');
    }

    let filePath = `${rootPath}/${space}/`;

    // add current year and month to the path
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    filePath += `${year}/${month}/`;

    // create directory if it does not exist
    try {
      await accessSync(filePath);
    } catch (e) {
      await mkdirSync(filePath, { recursive: true });
    }

    // sanitize file name
    const sanitizedFilename = file.originalname
      .replace(/[^a-z0-9A-Z.öäüÖÄÜ]/gi, '_')
      .toLowerCase();

    // check if file already exists and add a number to the filename
    // to avoid overwriting
    let fileExists = true;
    let counter = 1;
    // set sanitized filename without extension
    const originalFilename = sanitizedFilename
      .split('.')
      .slice(0, -1)
      .join('.');
    const fileExtension = sanitizedFilename.split('.').pop();

    let filename = originalFilename;

    while (fileExists) {
      try {
        await accessSync(`${filePath}${filename}.${fileExtension}`);

        filename = `${originalFilename}_${counter}`;
        counter++;
      } catch (e) {
        fileExists = false;
      }
    }

    filePath += `${filename}.${fileExtension}`;

    // write the file buffer to the disk
    writeFileSync(filePath, file.buffer);

    return {
      assetId: crypto.randomUUID(),
      name: filename,
      filename: `${filename}.${fileExtension}`,
      type: file.mimetype,
      path: filePath.replace(`${rootPath}/`, ''),
      space: space,
    };
  }
}
