
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

export const initialize = (data) => {
  return{
    type: 'INIT',
      data
  }
}

export const anecdoteCreation = (anecdote) => {

  return {
      type: 'CREATE',
      anecdote
  }
}

export const voteForAnecdote = (anecdote) => {
  return {
      type: 'VOTE',
      anecdote
  }

}

export default anecdoteReducer