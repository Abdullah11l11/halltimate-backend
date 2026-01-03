import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/shared/utils/enum';

// Roles Method
export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles);
