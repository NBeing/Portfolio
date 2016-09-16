'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Hamming = (function () {
    function Hamming() {
        _classCallCheck(this, Hamming);
    }

    _createClass(Hamming, [{
        key: 'compute',
        value: function compute(a, b) {

            if (a.length !== b.length) {

                throw new Error('DNA strands must be of equal length.');
            }

            var diff = function diff(_x, _x2, _x3, _x4) {
                var _again = true;

                _function: while (_again) {
                    var a = _x,
                        b = _x2,
                        i = _x3,
                        diffs = _x4;
                    _again = false;

                    if (i < 0) {

                        return diffs;
                    }

                    if (a[i] !== b[i]) {

                        diffs += 1;
                    }

                    i -= 1;

                    _x = a;
                    _x2 = b;
                    _x3 = i;
                    _x4 = diffs;
                    _again = true;
                    continue _function;
                }
            };

            return diff(a, b, a.length, 0);
        }
    }]);

    return Hamming;
})();

exports['default'] = Hamming;
module.exports = exports['default'];