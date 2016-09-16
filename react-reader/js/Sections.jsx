const React = require('react')
const { Link } = require('react-router')

const Sections = (props) => {
  if (props.sections && props.sections.length > 0) {
    return (
        <ul> {Object.keys(props.sections).map((sec, index) => (
            <li key={index}>
                <Link className='toc-link'
                  to={(`/hegel/${props.sections[sec]}`)}>{props.sections[sec]}
                </Link>
            </li>
          ))}
        </ul>
      )
  } else {
    return (<div />)
  }
}

Sections.propTypes = {
  sections: React.PropTypes.array
}

module.exports = Sections

