import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs-extra';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
            let folder = './uploads/images';
            if (file.fieldname === 'icon') {
              folder = './uploads/icons';
            } else if (file.fieldname === 'images' || file.fieldname === 'avatar' || file.fieldname === 'imageUrl') {
              folder = './uploads/images';
            }

            fs.ensureDirSync(folder);
            cb(null, folder);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${uuid()}-${file.originalname}`;
          cb(null, uniqueSuffix); // Nombre único para evitar colisiones
        },
      }),
    };
  }
}
