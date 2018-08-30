import React from 'react'
import { connect } from 'react-redux'
import {voteForAnecdote} from "../reducers/anecdoteReducer";
import {notify} from "../reducers/notificationReducer";

import Filter from "./Filter";


class AnecdoteList extends React.Component {

      vote = (anecdote) => async () => {
      const anecdoteContent = anecdote.content
      this.props.voteForAnecdote(anecdote)
      this.props.notify(`You voted for: '${anecdoteContent}'`, 5)
    }


  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
          <Filter/>
        {this.props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} votes {' '}
              <button onClick={
               this.vote(anecdote)
              }>
                vote
              </button>
            </div>
              <br/>
          </div>
        )}
      </div>
    )
  }
}

const filterAnecdotes = (anecdotes, filter) => {
    if (filter === '') {
        return  anecdotes
    }
    const filteredList = anecdotes.filter(anecdote => anecdote.content.includes(filter))
    return filteredList
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: filterAnecdotes(state.anecdotes, state.filter)
    }
}

export default connect(
    mapStateToProps,
    { voteForAnecdote, notify}
) (AnecdoteList)
