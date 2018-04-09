import { Injectable } from '@angular/core';
import { Sender } from '../models/sender';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SenderService {

  private _senders: BehaviorSubject<Sender[]>;
  
  private dataStore: {
    senders: Sender[]
  }

  constructor(private http: HttpClient) {
    this.dataStore = { senders: [] };
    this._senders = new BehaviorSubject<Sender[]>([]);
  }

  get senders(): Observable<Sender[]> {
    console.log("senders " + this._senders);
    return this._senders.asObservable();
  }

  senderById(id: number) {
    return this.dataStore.senders.find(x => x.id == id);
  }

  loadAll() {
    
  //const usersUrl = 'https://angular-material-api.azurewebsites.net/users';
    const sendersUrl = 'http://localhost:8080/jpa/senders';

    return this.http.get<Sender[]>(sendersUrl)
      .subscribe(data => {
        this.dataStore.senders = data;
        this._senders.next(Object.assign({}, this.dataStore).senders);
      }, error => {
        console.log("Failed to fetch senders");
      });
  }

}
