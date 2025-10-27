import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from '../../config/costants';
import { lastValueFrom } from 'rxjs';
import { AuthService, } from './auth';
import { DiscountGetRes } from '../../model/discount_get_res';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor(
    private constants: Constants,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  public async getAllDiscount(options?: {
    [param: string]: string | number | boolean;
  }): Promise<DiscountGetRes[]> {
    const url = this.constants.API_ENDPOINT + '/discount/';
    const params = new HttpParams({ fromObject: options });
    const response = await lastValueFrom(this.http.get<DiscountGetRes[]>(url, { params }));
    return response;
  }

  //---------------------------------------------------------------
  public async getDiscountId(discountId: number): Promise<DiscountGetRes | null> {
    const url = `${this.constants.API_ENDPOINT}/games/${discountId}`;
    const response = await lastValueFrom(this.http.get(url));
    return response as DiscountGetRes; 
  }
//-------------------------------------------------------------------
  public async createDiscount(
    discount_code: string,
    discount_price:number,
    max_quantity: number,
  ): Promise<any> {
    const formData = new FormData();
    formData.append('discount_code', discount_code);
    formData.append('discount_price', discount_price.toString());
    formData.append('max_quantity', max_quantity.toString());
  

    
    const url = this.constants.API_ENDPOINT + '/discount/create';
    console.log('Sending create discount request with FormData:', formData);

    try {
      const response = await lastValueFrom(this.http.post(url, formData));
      console.log('Create New Discount success: ', response);
      return response;
    } catch (error) {
      console.error('POST failed: ', error);
    }
  }
  //--------------------------------------------------------------------------------------------------

  //edit users
  public async updateDiscount(
     discontId:number,
     discount_code: string,
     discount_price:number,
     max_quantity: number,
  ): Promise<any> {
    const gameData = {
     discount_code: discount_code,
     discount_price:discount_price,
     max_quantity: max_quantity,
    };
      const formData = new FormData();

  
    formData.append('name', discount_code);
    formData.append('discount_price', discount_price.toString());
    formData.append('max_quantity', max_quantity.toString());
   
    
    const url = `${this.constants.API_ENDPOINT}/discount/update/${discontId}`;

    return lastValueFrom(this.http.put(url,formData));
  }

  //--------------------------------------------------------------------------------------------------
  //delete
  public async deletedGDiscount(discontId: number): Promise<void> {
    const url = `${this.constants.API_ENDPOINT}/games/delete/${discontId}`;
    try {
        await lastValueFrom(this.http.delete(url));
        console.log(`Game with ID ${discontId} deleted successfully.`);
    } catch (error) {
        
        console.error(`Failed to delete game with ID ${discontId}:`, error);
        throw error;
    }
  }
}
