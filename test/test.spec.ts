import { add } from '../src/add'
let Bootstrap = require('bootstrap');
Bootstrap
describe('A suite is just a function', () => {
  it('and so is a spec', () => {
    const r: number = add(1, 2)
    expect(r).toBe(3)
  })
})