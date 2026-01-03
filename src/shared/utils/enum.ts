export enum UserType {
  ADMIN = 'admin',
  WARDEN = 'warden',
  GUARD = 'guard',
  MEDICAL = 'medical',
  CASE_MANAGER = 'case_manager',
  VISITOR_OFFICER = 'visitor_officer',
  CLERK = 'clerk',
}

export const STAFF_ROLES: UserType[] = [
  UserType.ADMIN,
  UserType.WARDEN,
  UserType.GUARD,
  UserType.MEDICAL,
  UserType.CASE_MANAGER,
  UserType.VISITOR_OFFICER,
  UserType.CLERK,
];
