import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { StaffAuthModule } from './auth/staff-auth.module';
import { CellsModule } from './facility/cells/cells.module';
import { PrisonersModule } from './facility/prisoners/prisoners.module';
import { CellAssignmentsModule } from './facility/cell-assignments/cell-assignments.module';
import { CasesModule } from './facility/cases/cases.module';
import { CrimeRecordsModule } from './facility/crime-records/crime-records.module';
import { VisitorsModule } from './facility/visitors/visitors.module';
import { VisitsModule } from './facility/visits/visits.module';
import { IncidentsModule } from './facility/incidents/incidents.module';
import { HealthRecordsModule } from './facility/health-records/health-records.module';
import { DocumentsModule } from './facility/documents/documents.module';
import { StaffModule } from './facility/staff/staff.module';
import { UserAccountsModule } from './facility/user-accounts/user-accounts.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get<string>('DB_DATABASE'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          port: config.get<number>('DB_PORT'),
          host: config.get<string>('DB_HOST'),
          synchronize: process.env.NODE_ENV !== 'production' || true,
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    UserModule,
    StaffAuthModule,
    CellsModule,
    PrisonersModule,
    CellAssignmentsModule,
    CasesModule,
    CrimeRecordsModule,
    VisitorsModule,
    VisitsModule,
    IncidentsModule,
    HealthRecordsModule,
    DocumentsModule,
    StaffModule,
    UserAccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
