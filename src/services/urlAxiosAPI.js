import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:7158',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const conexion = localStorage.getItem('conexionString')
  
  if (conexion && config.method === 'post') {
    // si config.data no existe, inicialízalo
    if (!config.data) config.data = {}
    // agrega Conexion
    config.data.Conexion = conexion
  }

  return config
})

export default api
