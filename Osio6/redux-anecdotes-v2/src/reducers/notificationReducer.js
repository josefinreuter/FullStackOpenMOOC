const initialNotification = ''


const notificationReducer = (state = initialNotification, action) => {
    console.log(action)
    switch (action.type) {
        case 'VOTE_NOTIF':
            return 'You voted for: ' + action.anecdote
        case 'ADD_NOTIF':
            return 'You added: ' + action.anecdote
        case 'CLEAR':
            return action.anecdote
        default:
            return state
    }

}

export const voteNotification = (anecdote) => {
    return {
        type: 'VOTE_NOTIF',
        anecdote
    }
}

export const addNotification = (anecdote) => {
    return {
        type: 'ADD_NOTIF',
        anecdote
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR',
        anecdote: ''
    }
}

export default notificationReducer