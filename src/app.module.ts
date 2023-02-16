import { Module } from '@nestjs/common';
import { ButtonsModule } from './buttons/buttons.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { DevicesModule } from './devices/devices.module';
import { ConfigModule } from '@nestjs/config';
import { Device } from './devices/devices.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Device],
            autoLoadModels: true, 
          }),
        DevicesModule,
        ButtonsModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
