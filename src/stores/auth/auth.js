import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {

  const isAuthenticated = ref(false)
  const user = ref(null)
  const codigoEmpresa = '1'

     

  const login = async (userName, passWord) => {
  try {
    const response = await axios.post(
      'https://localhost:7158/api/Login/Login',
      {
        user: userName,
        passWord: passWord,
        codigoEmpresa
      }
    )

    const data = response.data


    if ( data.length==0) {
      return {
        ok: false,
        message: 'Usuario no encontrado'
      }
    }


     
    localStorage.setItem('id', data[0].id)
    localStorage.setItem('user_name', data[0].user_name)
    localStorage.setItem('full_name', data[0].full_name)
    localStorage.setItem('id_rol', data[0].id_rol)


  
    return {
      ok: true,
      data
    }

  } catch (error) {

    if (error.response) {
      const status = error.response.status

      switch (status) {
        case 400:
          return { ok: false, status, message: 'Datos inválidos' }
        case 401:
          return { ok: false, status, message: 'Credenciales incorrectas' }
        case 404:
          return { ok: false, status, message: 'Servicio no encontrado' }
        case 500:
          return { ok: false, status, message: 'Error interno del servidor' }
        default:
          return { ok: false, status, message: 'Error inesperado' }
      }
    }

    return {
      ok: false,
      status: null,
      message: 'No se pudo conectar con el servidor'
    }
  }
}


  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    localStorage.clear()
  }

  return {
    isAuthenticated,
    user,
    login,
    logout
     
  }
})
