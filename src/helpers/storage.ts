import { TokenKey, DefaultToken } from '../constants';

export const getToken = () => uni.getStorageSync(TokenKey) ?? DefaultToken;

export const setToken = (token = DefaultToken) => uni.setStorageSync(TokenKey, token);
