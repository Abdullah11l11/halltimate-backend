import { PartialType } from '@nestjs/mapped-types';
import { CreatePrisonerDto } from './create-prisoner.dto';

export class UpdatePrisonerDto extends PartialType(CreatePrisonerDto) {}
