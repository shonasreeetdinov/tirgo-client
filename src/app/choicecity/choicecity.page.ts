import { Component, ElementRef, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-choicecity',
  templateUrl: './choicecity.page.html',
  styleUrls: ['./choicecity.page.scss'],
})
export class ChoicecityPage implements OnInit {
  findList: any[] | undefined = [];
  viewText = false;
  scrollTopPosition = 0;
  disableScroll = false;
  cities: any[] = [];
  items: any[] = [];
  loadingFind: boolean = false;
  private searchTerms = new Subject<string>();

  constructor(
    public modalCtrl: ModalController,
    public authService: AuthenticationService,
    public element: ElementRef,
    public platform: Platform,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300),
      switchMap((term: string) => (term ? this.getCity(term) : of([]))),
      catchError(error => {
        console.log(error);
        return of([]);
      })
    ).subscribe(suggestions => {
      this.findList = suggestions;
      this.loadingFind = false;
    });
  }

  findCity(ev: any) {
    const query = ev.target.value;
    if (query) {
      this.loadingFind = true;
      this.searchTerms.next(query);
    } else {
      this.findList = [];
      this.loadingFind = false;
    }
  }

  getCity(query: string) {
    const API_URL = 'https://admin.tirgo.io/api';
    const sUrl = API_URL + '/users/findCity';
    const body = JSON.stringify({ query });
    return this.http.post<any>(sUrl, body).pipe(
      map(res =>
        res.status
          ? res.data.suggestions.map((el: any) => ({
              name: (el.data.city ? el.data.city : el.data.region) + ', ' + el.data.country,
            }))
          : []
      )
    );
  }

  async setCity(city: any) {
    if (!city.name) {
      await this.authService.alert('Ошибка', 'Требуется выбрать город');
    } else {
      await this.modalCtrl.dismiss({ city });
    }
  }

  scrollEvent(ev: any) {
    this.scrollTopPosition = ev.detail.scrollTop;
  }
}
