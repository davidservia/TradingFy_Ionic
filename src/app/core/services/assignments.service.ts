import * as moment from 'moment-timezone';
import { Injectable } from '@angular/core';
import { Assign } from '..';
import { LIST_OF_ASSIGNMENTS } from 'src/assets/data/list-of-assignments';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  momentjs:any = moment;
  private _assign: Assign[] = LIST_OF_ASSIGNMENTS;
  private _assignsSubject: BehaviorSubject<Assign[]> = new BehaviorSubject(this._assign);
  public _assigns$ = this._assignsSubject.asObservable()

  id: number = this._assign.length + 1;

  getAssignment() {
    return this._assign;
  }

  getAssignmentById(id:number){
    return this._assign.find(a=>a.id==id);
  }

  getAssignmentByMarketId(marketId: number): Assign[] {
    return this._assign.filter(p => p.marketId == marketId);
  }

  getAssignmentByPositionId(positionId: number): Assign[] {
    return this._assign.filter(p => p.positionId == positionId);
  }

  deleteAssignmentById(id: number) {
    this._assign = this._assign.filter(p => p.id != id);
  }

  addAssignmnet(assign: Assign) {
    assign.id = this.id++;
    this._assign.push(assign);
  }

  updateAssignment(assign: Assign) {
    var _assign = this._assign.find(p => p.id == assign.id)
    if (_assign) {
      _assign.marketId = assign.marketId;
      _assign.positionId = assign.positionId;
      _assign.createdAt = assign.createdAt;
      _assign.dateTime = assign.dateTime;
    }
  }
}
