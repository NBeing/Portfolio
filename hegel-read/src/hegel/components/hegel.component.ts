import {
    Component,
    OnInit
} from 'angular2/core';

import {
    ROUTER_DIRECTIVES
} from 'angular2/router';

import {
    HegelService
} from '../../shared/services/hegel.service';
import {SearchPipe} from '../../search/search-pipe';

import * as Rx from 'rxjs/Rx';
import {Observer} from "rxjs/Observer";
import {BrowserDomAdapter} from 'angular2/platform/browser';

@Component({
    selector: 'sd-navbar',
    templateUrl: '../hegel/components/hegel.template.html',
    styleUrls: ['../hegel/components/hegel.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [HegelService, BrowserDomAdapter],
    pipes: [SearchPipe]
})

export class HegelComponent implements OnInit {
    hegel: Array<any>;
    index: number = 1;
    wiki: any;
    terms: any;
    item: number = 0;
    subscription: any;
    dictionaries:any;
    syns:any;
    defs:any;
    glosses:any;
    searchTerm:any;
    dis:any;
    links:any;
    previous:any;

    constructor(private hegelService: HegelService, private _dom: BrowserDomAdapter) {
        this.searchTerm = "";
        this.dictionaries = {info: []};
        this.previous = [];

    };
    increment(num:number){
        this.index +=num;
        this.getInd(this.index);
    }
    getInd(num:number){
        this.hegelService.getHegel(num).subscribe(res => this.hegel = res);
    };
    getTerm(term:string){
        term = term.replace(/[0-9]/g, '');
        term = term.replace(/\./g, '');
        this.getWiki(term);
    }
    handleLink($event:any){
        console.log("Link handling");
        let href = $event.target.href;
        href = href.slice(27, href.length);
        this.getWiki(href);
        $event.preventDefault();

    }
    handleWikipediaLink($event:any){
        console.log("Handling Wiki Link");
        this.hegelService.handleWikipediaLink($event);
        $event.preventDefault();
    }
    getWiki(word:string){
        word = this.hegelService.replaceUnderscoreAndCap(word);
        console.log("Checking word" + word)
        var cacheCheck = this.checkCacheForTerm(word);
        if(cacheCheck.length > 0 ) {
            this.getCache(word)
        } else {
            this.hegelService.requestWiki(word).subscribe();
        }
    }
    checkCacheForTerm(term: string){
        var result = this.previous.filter((prev:any)=>{
            if(prev.word == term){
                console.log("Returning" , prev.word )
                return prev;
            }
        })
        return result;
    }
    getCache(term:string){
        var result = this.previous.filter((prev:any) => {
            if(prev.word == term){
                if(prev.page){
                    console.log("Getting wiki from cache");
                    this.wiki = prev.page;
                }
            }
        })
    }
    handleCache(term:any){
        console.log("Handling cache")
        if(typeof(term) == 'String'){
            console.log("Got a string!");
        }
        if(term.page){
            console.log("Setting page")
            this.wiki = term.page
        }
    }
    getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    ngOnInit() {
        //Get the first page
        this.getInd(this.index);

        var s = Rx.Observable.fromEvent(this._dom.query('body'), 'click');
        s.subscribe(e => {
            console.log(e.target.textContent);
            console.log("Selection text!");
            console.log (this.getSelectionText())
            try{
                if(e.target.className == "term"){
                    var cacheCheck = this.checkCacheForTerm(e.target.computedName);
                    if(cacheCheck.length > 0){
                        console.log("Gotta handle that")
                        this.handleCache(e);
                    }

                    console.log("Cache check" , cacheCheck)
                    if(cacheCheck.length > 0 ){
                        this.handleCache(cacheCheck[0]);
                    }else{
                        console.log("computed name")
                        console.log(e.target.computedName)
                        this.getTerm("Category:" + e.target.computedName);
                    }
                }
                if(e.target.className == "links"){
                    console.log("link name")
                    console.log(e.originalTarget.innerHtml)
                    this.getTerm(e.target.textContent);
                    e.preventDefault()
                }
            if(e.target.className == "prevs"){
                var term = this.checkCacheForTerm(e.target.computedName);
                console.log("Logging term from cache" , term);
                this.handleCache(term[0]);
            }
                else{
                    var term = this.getSelectionText()
                    this.getTerm (term);
                }
            } catch (ex){
                console.log(ex);
            }

        })
         function checkForBaddies(cat:string, baddies:any){
            let exists = false;
            baddies.forEach((bad:string)=>{
                if(cat.indexOf(bad) > -1){
                    exists = true
                } else {
                }
            })
             return exists;
        }

        function filterOutBadCategories(categories:any){
            let results:any[] =[];
            let baddies = ["Wikipedia", "Use dmy dates" ,"Use mdy dates","All articles","Articles","NPOV", "CS1",
                       "Commons category with local", "Hidden categories", "Tracking categories", "Pages with URL errors" , "disambiguation", "Pages with incorrect ref formatting"]
            categories = categories.filter( (cat:any) => {
                if(checkForBaddies(cat, baddies) == false){
                    results.push(cat)
                } else{
                    console.log("Bad Category " , cat);
                }
            })
            return results;
        }

        var src = Rx.Observable.fromEvent( this.hegelService.socket, 'wikiSend');
        var subject = new Rx.Subject();
        var multicasted = src.multicast(subject);

        var dicts:any[] = [];
        var categories:any[] = [];

        multicasted.filter(e => {if(e.dictionaries){ dicts = e.dictionaries; return e.dictionaries}}).subscribe(msg => {
            this.dictionaries = msg.dictionaries;
            this.defs = msg.dictionaries.info.map((entry:any)=>{
                return entry.def;
            })
            this.glosses = msg.dictionaries.info.map((def:any)=>{return def.gloss});
        })

        multicasted.filter(e => {
            if(e.categories){
                categories = e.categories;
                return e.categories;
            }})
            .subscribe(msg => {
                msg = msg.categories;
                this.dis=false;
                msg = msg.map((cat:string)=>{
                    cat = cat.substring(9,cat.length);
                    if (cat.indexOf("All disambiguation pages") > -1){
                        this.dis = true;
                    }
                    return cat;
                })
                var results = filterOutBadCategories(msg);
                this.terms = results;
        })
        multicasted.filter(e => {
            if(e.word){
                console.log("word" , e.word)
                let previousObj = { word: e.word, page: e.page};
                if (previousObj.word !== ""){
                    this.previous.push(previousObj.word);
                }

            }
            if(e.page){
                this.wiki = e.page;
            };

            return e.page
        }).subscribe(e => {})

        multicasted.filter(e => {if(e.results){this.terms = e.results}; return e.results}).subscribe(e => {
            //
        })
        multicasted.filter(e => {if(e.links){this.links = e.links}; return e.links}).subscribe(e => {
            //
        })
        multicasted.connect();
    };
};
