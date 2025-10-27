import { Component } from '@angular/core';
import { Header } from "../header/header";
import { CommonModule } from '@angular/common';
import { DiscountService } from '../../services/api/discount';
import { FormsModule } from '@angular/forms';
import { MatCard } from "@angular/material/card";
import { MatInput } from "@angular/material/input";
import { DiscountGetRes } from '../../model/discount_get_res';


@Component({
  selector: 'app-create-discount',
  imports: [Header, CommonModule, FormsModule, MatCard, MatInput],
  templateUrl: './create-discount.html',
  styleUrl: './create-discount.scss'
})
export class CreateDiscount {

discounts:DiscountGetRes[] = [];
presetAmounts: number[] = [50,100, 300, 500, 1000, 1500];
selectedAmount: number | null = null;
discountCode: string = '';
discountMax: number = 0 ;
selectAmount(amount: number): void {
    this.selectedAmount = amount;
  }

constructor(private discountService:DiscountService){}


  async onCreate(){
    try {
      if(!this.discountCode && !this.discountMax && !this.selectedAmount){
           await this.discountService.createDiscount(this.discountCode,this.selectedAmount!,this.discountMax,);

      }
      
    } catch (err) {
      
    }

    
  }
}
