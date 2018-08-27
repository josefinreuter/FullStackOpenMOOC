import React from 'react'
import { connect } from 'react-redux'
import {anecdoteCreation} from "../reducers/anecdoteReducer";
import {addNotification, clearNotification} from "../reducers/notificationReducer";


class AnecdoteForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.anecdoteCreation(e.target.addedAnecdote.value)

    this.props.addNotification(e.target.addedAnecdote.value)

    e.target.addedAnecdote.value = ''

      setTimeout(()=> {
          this.props.clearNotification()
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

export default connect(
    null,
    { anecdoteCreation,  addNotification, clearNotification }
)(AnecdoteForm)
