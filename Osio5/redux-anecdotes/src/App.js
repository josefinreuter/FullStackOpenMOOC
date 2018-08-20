import React from 'react';


class App extends React.Component {
    vote = (type, id) => () => {
        this.props.store.dispatch({type: type, id: id})
    }

    add = (event) => {
        event.preventDefault()
        console.log(event)
        this.props.store.dispatch({type: 'NEW', content: event.target.anecdote.value})
        event.target.anecdote.value = ''
    }

    render() {
    const anecdotes = this.props.store.getState().sort(function(a1,a2) {return (a1.votes < a2.votes) ? 1 : ((a2.votes < a1.votes) ? -1 : 0)})
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote('VOTE', anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.add}>
          <input name="anecdote"/>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App