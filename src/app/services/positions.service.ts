import { Injectable } from '@angular/core';
import { Position } from '../models/position';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor() { }

  private _position: Position[] = [
    {
      id:1,
      name:"Nasdaq 100",
      time:30,
      picture:"https://s03.s3c.es/imag/_v0/770x420/b/7/a/490x_Nasdaq-770-Reuters.jpg"
    },
    {
      id:2,
      name:"Spx500",
      time:20,
      picture:"https://d2f911aicdllsf.cloudfront.net/symbol_icons/SPX500.png"
    },
    {
      id:3,
      name:"Bitcoin",
      time:50,
      picture:"https://s2.coinmarketcap.com/static/img/coins/200x200/1.png"
    },
    {
      id:4,
      name:"Tlry",
      time:150,
      picture:"https://g.foolcdn.com/art/companylogos/square/tlry.png"
    }
  ];

  id: number = this._position.length+1;

  getPositions(): Position[] {
    return this._position;
  }

  getPositionById(id:number){
    return this._position.find(p=>p.id==id);
  }

  deletePositionById(id:number){
    this._position = this._position.filter(p=>p.id != id); 
  }

  addPosition(position:Position){
    position.id = this.id++;
    this._position.push(position);
  }

  updatePosition(position:Position){
    var _position = this._position.find(p=>p.id==position.id);
    if(_position){
      _position.name = position.name;
      _position.time = position.time;
      _position.picture = position.picture;
    }   
  }

}
