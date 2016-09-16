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
var SearchPipe = (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (value, _a) {
        var search = _a[0];
        if (value) {
            return value.filter(function (item) {
                var entry = item;
                var results = [];
                if (entry.indexOf(search) > -1) {
                    results.push(entry);
                    return (results);
                }
            });
        }
    };
    SearchPipe = __decorate([
        core_1.Pipe({
            name: "search"
        }), 
        __metadata('design:paramtypes', [])
    ], SearchPipe);
    return SearchPipe;
}());
exports.SearchPipe = SearchPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC9zZWFyY2gtcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQW1CLGVBQWUsQ0FBQyxDQUFBO0FBS25DO0lBQUE7SUFhQSxDQUFDO0lBWkcsOEJBQVMsR0FBVCxVQUFVLEtBQVMsRUFBRSxFQUFRO1lBQVAsY0FBTTtRQUN4QixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFRO2dCQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztnQkFDakIsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7b0JBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ25CLE1BQU0sQ0FBQSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQWZMO1FBQUMsV0FBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLFFBQVE7U0FDakIsQ0FBQzs7a0JBQUE7SUFjRixpQkFBQztBQUFELENBYkEsQUFhQyxJQUFBO0FBYlksa0JBQVUsYUFhdEIsQ0FBQSIsImZpbGUiOiJzZWFyY2gvc2VhcmNoLXBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BpcGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogXCJzZWFyY2hcIlxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hQaXBle1xuICAgIHRyYW5zZm9ybSh2YWx1ZTphbnksIFtzZWFyY2hdKXtcbiAgICAgICAgaWYodmFsdWUpe1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmZpbHRlcigoaXRlbTphbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZW50cnkgPSBpdGVtO1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgaWYoZW50cnkuaW5kZXhPZihzZWFyY2gpID4gLTEpe1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZW50cnkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybihyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
