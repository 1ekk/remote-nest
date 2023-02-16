import { Module } from '@nestjs/common';
import { ButtonsModule } from './buttons/buttons.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { DevicesModule } from './devices/devices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './config/postgres.config';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRootAsync({imports: [ConfigModule], inject: [ConfigService], useFactory: getPostgresConfig}),
        DevicesModule,
        ButtonsModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
