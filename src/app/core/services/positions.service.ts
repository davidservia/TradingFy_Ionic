import { Injectable } from '@angular/core';
import { LIST_OF_POSITIONS } from 'src/assets/data/list-of-positions';
import { Position } from '..';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  getMarkets() {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  private _position: Position[] = LIST_OF_POSITIONS;

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
      _position.valor = position.valor;
      _position.picture = position.picture;
    }   
  }

}
