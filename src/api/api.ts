import { isArray } from "lodash";

import { Default } from "../constants/Defaults";

export interface ApiParams {
  [key: string]: any;
}

export enum HttpMethod {
  GET = "GET",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export enum HttpStatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404
}

export const setAccessToken = async (
  accessToken: string,
  refreshToken: string
) => {
  await localStorage.setItem(Default.ACCESS_TOKEN_STORAGE_KEY, accessToken);
  await localStorage.setItem(Default.REFRESH_TOKEN_STORAGE_KEY, refreshToken);
};

export const removeAccessToken = async () => {
  await localStorage.removeItem(Default.ACCESS_TOKEN_STORAGE_KEY);
  await localStorage.removeItem(Default.REFRESH_TOKEN_STORAGE_KEY);
};

export const apiHelper = async (
  method: string,
  path: string,
  params: ApiParams = {}
): Promise<any> => {
  const accessToken = await localStorage.getItem(
    Default.ACCESS_TOKEN_STORAGE_KEY
  );
  let url = "localhost:3000" + path;
  let requestOptions: any = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  switch (method) {
    case HttpMethod.GET:
    case HttpMethod.DELETE:
      const queryString = Object.entries(params)
        .map(([key, value]) => {
          if (isArray(value)) {
            return value
              .map(v => encodeURIComponent(key) + "[]=" + encodeURIComponent(v))
              .join("&");
          } else {
            return encodeURIComponent(key) + "=" + encodeURIComponent(value);
          }
        })
        .join("&");
      if (queryString) {
        url += "?" + queryString;
      }
      break;

    case HttpMethod.PATCH:
    case HttpMethod.POST:
    case HttpMethod.PUT:
      const headers = {
        ...requestOptions.headers,
        "content-type": "application/json"
      };
      requestOptions = {
        ...requestOptions,
        headers,
        body: JSON.stringify(params)
      };
      break;
  }

  let response = await fetch(url, requestOptions);
  let body;

  try {
    body = await response.json();
  } catch (error) {}

  if (response.status === HttpStatusCode.FORBIDDEN) {
    const refreshToken = await localStorage.getItem(
      Default.REFRESH_TOKEN_STORAGE_KEY
    );
    let refreshOptions: any = {
      method: HttpMethod.GET,
      headers: { Authorization: "Bearer " + refreshToken }
    };
    response = await fetch(Default.API_URL, refreshOptions);

    try {
      body = await response.json();
    } catch (error) {}

    if (response.ok) {
      setAccessToken(body.accessToken, body.refreshToken);
      requestOptions = {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          Authorization: "Bearer " + body.accessToken
        }
      };
      response = await fetch(url, requestOptions);

      try {
        body = await response.json();
      } catch (error) {}
    }
  }
};

export const Api = {
  async get(path: string, params?: ApiParams): Promise<any> {
    return apiHelper(HttpMethod.GET, path, params);
  },
  async post(path: string, params?: ApiParams) {
    return apiHelper(HttpMethod.POST, path, params);
  },
  async put(path: string, params?: ApiParams) {
    return apiHelper(HttpMethod.PUT, path, params);
  },
  async delete(path: string, params?: ApiParams) {
    return apiHelper(HttpMethod.DELETE, path, params);
  }
};

export default Api;
