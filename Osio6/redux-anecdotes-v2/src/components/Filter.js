import React from 'react'
import {filterChange} from "../reducers/filterReducer";
import PropTypes from "prop-types";


class Filter extends React.Component {

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }



    handleChange = (event) => {
        event.preventDefault()

       this.context.store.dispatch(
           filterChange(event.target.value)
       )
    }

    render() {
        const style = {
            marginBottom: 10
        }

        return (
            <div style={style}>
                filter <input onChange={this.handleChange}/>
            </div>
        )
    }
}

Filter.contextTypes = {
    store: PropTypes.object
}

export default Filter