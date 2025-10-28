import { Component } from '@angular/core';
import { Header } from "../header/header";
import { GamesGetRes } from '../../model/game_get_res';

@Component({
  selector: 'app-cartpage',
  imports: [Header],
  templateUrl: './cartpage.html',
  styleUrl: './cartpage.scss'
})
export class Cartpage {

  games:GamesGetRes|null=null;
  constructor(){

  }

}