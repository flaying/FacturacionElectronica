import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/urlAxiosAPI'

export const useGenericStore = defineStore('generic', () => {
  const departamentos = ref([]);
  const municipios = ref([]);
   const giros = ref([])
const paises = ref([]);

  const loading = ref(false);

  const getDepartamentos = async () => {
    loading.value = true
    try {
      const response = await api.post('/api/Generic/ListarDepartamento')

  //Siempre revisar como viene el json para poder obtener los datos correctamente
       departamentos.value = (response.data || []).map(dep => ({
        id_departament: dep.id_departament,
        name: dep.name
      }))

      loading.value = false
      return departamentos.value
    } catch (error) {
      console.error('Error al obtener departamentos:', error.response?.data || error.message)
      loading.value = false
      return []
    }
  }

 const getMunicipios = async (codDepto) => {
    loading.value = true
    try {
      const response = await api.post('/api/Generic/ListarMunicipios',{codDepto: codDepto})

  //Siempre revisar como viene el json para poder obtener los datos correctamente

       municipios.value = (response.data || []).map(muni => ({
        id_municipality: muni.id_municipality,
        name_municipality: muni.name_municipality
      }))



      loading.value = false
      return municipios.value
    } catch (error) {
      console.error('Error al obtener municipios:', error.response?.data || error.message)
      loading.value = false
      return []
    }
  }

 const getgiros = async () => {
    loading.value = true
    try {
      const response = await api.post('/api/Generic/ListarGiro')

  //Siempre revisar como viene el json para poder obtener los datos correctamente
       giros.value = (response.data || []).map(giro => ({
        code_activity: giro.code_activity,
        name_activity: giro.name_activity
      }))


      loading.value = false
      return giros.value
    } catch (error) {
      console.error('Error al obtener los giros:', error.response?.data || error.message)
      loading.value = false
      return []
    }
  }


 const getPaises = async () => {
    loading.value = true
    try {
      const response = await api.post('/api/Generic/ListarPaises')

  //Siempre revisar como viene el json para poder obtener los datos correctamente
       paises.value = (response.data || []).map(pais => ({
        Cod_Pais: pais.Cod_Pais,
        Nombre_Pais: pais.Nombre_Pais
      }))


      loading.value = false
      return paises.value
    } catch (error) {
      console.error('Error al obtener los paises:', error.response?.data || error.message)
      loading.value = false
      return []
    }
  }

  return {
    departamentos,
    municipios,
    giros,
    loading,
    paises,
    getDepartamentos,
    getMunicipios,
    getgiros,
    getPaises
  }
})
