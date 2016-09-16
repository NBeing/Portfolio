import {Http, Headers} from 'angular2/http';
import {Injectable, Output, EventEmitter} from 'angular2/core';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Rx from 'rxjs/Rx';
declare var io: any;

const BASE_URL = 'http://localhost:3030/api/';
const HEADER = { headers: new Headers({ 'Content-Type': 'image/jpeg'} )};

@Injectable()

export class HegelService{
    socket:any;
    selection: Rx.Observable<any>;
    mouseup: Rx.Observable<any>;

    constructor(private http: Http) {
        this.socket = io('http://localhost:3030', {reconnect: true});
        this.socket.on("wikiSend", (msg:any) => {
            msg = {msg: msg};
            this.socket.emit('received', msg, function (data:any) {});
        });
        this.mouseup = this.fromDOMSource('mouseup', window.document).map((pos)=>{return this.getSelectionText(pos)});
    }

    fromDOMSource(eventName: string, el: any): Rx.Observable<any> {
        return Rx.Observable.fromEventPattern(
            callback => el.addEventListener(eventName, callback, false),
            callback => el.removeEventListener(eventName, callback)
        );
    }
    handleWikipediaLink($event:any){
        console.log("Gotta handle that!")
        let href = $event.srcElement.href;
        href = href.slice(27, href.length);
        return this.getWiki(href);
    }
    getWiki(word:string){
        word = this.replaceUnderscoreAndCap(word);
        word = word.replace(/\_/g," ");
        console.log("Getting word" + word)
        this.requestWiki(word).subscribe(res => {
            res = JSON.parse(res);
            if(res.type === "html"){
                console.log("HTML")
                return res.results;
            } else if(res.type === 'terms'){
                console.log("TERMS")
                return res.results;
            }
        });
    }

    replaceUnderscoreAndCap(word:string){
        word = word.charAt(0).toUpperCase() + word.slice(1);
        word = word.replace(/\_/g," ");
        return word;
    }

    getSelectionText() {
        console.log("Getting selection text")
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
                text = document.selection.createRange().text;
        }
        console.log("Selection text: " , text)
        return text;
    }
    getHegel(num:number){
        return this.http.get(BASE_URL + "hegels/" + num , HEADER)
            .map(res => res.json()).map(res => res[0]);
    }
    requestWiki(word:String){
        console.log("Getting Wiki :" , word );
        if( word !== ""){
            return this.http.get(BASE_URL + "wiki/" + word)
                .map(res => res._body);
        } 
    }

  //    this.items = store.select('items'); //Grabbing this collection Store = A database for the application -- A reducer define a table -- Store.select is a database query 
 // }

  // loadItems() {
  //   this.http.get(BASE_URL)
  //     .map(res => res.json())
  //     .map(payload => ({ type: 'ADD_ITEMS', payload }))
  //     .subscribe(action => this.store.dispatch(action));
  // }

  // saveItem(item: Item) {
  //   (item.id) ? this.updateItem(item) : this.createItem(item);
  // }

  // createItem(item: Item) {
  //   this.http.post(`${BASE_URL}`, JSON.stringify(item), HEADER)
  //     .map(res => res.json())
  //     .map(payload => ({ type: 'CREATE_ITEM', payload }))
  //     .subscribe(action => this.store.dispatch(action));
  // }

  // updateItem(item: Item) {
  //   this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
  //     .subscribe(action => this.store.dispatch({ type: 'UPDATE_ITEM', payload: item }));
  // }

  // deleteItem(item: Item) {
  //   this.http.delete(`${BASE_URL}${item.id}`)
  //     .subscribe(action => this.store.dispatch({ type: 'DELETE_ITEM', payload: item }));
  // }
}
