import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/urlAxiosAPI'

export const useClientesStore = defineStore('clientes', () => {

  const clientes = ref([])       // para guardar los datos
  const totalRecords = ref(0)    // total de registros (DataTable)
  const loading = ref(false)

  /**
   * Función para obtener clientes desde el backend
   * @param {object} dataTableParams - parámetros que manda DataTable
   */
  const getClientes = async (dataTableParams) => {
    loading.value = true

    // Construir payload según lo que espera el backend
    const payload = {
      draw: dataTableParams.draw,
      start: dataTableParams.start,
      length: dataTableParams.length,
      searchValue: dataTableParams.search?.value || '',
      conexion: localStorage.getItem('conexionString') // asegurarse de que exista
    }
    console.log(payload);
    try {
      const response = await api.post('/api/Clientes/ListaClientes', payload)

      // Backend debe devolver algo como { draw, recordsTotal, recordsFiltered, data }
      clientes.value = response.data.data || []
      totalRecords.value = response.data.recordsTotal || 0

      loading.value = false

      return response.data

    } catch (error) {
      console.error('Error al obtener clientes:', error.response?.data || error.message)
      loading.value = false
      return {
        draw: payload.Draw,
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      }
    }
  }

  return {
    clientes,
    totalRecords,
    loading,
    getClientes
  }
})
