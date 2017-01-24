import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {API_KEY} from '../../../config';

@Injectable()
export class HttpWrapper {
  
  constructor(http: Http) {
    this.http = http;
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('API_KEY', API_KEY);
    headers.append('Content-Type', 'application/json');
  }
  
  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }
  
  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
  
  put(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    });
  }
  
  delete(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    });
  }
  
}
