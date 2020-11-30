import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURL).then(response => response.data)

const create = newPerson => axios.post(baseURL, newPerson).then(response => response.data)

const services = {getAll, create}

export default services