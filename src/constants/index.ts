export enum NODE_ENV {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
}

export enum OAUTH_GRANT_TYPE {
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token',
}

export enum AUTH_STRATEGY {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refresh_token',
}

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 20;

export enum DEFAULT_ACTIONS {
  FILTER = 'filter',
  SHOW = 'show',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}
