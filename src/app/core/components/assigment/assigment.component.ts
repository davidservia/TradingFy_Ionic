import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { Assign, MarketsService, PositionsService, Position, Market } from '../..';

@Component({
  selector: 'app-assignment',
  templateUrl: './assigment.component.html',
  styleUrls: ['./assigment.component.scss'],
})
export class AssignmentComponent {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() assign:Assign;
  isLowResolution = lowres;

  constructor(
    private marketsService: MarketsService,
    private positionsService: PositionsService,
  ) {}

  getPosition():Position{
    //console.log(new Date().toISOString());
    var positionId = this.assign.positionId;
    if(positionId)
      return this.positionsService.getPositionById(positionId);
    return undefined;
  }

  getMarket():Market{
    //console.log(new Date().toISOString());
    var marketId = this.assign.marketId;
    if(marketId)
      return this.marketsService.getMarketById(marketId);
    return undefined;
  }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.assign);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.assign);
  }

}