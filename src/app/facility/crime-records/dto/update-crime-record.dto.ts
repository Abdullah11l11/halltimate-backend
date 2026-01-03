import { PartialType } from '@nestjs/mapped-types';
import { CreateCrimeRecordDto } from './create-crime-record.dto';

export class UpdateCrimeRecordDto extends PartialType(CreateCrimeRecordDto) {}
