import axios from 'axios'
/*
const server = 'https://my-json-server.typicode.com/PauPuigsubira/jsonserverdemo'
const service = 'notes'
*/

/*
const exampleNotes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
]
*/

//const server = 'http://localhost:3001'
//const service = 'api/notes'
const baseUrl = '/api/notes'

const get = () => {
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to the server',
    important: true,
  }

  return axios
    .get(`${baseUrl}`)
    .then((response) => response.data.concat(nonExisting))
}

export default { get }