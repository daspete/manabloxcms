import {
  Controller,
  FileTypeValidator,
  Get,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ManabloxFilesService } from './manablox-files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
import { AccessTokenGuard } from 'apps/manablox/src/guards/access-token.guard';

@Controller()
export class ManabloxFilesController {
  constructor(
    private readonly manabloxFilesService: ManabloxFilesService,
    @Inject('MANABLOX_SERVICE')
    private readonly manabloxServiceClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.manabloxFilesService.getHello();
  }

  @Post('upload/:space')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('space') space: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: `(${
              process.env.ALLOWED_FILE_MIMETYPES
                ? process.env.ALLOWED_FILE_MIMETYPES.split(',')
                    .map((type) => type.trim())
                    .join('|')
                : 'jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|text'
            })`,
          }),
          new MaxFileSizeValidator({
            maxSize: process.env.FILE_MAX_SIZE
              ? parseInt(process.env.FILE_MAX_SIZE) * 1024 * 1024
              : 10 * 1024 * 1024,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileData = await this.manabloxFilesService.upload(file, space);

    return this.manabloxServiceClient.send('assets.file.uploaded', fileData);
  }
}
