import { Injectable } from '@nestjs/common';
import fetch, { RequestInit } from 'node-fetch';

@Injectable()
export class HttpFetchService {
  async getHttp<Type>(
    uri: string,
    query?: string,
    auth?: string,
  ): Promise<Type> {
    let url = `${uri}`;
    if (query) {
      url += query;
    }
    const opts: RequestInit = {
      method: 'GET',
      headers: {},
    };

    if (auth) {
      opts.headers = {
        ...opts.headers,
        Authorization: auth,
      };
    }

    const resp = await fetch(url, opts);
    const data = await resp.json();

    return data;
  }
}
