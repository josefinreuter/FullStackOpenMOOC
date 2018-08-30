import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import anecdoteService from './services/anecdotes'
import { connect } from 'react-redux'
import { initialize } from "./reducers/anecdoteReducer";

class App extends React.Component {

    componentDidMount = async () => {
        const anecdotes =  await anecdoteService.getAll()
        this.props.initialize(anecdotes)

    }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default connect(
    null,
    {initialize}
)(App)
