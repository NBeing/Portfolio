import {Pipe} from 'angular2/core';

@Pipe({
    name: "search"
})
export class SearchPipe{
    transform(value:any, [search]){
        if(value){
            return value.filter((item:any) => {
                let entry = item;
                let results = [];
                if(entry.indexOf(search) > -1){
                    results.push(entry)
                    return(results);
                }
            });
        }
    }
}
