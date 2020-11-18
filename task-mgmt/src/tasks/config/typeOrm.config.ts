import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "mongodb",
    host: "localhost",
    port: 27017,
    username: "",
    password: "",
    database: "task_management",
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    autoLoadEntities: true,
    useUnifiedTopology: true
}