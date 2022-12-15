import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Market } from '../..';


@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.scss'],
})

export class MarketDetailComponent {

  form:FormGroup;
  mode:"New" | "Edit" = "New";

  @Input('market') set market(market:Market){
    if(market){
      this.form.controls.id.setValue(market.id);
      this.form.controls.name.setValue(market.name);
      this.form.controls.pais.setValue(market.pais);
      this.form.controls.horario.setValue(market.horario);
      this.form.controls.picture.setValue(market.picture);
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
      pais:['', [Validators.required]],
      horario:['', [Validators.required]],
      picture:['']
    });
  }

  onSubmit(){   
    this.modal.dismiss({market: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }

}
