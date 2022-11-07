"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const options = {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    dropSchema: false,
    logging: process.env.NODE_ENV !== 'production',
    entities: [__dirname + '/entities/**/*{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};
exports.dataSource = new typeorm_1.DataSource(options);
exports.default = options;
//# sourceMappingURL=data-source.js.map