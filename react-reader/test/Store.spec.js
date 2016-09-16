/* eslint-env mocha */

const { expect } = require('chai')
const React = require('react')
const { shallow, mount, render } = require('enzyme')
const { store, connector, hegelApp, initialState } = require('../js/HegelStore')

describe('Store', () => {
  it('should bootstrap', () => {
    const state = hegelApp(undefined, { type: '@@redux/INIT' })
    expect(state).to.deep.equal(initialState)
  })
})

