import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Market, Position, PositionDetailComponent, PositionsService } from 'src/app/core';
import { lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-positions',
  templateUrl: './positions.page.html',
  styleUrls: ['./positions.page.scss'],
})
export class PositionsPage {
  public result = [];
  handleChange(event) {
    const query = event.target.value.toLowerCase();
   // this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
   this.result = this.position.getPositions().filter(d => d.name.toLowerCase().indexOf(query) > -1)
    
  }

  constructor(
    public positionsService: PositionsService,
    private modal: ModalController,
    private alert: AlertController,
    private translate:TranslateService,
    private position:PositionsService
  ) { }

  getPositions(){
    return this.positionsService.getPositions();
  }

  async presentPositionForm(position:Position){
    const modal = await this.modal.create({
      component:PositionDetailComponent,
      componentProps:{
        position:position
      }
    });
    
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.positionsService.addPosition(result.data.position);
            break;
          case 'Edit':
            this.positionsService.updatePosition(result.data.position);
            break;
          default:
        }
      }
    });
  }
  
  onNewPosition(){
    this.presentPositionForm(null);  
  }

  onEditPosition(position){
    this.presentPositionForm(position);
  }

  async onDeleteAlert(position){
    const alert = await this.alert.create({
      header: await lastValueFrom(this.translate.get('Position.aviso')),
      buttons: [
        {
          text: await lastValueFrom(this.translate.get('button.cancel')),
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: await lastValueFrom(this.translate.get('button.delete')),
          role: 'confirm',
          handler: () => {
            this.positionsService.deletePositionById(position.id);
          },
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  
  onDeletePosition(position){
   this.onDeleteAlert(position);    
  }

}
