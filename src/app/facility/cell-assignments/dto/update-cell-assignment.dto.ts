import { PartialType } from '@nestjs/mapped-types';
import { CreateCellAssignmentDto } from './create-cell-assignment.dto';

export class UpdateCellAssignmentDto extends PartialType(CreateCellAssignmentDto) {}
