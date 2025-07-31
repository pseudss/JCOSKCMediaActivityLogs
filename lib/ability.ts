import { AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, PureAbility, ConditionsMatcher } from '@casl/ability';
import { prismaQuery } from '@casl/prisma/runtime';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type AppSubjects =
  | 'Library'
  | 'AccessManagement'
  | 'MemberActivityLogs'	
  | 'Reports'
  | 'Profile'
  | 'SystemSettings'
  | 'Member'
  | 'all';

type Subjects = InferSubjects<AppSubjects | string> | 'all';

export type AppAbility = PureAbility<[Actions, Subjects]>;
export const AppAbility = PureAbility as AbilityClass<AppAbility>;

export type UserForAbility = {
    id: string;
    userRoles: {
      role: {
        name: string;
        rolePermissions: {
          permission: {
            name: string;
          };
        }[];
      };
    }[];
  };

const permissionNameToSubjectMap: Record<string, AppSubjects> = {
  library: 'Library',
  accessmanagement: 'AccessManagement',
  reports: 'Reports',
  profile: 'Profile',
  member: 'Member',
  user: 'AccessManagement',
  role: 'AccessManagement',
  permission: 'AccessManagement',
};

export function defineAbilityFor(user: UserForAbility) {
  const abilityBuilder = new AbilityBuilder(AppAbility);
  const { can, cannot, build } = abilityBuilder;

  const userRoles = Array.isArray(user?.userRoles) ? user.userRoles : [];

  const grantPermissionsFromDb = (role: any) => {
    const rolePermissions = Array.isArray(role?.RolePermission) ? role.RolePermission : [];
    rolePermissions.forEach((rolePermission: { permission: { name: string } }) => {
      const parts = rolePermission.permission?.name?.split('_');
      const action = parts?.[0]?.toLowerCase() as Actions;
      const subjectKey = parts?.slice(1).join('').toLowerCase();
      const subject = permissionNameToSubjectMap[subjectKey];

      if (action && subject && ['create', 'read', 'update', 'delete', 'manage'].includes(action)) {
        can(action, subject);
        console.log(`[Ability] Granted: ${action} on ${subject} from permission ${rolePermission.permission?.name}`);
      } else {
        console.warn(`[Ability] Could not map permission: ${rolePermission.permission?.name} to a valid action/subject. Action: ${action}, SubjectKey: ${subjectKey}, Mapped Subject: ${subject}`);
      }
    });
  };

  if (userRoles.some(ur => ur?.role?.name === 'SuperAdmin')) {
    can('manage', 'all');
  } else if (userRoles.some(ur => ur?.role?.name === 'Admin')) {
    can('manage', 'AccessManagement');
    can('manage', 'SystemSettings');

    userRoles.forEach(({ role }) => {
      if (role) {
        grantPermissionsFromDb(role);
      }
    });

    can('manage', 'Profile');
    can('update', 'User', { id: user?.id });
  } else {
    userRoles.forEach(({ role }) => {
      if (role) {
        grantPermissionsFromDb(role);
      }
    });

    can('manage', 'Profile');
    can('update', 'User', { id: user?.id });
  }

  return build({
    conditionsMatcher: prismaQuery as unknown as ConditionsMatcher<unknown>,
    detectSubjectType: (subject: any): ExtractSubjectType<Subjects> => {
      if (typeof subject === 'string') {
        return subject as ExtractSubjectType<Subjects>;
      }
      return 'all' as ExtractSubjectType<Subjects>;
    },
  });
}
