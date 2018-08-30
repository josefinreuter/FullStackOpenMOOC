import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'
const getId = () => (100000*Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const addAnecdote = async (content) => {
    const response = await axios.post(url, {content, id: getId(), votes: 0})
    return response.data
}

const anecdoteVote = async (anecdote) => {
    const response = await axios.put(`${url}/${anecdote.id}`, {...anecdote, votes: anecdote.votes +1})
    return response.data
}
export default {getAll, addAnecdote, anecdoteVote}