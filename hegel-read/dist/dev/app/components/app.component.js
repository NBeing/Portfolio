"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var hegel_component_1 = require('../../hegel/components/hegel.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'sd-app',
            templateUrl: './app/components/app.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/hegel', name: 'Hegel', component: hegel_component_1.HegelComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wb25lbnRzL2FwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx1QkFBNkMsaUJBQWlCLENBQUMsQ0FBQTtBQUMvRCxnQ0FBNkIsd0NBQXdDLENBQUMsQ0FBQTtBQVN0RTtJQUFBO0lBQTJCLENBQUM7SUFSNUI7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLHFDQUFxQztZQUNsRCxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsQ0FBQztTQUNoQyxDQUFDO1FBQ0Qsb0JBQVcsQ0FBQztZQUNULEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRyxJQUFJLEVBQUUsT0FBTyxFQUFHLFNBQVMsRUFBRSxnQ0FBYyxFQUFDO1NBQ2hFLENBQUM7O29CQUFBO0lBQ3lCLG1CQUFDO0FBQUQsQ0FBM0IsQUFBNEIsSUFBQTtBQUFmLG9CQUFZLGVBQUcsQ0FBQSIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9hcHAuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFUywgUm91dGVDb25maWd9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG5pbXBvcnQge0hlZ2VsQ29tcG9uZW50fSBmcm9tICcuLi8uLi9oZWdlbC9jb21wb25lbnRzL2hlZ2VsLmNvbXBvbmVudCc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZC1hcHAnLFxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXBwLmNvbXBvbmVudC5odG1sJyxcbiAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbkBSb3V0ZUNvbmZpZyhbXG4gICAgeyBwYXRoOiAnL2hlZ2VsJyAsIG5hbWU6ICdIZWdlbCcgLCBjb21wb25lbnQ6IEhlZ2VsQ29tcG9uZW50fVxuXSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge31cbiJdfQ==
