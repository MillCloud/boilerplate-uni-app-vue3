import { isObject } from 'lodash-es';
import qs from 'query-string';
import { isRef, isReactive, unref } from 'vue';
import { QueryClient, QueryCache, MutationCache } from 'vue-query';
import { Headers } from '@/constants';
import { showModal } from './modal';
import { getToken, setToken } from './storage';
import { showToast } from './toast';
import type { VueQueryPluginOptions } from 'vue-query';

const reSignInCodes = new Set(['LOGIN_REQUIRED', 'LOGIN_TOKEN_INVALID', 'LOGIN_SESSION_EXPIRED']);

// https://github.com/dcloudio/uni-app/issues/1710#issuecomment-633219364
export async function request<T = BaseData, R = BaseResponse<T>, D = BaseData>(
  config: BaseRequestConfig<D>,
) {
  const baseURL = process.env.VITE_REQUEST_BASE_URL || '';
  const stringifiedParams = qs.stringify(
    Object.fromEntries(
      Object.entries(config.params ?? {}).filter(
        ([, v]) => !['', 'undefined', 'null', undefined, null].includes(v?.toString() ?? v),
      ),
    ),
  );
  const params = stringifiedParams ? `?${stringifiedParams}` : '';
  const url =
    config.url?.startsWith('https://') || config.url?.startsWith('http://')
      ? `${config.url}${params}`
      : `${baseURL}${config.url}${params}`;
  return new Promise<R>((resolve, reject) => {
    uni.request({
      ...config,
      url,
      header: {
        ...Headers,
        ...config.header,
        ...config.headers,
        token: getToken() || '',
        'X-Token': getToken() || '',
      },
      success: (response) => resolve(response as unknown as R),
      fail: (error) => reject(error),
    });
  });
}

export const showError = ({
  error,
  type = 'modal',
  confirm,
}: {
  error?: IResponseError;
  type?: 'toast' | 'modal';
  confirm?: () => void;
} = {}) => {
  const contents = [];
  const code =
    error?.code ??
    // @ts-ignore
    error?.statusCode ??
    // @ts-ignore
    error?.status ??
    error?.response?.data?.code ??
    error?.response?.data?.statusCode ??
    error?.response?.data?.status ??
    // @ts-ignore
    error?.response?.code ??
    error?.response?.statusCode ??
    error?.response?.status ??
    '';
  if (code) {
    contents.push(`错误代码：${code}`);
  }
  // @ts-ignore
  const url = error?.url ?? error?.config?.url ?? error?.request?.url ?? '';
  if (url) {
    contents.push(`请求地址：${url}`);
  }
  const message =
    // @ts-ignore
    error?.message ??
    error?.errMsg ??
    error?.response?.data?.message ??
    error?.response?.data?.errMsg ??
    error?.response?.data?.msg ??
    '';
  if (message) {
    contents.push(`错误信息：${message}`);
  }
  const content = contents.length <= 1 ? contents[0].split('：')[1] : `${contents.join('，')}。`;
  if (type === 'toast') {
    showToast({
      title: content,
      duration: 3000,
    });
    if (confirm) {
      setTimeout(() => {
        confirm();
      }, 3000);
    }
    return;
  }
  if (type === 'modal') {
    showModal({
      title: '错误',
      content,
      success: (result) => {
        if (result && confirm) {
          confirm();
        }
      },
    });
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      showError({
        error: error as IResponseError,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      showError({
        error: error as IResponseError,
      });
    },
  }),
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        // console.log('');
        // console.log('queryKey', queryKey);
        // console.log('');
        let url = `${queryKey[0]}`;
        if (Array.isArray(queryKey[1])) {
          queryKey[1].forEach((item, index) => {
            url = url.replace(`:${index}`, `${unref(item)}`);
          });
        } else if (queryKey[1]) {
          url += `${unref(queryKey[1])}`;
        }
        let params: Record<string, any> = {};
        if (isReactive(queryKey[2]) || isRef(queryKey[2]) || isObject(queryKey[2])) {
          params = Object.fromEntries(
            Object.entries({
              ...params,
              ...unref(queryKey[2] as Record<string, any>),
            }).map(([k, v]) => [unref(k), unref(v)]),
          );
        }
        let config: Record<string, any> = {};
        if (isReactive(queryKey[3]) || isRef(queryKey[3]) || isObject(queryKey[3])) {
          config = Object.fromEntries(
            Object.entries({
              ...config,
              ...unref(queryKey[3] as Record<string, any>),
            }).map(([k, v]) => [unref(k), unref(v)]),
          );
        }
        const { data } = await request<IResponseData>({
          method: 'GET',
          url,
          params,
          ...config,
        });
        if (!(data?.success ?? true)) {
          if (reSignInCodes.has(data.code)) {
            setToken('');
            showError({
              error: {
                errMsg: '请重新登录。',
              },
            });
          } else if ((queryKey[1] as Record<string, any>)?.showError ?? true) {
            showError({
              error: data as unknown as IResponseError,
              type: (queryKey[1] as Record<string, any>)?.showErrorType,
            });
          }
        }
        return data;
      },
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (
          [403, 404, 500].includes(
            (error as IResponseError).response?.statusCode ??
              (error as IResponseError).response?.status ??
              // @ts-ignore
              (error as IResponseError).response?.code ??
              200,
          )
        ) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      mutationFn: async (variables) => {
        // console.log('');
        // console.log('variables', variables);
        // console.log('');
        const { data } = await request<IResponseData>({
          method: 'POST',
          ...Object.fromEntries(
            Object.entries(unref(variables) as Record<string, any>).map(([k, v]) => [
              unref(k),
              unref(v),
            ]),
          ),
        });
        if (!(data?.success ?? true)) {
          if (reSignInCodes.has(data.code)) {
            setToken('');
            showError({
              error: {
                errMsg: '请重新登录。',
              },
            });
          } else if ((variables as Record<string, any>)?.showError ?? true) {
            showError({
              error: data as unknown as IResponseError,
              type: (variables as Record<string, any>)?.showErrorType,
            });
          }
        }
        return data;
      },
      retry: (failureCount, error) => {
        if (
          [403, 404, 500].includes(
            (error as IResponseError).response?.statusCode ??
              (error as IResponseError).response?.status ??
              // @ts-ignore
              (error as IResponseError).response?.code ??
              200,
          )
        ) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
};
