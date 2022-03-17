import pkg from '@/../package.json';

export { default as pkg } from '@/../package.json';

export const Headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Version': `${pkg.name}/${pkg.version}`,
};

export const PageLimitKey = 'pageLimit';
export const DefaultPageLimit: TPageLimit = 10;
export const PageLimits: TPageLimit[] = [10, 20, 30];

export const TokenKey = 'token';
export const DefaultToken = '';
