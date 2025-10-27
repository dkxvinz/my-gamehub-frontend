import { Component } from '@angular/core';
import { Header } from "../header/header";
import { CommonModule } from '@angular/common';
import { DiscountService } from '../../services/api/discount';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-discount',
  imports: [Header,CommonModule,FormsModule],
  templateUrl: './create-discount.html',
  styleUrl: './create-discount.scss'
})
export class CreateDiscount {

presetAmounts: number[] = [50,100, 300, 500, 1000, 1500];

selectAmount(amount: number): void {
    this.selectedAmount = amount;
  }


selectedAmount: number | null = null;

constructor(private discountService:DiscountService){}


  onCreate(){

    
  }
}
