"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_1 = require("../src/add");
describe('A suite is just a function', function () {
    it('and so is a spec', function () {
        var r = add_1.add(1, 2);
        expect(r).toBe(3);
    });
});
//# sourceMappingURL=test.spec.js.map