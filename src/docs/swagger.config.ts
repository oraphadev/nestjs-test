import { type INestApplication } from '@nestjs/common';
import { ApiProperty, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Nestjs Test API')
    .setDescription('@oraphadev Nestjs Test API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync(
    join(process.cwd(), 'src', 'docs', 'openapi.json'),
    JSON.stringify(document),
  );

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });
};

export function generateDtoFromPrismaModel<T extends object>(): new () => T {
  return class {
    constructor() {
      const type = {} as T;

      for (const key in type) {
        if (Object.prototype.hasOwnProperty.call(type, key)) {
          const propertyType = Reflect.getMetadata('design:type', type, key);

          const apiPropertyDecorator = ApiProperty({
            type: propertyType,
          });

          Object.defineProperty(this, key, {
            value: undefined,
            writable: true,
            enumerable: true,
            configurable: true,
          });

          apiPropertyDecorator(this, key);
        }
      }
    }
  } as any;
}
