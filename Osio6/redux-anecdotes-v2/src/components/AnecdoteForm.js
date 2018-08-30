import React from 'react'
import { connect } from 'react-redux'
import {anecdoteCreation} from "../reducers/anecdoteReducer";
import {notify} from "../reducers/notificationReducer";


class AnecdoteForm extends React.Component {

  handleSubmit = async (e) => {
      e.preventDefault()
      const anecdoteContent = e.target.addedAnecdote.value
      e.target.addedAnecdote.value = ''
      this.props.anecdoteCreation(anecdoteContent)
      this.props.notify(`You added: '${anecdoteContent}'`, 5)

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
    { anecdoteCreation, notify }
)(AnecdoteForm)
