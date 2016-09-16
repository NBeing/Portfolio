/* eslint-env mocha */

const { expect } = require('chai')
const React = require('react')
const {Hegel} = require('../js/Hegel')
const { shallow, mount, render } = require('enzyme')
const { store } = require('../js/HegelStore')

describe('<Hegel /> ', () => {
  it('should render the brand', () => {
    const wrapper = render(<Hegel store={store} />)
    expect(wrapper.find('h1.book-title').text()).to.equal("Hegel\'s Phenomenology of Spirit")
  })
})

