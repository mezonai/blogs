/* eslint-disable @typescript-eslint/no-explicit-any */
export type AxiosErrorResponse = {
  message: string;
  name: string;
  stack?: string;
  code: string;
  status: number;
  response: {
    data: {
      error?: ErrorData;
    };
    status: number;
    statusText: string;
  };
};

export type ErrorData = {
  message: string;
  name?: string;
};

export type AxiosResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: Record<string, any>;
  request?: any;
};

export type MetaWithPagination = {
  pagination: Pagination;
};

export type Pagination = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};
