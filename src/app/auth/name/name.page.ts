import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { ModalController } from "@ionic/angular";
import { ChoicecityPage } from "../../choicecity/choicecity.page";
import { Router } from "@angular/router";
import { AppComponent } from "../../app.component";
import { Filesystem } from '@capacitor/filesystem';
import { Http } from '@capacitor-community/http';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-name',
  templateUrl: './name.page.html',
  styleUrls: ['./name.page.scss'],
})
export class NamePage implements OnInit {
  name: string = '';
  country: string | undefined = 'Выберите';
  city: string | undefined = 'ород';

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private app: AppComponent,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

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
    if (data && data.city) {
      console.log(data.city.data);
      await this.authService.saveCityInfo(data.city.data).toPromise()
        .then(async (res: any) => {
          if (res.status) {
            this.country = data.city.data.country;
            this.city = data.city.data.city ? data.city.data.city : data.city.data.region;
            if (this.authService.currentUser) {
              this.authService.currentUser.city = data.city.data.city ? data.city.data.city : data.city.data.region;
              this.authService.currentUser.country = data.city.data.country;
            }
          }
        })
        .catch(async (err: any) => {
          console.log(err);
        });
      //this.city = data.city.value;
    }
  }

  async regUser() {
    if (this.name && this.country && this.city) {
      await this.authService.regUser(this.name).toPromise()
        .then(async (res) => {
          if (res.status) {
            await this.app.checkSession();
            await this.router.navigate(['/tabs/home'], { replaceUrl: true });
          }
        })
        .catch(async (err) => {});
    } else {
      this.authService.alert('Упс', 'Для регистрации требуется указать Ваше Имя и регион.');
    }
  }

  async cropUpload() {
    try {
      const result = await FilePicker.pickFiles({
        types: ['image/*'],
      });

      if (result.files.length > 0) {
        const file: any = result.files[0];
        const base64Data = await this.readAsBase64(file.uri);

        const headers = {
          'Authorization': 'Bearer ' + AuthenticationService.jwt,
          'Content-Type': 'multipart/form-data'
        };

        const blob = this.base64ToBlob(base64Data, 'image/jpeg');
        const formData = new FormData();
        formData.append('typeUser', 'client');
        formData.append('typeImage', 'avatar');
        formData.append('file', blob, file.name);

        const response = await Http.post({
          url: this.authService.serverApi + '/users/uploadImage',
          headers: headers,
          data: formData
        });

        const res = response.data;
        if (res.status) {
          this.authService.currentUser.avatar = res.file.preview;
        }
      }
    } catch (error) {
      console.error('Error picking or uploading file', error);
    }
  }

  async readAsBase64(path: string): Promise<string> {
    const file: any = await Filesystem.readFile({
      path: path
    });

    return file.data;
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }
}
