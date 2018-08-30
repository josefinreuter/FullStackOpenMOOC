import React from 'react'
import { connect } from 'react-redux'
import {anecdoteCreation} from "../reducers/anecdoteReducer";
import {addNotification, clearNotification} from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'


class AnecdoteForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault()
      const anecdoteContent = e.target.addedAnecdote.value
      e.target.addedAnecdote.value = ''
      const newAnecdote = await anecdoteService.addAnecdote(anecdoteContent)
      this.props.anecdoteCreation(newAnecdote)
      this.props.addNotification(anecdoteContent)

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
