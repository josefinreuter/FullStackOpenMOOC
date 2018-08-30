import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
    console.log('ACTION: ', action.type)
    switch (action.type) {
        case 'INIT':
          return action.data
        case 'VOTE':
            const old = store.filter(a => a.id !==action.anecdote.id)
            return [...old, action.anecdote]
        case 'CREATE':
          return [...store, action.anecdote]
        default:
            return store
  }

         
}

export const initialize  = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT',
            data: anecdotes
        })
    }
}

export const anecdoteCreation = (anecdoteContent) => {
  return async (dispatch) => {
      const newAnecdote =  await anecdoteService.addAnecdote(anecdoteContent)
      dispatch({
          type: 'CREATE',
          anecdote: newAnecdote
      })
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
      const updated = await anecdoteService.anecdoteVote(anecdote)
      dispatch({
          type: 'VOTE',
          anecdote: updated
      })
  }

}

export default anecdoteReducer