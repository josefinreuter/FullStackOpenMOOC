import axios from 'axios'

const baseUrl = 'api/blogs'

let token = null

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addBlog = async (newBlog) => {
    const config = {
        headers: {'Authorization': token}
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data

}

const updateBlog = async (id, updatedBlog) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
    return response.data
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}


export default {getAll, addBlog, setToken, updateBlog}