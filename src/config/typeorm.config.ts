import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanagement',
    // file that ends with entity.ts will be pick by ORM
    entities: [__dirname + '/../**/*.entity.ts'],
    // every time the connection starts it's going to sync withe the schemas
    // in the postgress dataase
    synchronize: true,

};