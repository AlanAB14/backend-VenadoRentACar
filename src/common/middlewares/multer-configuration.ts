import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs-extra';
import * as path from 'path';

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
        // Tomamos solo el nombre base (sin directorios)
        const base = path.basename(file.originalname);

        // Separamos extensión
        const ext = path.extname(base).toLowerCase();
        let name = path.basename(base, ext);

        // 1) Quitamos cualquier GUID v4 ya presente al inicio (incluso si hay varios)
        const uuidPrefix = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-/i;
        while (uuidPrefix.test(name)) {
          name = name.replace(uuidPrefix, '');
        }

        // 2) Sanitizamos el nombre (opcional pero recomendable)
        name = name
          .trim()
          .replace(/\s+/g, '-')         // espacios -> guiones
          .replace(/[^a-zA-Z0-9-_]/g, '') // quita caracteres raros
          .toLowerCase();

        // 3) Prefijamos un único GUID
        const uniqueName = `${uuid()}-${name || 'file'}${ext}`;

        cb(null, uniqueName);
      },

      }),
    };
  }
}
