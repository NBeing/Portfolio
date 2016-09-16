import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {HegelComponent} from '../../hegel/components/hegel.component';
@Component({
  selector: 'sd-app',
  templateUrl: './app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/hegel' , name: 'Hegel' , component: HegelComponent}
])
export class AppComponent {}
