import axios from 'axios'

const server = axios.create({
  baseURL: 'https://secret-tundra-12625.herokuapp.com'
})

export default server
