import { PageLimitKey, DefaultPageLimit, TokenKey, DefaultToken } from '../constants';

export const getPageLimit = () =>
  (uni.getStorageSync(PageLimitKey) || DefaultPageLimit) as TPageLimit;

export const setPageLimit = (pageLimit: TPageLimit) => uni.setStorageSync(PageLimitKey, pageLimit);

export const getToken = () => (uni.getStorageSync(TokenKey) || DefaultToken) as string;

export const setToken = (token: string) => uni.setStorageSync(TokenKey, token);
