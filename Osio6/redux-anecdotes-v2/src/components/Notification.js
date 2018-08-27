import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {

    render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
        <div>
            { this.props.notification === '' ?
            '' :
            <div style={style}>
                { this.props.notification}
            </div>}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(
    mapStateToProps
)(Notification)
