const _ = require('jasmine-fixture');
_.beforeEach()
_
describe('Should load a fixture', () => {
    beforeEach(() => {
        _.fixture.setBase('fixtures');
    });

  })