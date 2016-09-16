"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pangram = (function () {
    function Pangram(text) {
        _classCallCheck(this, Pangram);

        this.text = text;
    }

    _createClass(Pangram, [{
        key: "isPangram",
        value: function isPangram() {

            return this.text.replace(/[^A-Za-z]+/g, " ").replace(/[\s\s+]/g, "").toLowerCase().split("").reduce(function (prev, cur) {

                prev.indexOf(cur) == -1 ? prev.push(cur) : null;

                return prev;
            }, []).length == 26 ? true : false;
        }
    }]);

    return Pangram;
})();

exports["default"] = Pangram;
module.exports = exports["default"];