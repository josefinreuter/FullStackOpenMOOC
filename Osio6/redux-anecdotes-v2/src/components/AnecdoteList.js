import React from 'react'
import PropTypes from 'prop-types'
import {voteForAnecdote} from "../reducers/anecdoteReducer";
import {clearNotification, voteNotification} from "../reducers/notificationReducer";
import Filter from "./Filter";


class AnecdoteList extends React.Component {
    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    vote = (anecdote) => () => {
      const id = anecdote.id
      const content = anecdote.content
      this.context.store.dispatch(
            voteForAnecdote(id)
        )
      this.context.store.dispatch(
            voteNotification(content)
        )
      setTimeout(()=> {
          this.context.store.dispatch(
              clearNotification()
          )
      }, 5000)
    }

    filterAnecdotes() {
        const fullList = this.context.store.getState().anecdotes
        const filter = this.context.store.getState().filter
        const filteredList = []

        for (let i = 0; i < fullList.length; i++) {
            if (fullList[i].content.toLowerCase().includes(filter.toLowerCase())) {
                filteredList.push(fullList[i])
            }
        }
        
        if ('' !== filter) {
            return filteredList
        }

        return fullList
    }

  render() {
    const anecdotes = this.filterAnecdotes()
    return (
      <div>
        <h2>Anecdotes</h2>
          <Filter/>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={
               this.vote(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
    store: PropTypes.object
}

export default AnecdoteList
