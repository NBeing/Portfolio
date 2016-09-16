const React = require('react')
const ReactDOM = require('react-dom')
const ReactRouter = require('react-router')
const { Router, Route, hashHistory, IndexRoute } = ReactRouter
const {Hegel} = require('./Hegel')
const Table = require('./Table')
const Container = require('./Container')
const { store } = require('./HegelStore')
const { Provider } = require('react-redux')

const App = React.createClass({
  render () {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path='/' component={Container}>
            <IndexRoute component={Table} />
            <Route path='/hegel/:id' component={Hegel} />
          </Route>
        </Router>
      </Provider>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
