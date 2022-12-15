import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Position } from 'src/app/core/models/position.model';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.scss'],
})
export class PositionDetailComponent {

  form:FormGroup;
  mode:"New" | "Edit" = "New";

  @Input('position') set position(position:Position){
    if(position){
      this.form.controls.id.setValue(position.id);
      this.form.controls.name.setValue(position.name);
      this.form.controls.time.setValue(position.time);
      this.form.controls.valor.setValue(position.valor);
      this.form.controls.picture.setValue(position.picture);
      this.mode = "Edit";
    }
  }
  
  constructor(
    private fb:FormBuilder,
    private modal:ModalController
  ) { 
    this.form = this.fb.group({
      id:[null],
      name:['', [Validators.required]],
      time:['', [Validators.required]],
      valor:[''],
      picture:['']
    });
  }

  onSubmit(){   
    this.modal.dismiss({position: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }

}
