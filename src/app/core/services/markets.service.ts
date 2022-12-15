import { Injectable } from '@angular/core';
import { LIST_OF_MARKETS } from 'src/assets/data/list-of-markets';
import { Market } from '..';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  constructor() { }

  private _markets: Market[] = LIST_OF_MARKETS;

  id: number = this._markets.length + 1;

  getMarkets(): Market[] {
    return this._markets;
  }

  getMarketById(id: number) {
    return this._markets.find(p => p.id == id);
  }

  deleteMarketById(id: number) {
    this._markets = this._markets.filter(p => p.id != id);
  }

  addMarket(market: Market) {
    market.id = this.id++;
    this._markets.push(market);
  }

  updateMarket(market: Market) {
    var _market = this._markets.find(p => p.id == market.id);
    if (_market) {
      _market.name = market.name;
      _market.pais = market.pais;
      _market.horario = market.horario;
      _market.picture = market.picture;
    }
  }

  searchMarket(market: Market){
    this._markets = this._markets.filter(p => p.name == market.name)
  }
}
