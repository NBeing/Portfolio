const React = require('react')
const Sections = require('./Sections')

const Subchapter = (props) => {
  let sections
  let children

  if (props.chapter.subsections && props.chapter.subsections.length > 0) {
    sections = (<Sections sections={props.chapter.subsections} />)
  }
  if (props.children) {
    children = React.Children.map(props.children, child => (child))
  }
  return (
      <div className="sub-chapter">
        <h1>{props.chapter.title}</h1>
        {sections}
        {children}
        </div>
    )
}

Subchapter.propTypes = {
  chapter: React.PropTypes.object,
  children: React.PropTypes.arrayOf(React.PropTypes.element)
}

module.exports = Subchapter
