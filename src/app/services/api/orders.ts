import { Injectable } from "@angular/core";
import { Constants } from "../../config/costants";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth";
import { lastValueFrom } from "rxjs";
import { orderItem } from "../../model/orders_ges_res";

@Injectable({
     providedIn:'root'
})
export class OrdersService{
constructor(private constants:Constants,private http:HttpClient,private authSerVice:AuthService){}


/////////////////////////////////////////////
 public async getAllOnCart(userId:number) {
    const url = `${this.constants.API_ENDPOINT}/orders/onCart/${userId}`;
  try {
    const token = this.authSerVice.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return await lastValueFrom(this.http.post(url, {}, {headers}));
    
  } catch (err) {
    console.error('Orders failed:', err);
    throw err;
  }
}



//state = add cart
public async getAddCart(gameId: number) {
  const url = `${this.constants.API_ENDPOINT}/orders/addCart/${gameId}`;
  try {
    const token = this.authSerVice.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return await lastValueFrom(this.http.post(url, {}, {headers}));
    
  } catch (err) {
    console.error('Orders failed:', err);
    throw err;
  }
}


public async getCheckOrders(gameId: number) {
  const url = `${this.constants.API_ENDPOINT}/orders/checkOrder/${gameId}`;
  try {
    const token = this.authSerVice.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return await lastValueFrom(this.http.post(url, {}, { headers: headers }));
    
  } catch (err) {
    console.error('Orders failed:', err);
    throw err;
  }
}
}