import { PageLimitKey, DefaultPageLimit } from '../constants';

export const getPageLimit = () =>
  (uni.getStorageSync(PageLimitKey) || DefaultPageLimit) as TPageLimit;

export const setPageLimit = (pageLimit: TPageLimit) => uni.setStorageSync(PageLimitKey, pageLimit);
