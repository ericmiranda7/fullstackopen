import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURL).then(response => response.data)

const create = newPerson => axios.post(baseURL, newPerson).then(response => response.data)

const delPerson = id => axios.delete(`${baseURL}/${id}`)

const services = {getAll, create, delPerson}

export default services