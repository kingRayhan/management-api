export enum UserRolePermissions {

  // article
  CREATE_ARTICLE = 'CREATE_ARTICLE',
  UPDATE_ARTICLE = 'UPDATE_ARTICLE',
  DELETE_ARTICLE = 'DELETE_ARTICLE',


  // comment
  POST_COMMENT = 'POST_COMMENT',
  DELETE_COMMENT = 'DELETE_COMMENT',
  UPDATE_COMMENT = 'UPDATE_COMMENT',


}

export enum AdminRolePermissions {
  ADMINISTRATOR = 'ADMINISTRATOR',
  MANAGE_ROLE_AND_PERMISSION = 'MANAGE_ROLE_AND_PERMISSION',
}

export const Permission = {
  ...AdminRolePermissions,
  ...UserRolePermissions,
};

export type Permission = keyof typeof Permission;
