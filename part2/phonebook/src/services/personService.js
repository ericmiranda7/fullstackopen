import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => axios.get(baseURL).then(response => response.data)

const create = newPerson => axios.post(baseURL, newPerson)
.then(response => response.data)

const delPerson = id => axios.delete(`${baseURL}/${id}`)

const updatePerson = (id, person) => axios.put(`${baseURL}/${id}`, person).then(response => response.data)

const services = {getAll, create, delPerson, updatePerson}

export default services