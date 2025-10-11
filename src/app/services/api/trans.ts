import { Inject, Injectable } from '@angular/core';
import { Constants } from '../../config/costants';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranSactionService {
  constructor(
    private constants: Constants,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  public async getAllTransactin(options?: any) {
    const url = this.constants.API_ENDPOINT + '/trans';
    const response = await lastValueFrom(this.http.get(url));
    return response;
  }

  public async createTopup(userId: number, price: number): Promise<void> {

    const body = { price: price };
    const url = `${this.constants.API_ENDPOINT}/trans/topup/${userId}`;
    try {

          const response = await lastValueFrom(this.http.post(url, body));
          console.log('Top-up successful:', response);
    } catch (error) {
          console.error('Top-up failed:', error);
    }
  }
}
