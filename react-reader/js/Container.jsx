const React = require('react')

const Container = (props) => (
  <div className='container'>
      <h1 className='book-title'>Hegel's Phenomenology of Spirit</h1>
      {props.children}
  </div>
)
Container.propTypes = {
  children: React.PropTypes.element
}
module.exports = Container
