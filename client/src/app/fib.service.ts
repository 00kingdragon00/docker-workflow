import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class FibService {
  constructor(private httpClient: HttpClient) {}

  fetchValues(): any {
    return this.httpClient.get('/api/values/current');
  }

  fetchIndexes(): any {
    return this.httpClient.get('/api/values/all');
  }

  sendValue(index): any {
    return this.httpClient.post('/api/values', { index });
  }
}
