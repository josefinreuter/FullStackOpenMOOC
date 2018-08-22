import React from 'react'
import PropTypes from 'prop-types'
import {anecdoteCreation} from "../reducers/anecdoteReducer";
import {addNotification, clearNotification} from "../reducers/notificationReducer";


class AnecdoteForm extends React.Component {
    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }


  handleSubmit = (e) => {
    e.preventDefault()
    this.context.store.dispatch(
        anecdoteCreation(e.target.addedAnecdote.value)
    )
    this.context.store.dispatch(
          addNotification(e.target.addedAnecdote.value)
    )

    e.target.addedAnecdote.value = ''
    setTimeout(()=> {
          this.context.store.dispatch(
              clearNotification()
          )
    }, 5000)
  }

   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='addedAnecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

AnecdoteForm.contextTypes = {
    store: PropTypes.object
}

export default AnecdoteForm
