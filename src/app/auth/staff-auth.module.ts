import { Module } from '@nestjs/common';
import { StaffAuthService } from './staff-auth.service';
import { StaffAuthController } from './staff-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from 'src/database/entities/user-account.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserAccount]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRED') },
      }),
    }),
  ],
  controllers: [StaffAuthController],
  providers: [StaffAuthService],
})
export class StaffAuthModule {}
