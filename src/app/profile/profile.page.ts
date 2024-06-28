import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from "@ionic/angular";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { spollers } from "../../assets/scripts/functions";
import { Camera, CameraOptions, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem } from "@capacitor/filesystem";
import { ChoicecityPage } from "../choicecity/choicecity.page";
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  id: number | undefined;
  phone: string | undefined = '';
  name: string | undefined = '';
  country: string | undefined = 'Выберите';
  city: string | undefined = 'ород';
  constructor(
    private navCtrl: NavController,
    public authService: AuthenticationService,
    private router: Router,
    private modalController: ModalController,
    private alert: AlertController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.id = this.authService.currentUser?.id
    this.phone = this.authService.currentUser?.phone
    this.name = this.authService.currentUser?.name
    this.country = this.authService.currentUser?.country
    this.city = this.authService.currentUser?.city
  }
  ngAfterViewInit() {
    spollers()
  }
  back() {
    this.navCtrl.back()
  }
  async cropUpload() {
    try {
      const image = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });
  
      const imageData = await fetch(image.webPath!);
      const blob = await imageData.blob();
  
      const formData = new FormData();
      formData.append('file', blob, `avatar_${new Date().getTime()}.jpeg`);
      formData.append('typeUser', 'client');
      formData.append('typeImage', 'avatar');
  
      const response = await fetch(`${this.authService.serverApi}/users/uploadImage`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + AuthenticationService.jwt
        },
        body: formData
      });
  
      if (response.ok) {
        const res = await response.json();
        if (res.status) {
          this.authService.currentUser.avatar = res.file.preview;
        }
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  async selectRegion() {
    const modal = await this.modalController.create({
      component: ChoicecityPage,
      showBackdrop: true,
      breakpoints: [0, 0.9],
      initialBreakpoint: 0.9,
      presentingElement: await this.modalController.getTop(),
      backdropDismiss: true,
      cssClass: 'modalCss',
      mode: 'ios',
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    
    if (data && data.city) {
      try {
        const res = await this.authService.saveCityInfo(data.city.data).toPromise();
        if (res.status) {
          this.country = data.city.data.country;
          this.city = data.city.data.city;
          this.authService.currentUser.city = data.city.data.city;
          this.authService.currentUser.country = data.city.data.country;
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
  
  async deleteModal() {
    const alert = await this.alert.create({
      header: 'Вы уверены?',
      message: 'Вы уверены что хотите удалить данного аккаунт?',
      cssClass: 'customAlert',
      buttons: [
        {
          text: 'Нет',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Да',
          handler: async () => {
            const res = await this.authService.delUser(this.authService.currentUser.id).toPromise()
            if (res.status) {
              await alert.present();
              await this.storage.clear();
              await this.authService.logout();
              await this.router.navigate(['selectlanguage'], { replaceUrl: true });
            } else {
              this.authService.alert('Ошибка', res.error)
            }
          }
        }
      ],
    });
    await alert.present();
  }
}
