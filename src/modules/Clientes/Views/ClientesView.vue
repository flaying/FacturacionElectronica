<template>
  <div class="card shadow-sm">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">Lista Clientes</h5>
      <button class="btn btn-primary"  @click="abrirModal">
        <i class="bi bi-plus-lg"></i> Agregar
      </button>
    </div>
    <div class="card-body">
      <!-- DataTable se encarga de todo -->
      <DataTable :options="options" class="table table-striped table-bordered align-middle"  responsiveLayout="stack"  breakpoint="960px"/>
    </div>
  </div>
  <ClienteModal />
</template>

<script setup>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import { useClientesStore } from '@/stores/cliente/cliente'
import 'bootstrap-icons/font/bootstrap-icons.css'
import DataTablesResponsive from 'datatables.net-responsive-bs5'

// Import CSS
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css'

import ClienteModal from '@/modules/Clientes/Views/ClienteModal.vue'
import { Modal } from 'bootstrap'

DataTable.use(DataTablesCore)
DataTable.use(DataTablesResponsive)

// Iinstancia para abrir modal
const abrirModal = () => {
  const modal = new Modal(document.getElementById('clienteModal'), {
    backdrop: 'static',  
    keyboard: false     
  })
  modal.show();


}


// Instanciamos el store
const clientesStore = useClientesStore()

// Configuración de DataTable
const options = {
  serverSide: true,
  processing: true,
  responsive: true,

  // Petición ajax server-side
  ajax: async (data, callback) => {
    try {
   
      const result = await clientesStore.getClientes(data)
   
      callback(result)
    } catch (error) {
      console.error('Error DataTable:', error)
      callback({
        draw: data.draw || 0,
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      })
    }
  },

  // Columnas que se mostrarán
  columns: [
    { data: 'id', title: 'Código cliente' },
    { data: 'nombre', title: 'Nombre' },
    { data: 'numDocumento', title: 'Número documento' },
    { data: 'nrc', title: 'NRC' },

    {
      data: 'departamento',
      title: 'Departamento',
      createdCell: (td, cellData, rowData) => td.setAttribute('data-id-depto', rowData.idDepto)
    },

    {
      data: 'municipio',
      title: 'Municipio',
      createdCell: (td, cellData, rowData) => td.setAttribute('data-id-muni', rowData.idMuni)
    },

    { data: 'telefono', title: 'Teléfono' },
    { data: 'correoElectronico', title: 'Correo Electrónico' },

    {
      data: 'giro',
      title: 'Giro',
      createdCell: (td, cellData, rowData) => td.setAttribute('data-id-giro', rowData.idGiro)
    },

    { data: 'direccion', title: 'Dirección' },

    {
      data: 'retencion',
      title: 'Retención',
      render: (data) => (data == 1 ? 'Sí' : 'No')
    },

    {
      data: null,
      title: 'Acciones',
      orderable: false,
      searchable: false,
      render: () => `
        <div class="d-flex gap-2">
          <button class="btn btn-outline-primary btn-sm edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-outline-danger btn-sm delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `
    }
  ],
   "language": {

       "sProcessing": "Procesando...",
       "sLengthMenu": "Mostrar _MENU_ registros",
       "sZeroRecords": "No se encontraron resultados",
       "sEmptyTable": "Ningún dato disponible en esta tabla",
       "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
       "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
       "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
       "sInfoPostFix": "",
       "sSearch": "Buscar:",
       "sUrl": "",
       "sInfoThousands": ",",
       "sLoadingRecords": "Cargando...",
       "oPaginate": {
           "sFirst": "Primero",
           "sLast": "Último",
           "sNext": "Siguiente",
           "sPrevious": "Anterior"
       },
       "oAria": {
           "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
           "sSortDescending": ": Activar para ordenar la columna de manera descendente"
       }

   },
  
}


</script>

<style scoped>
/* Ajustes opcionales para que los botones queden alineados */
.edit-btn, .delete-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
</style>
