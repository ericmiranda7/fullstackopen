import axios from 'axios'
import { useEffect, useState } from 'react'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    getAll()
      .then(data => setResources(data))
  },
  [])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response.data))
    return response.data
  }

  const service = {
    getAll,
    create
  }

  return [
    resources, service
  ]
}

export default useResource