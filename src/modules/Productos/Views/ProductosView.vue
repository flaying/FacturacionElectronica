<template>
  <div class="card shadow-sm">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">Lista Productos</h5>
      <button class="btn btn-primary"  @click="abrirModal">
        <i class="bi bi-plus-lg"></i> Agregar
      </button>
    </div>
    <div class="card-body">
      <!-- DataTable se encarga de todo -->
      <DataTable  ref="dtRef" :options="options" class="table table-striped table-bordered align-middle"  responsiveLayout="stack"  breakpoint="960px"/>
    </div>
  </div>
  <ProductoModal />
</template>

<script setup>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import { useProductoStore } from '@/stores/producto/producto'
import 'bootstrap-icons/font/bootstrap-icons.css'
import DataTablesResponsive from 'datatables.net-responsive-bs5'

// Import CSS
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css'

import ProductoModal from './ProductoModal.vue';
import { Modal } from 'bootstrap'
import { ref, onMounted } from "vue";
//import { toast } from "vue3-toastify";
import Swal from 'sweetalert2'
const dtRef = ref(null);
DataTable.use(DataTablesCore)
DataTable.use(DataTablesResponsive)

onMounted(() => {
  productoStore.setTableInstance(dtRef.value.dt);
});

// Iinstancia para abrir modal
const abrirModal = () => {
  const modal = new Modal(document.getElementById('productoModal'), {
    backdrop: 'static',  
    keyboard: false     
  })
  modal.show();

}


// Instanciamos el store
const productoStore = useProductoStore()

// Configuración de DataTable
const options = {
  serverSide: true,
  processing: true,
  responsive: true,

  // Petición ajax server-side
  ajax: async (data, callback) => {
    try {
   
      const result = await productoStore.getProductos(data)
   
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
    { data: 'id', title: 'Código' },
    { data: 'codigo', title: 'Código producto' },
    { data: 'descripcion', title: 'Descripción producto' },
    { data: 'precio', title: 'Precio' },
    {
      data: 'exento',
      title: 'Exento',
      render: (data) => (data == 1 ? 'Sí' : 'No')
    },
  { data: 'fecha_creacion', title: 'Fecha creación' },
    { data: 'fechaModifico', title: 'Fecha modificación' },
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
  createdRow: (row, data) => {
  row.querySelector('.edit-btn')?.addEventListener('click', () => {
    editarProducto(data)
  })
   
},
 
}



const editarProducto = (producto) => {
  productoStore.setProductoEditar(producto)

  const modal = new Modal(document.getElementById('productoModal'), {
    backdrop: 'static',
    keyboard: false
  })
  modal.show()
}
onMounted(() => {
  // Delegación de eventos para eliminar
  const table = document.querySelector('.dataTable')
  table.addEventListener('click', async (e) => {
    // Detecta click en botón eliminar
    const deleteBtn = e.target.closest('.delete-btn')
    if (deleteBtn) {
      const row = deleteBtn.closest('tr')
      if (!row) return

      const cells = row.querySelectorAll('td')
      const id = cells[0]?.innerText
      const nombre = cells[2]?.innerText
      if (!id || !nombre) return

      // Llama a SweetAlert2
      confirmarEliminar(id, nombre)
    }
  })
})

/* onMounted(() => {
  const table = document.querySelector('.dataTable') 
  table.addEventListener('click', async (e) => {
    if (e.target.closest('.delete-btn')) {
      const row = e.target.closest('tr')
      if (!row) return

      // Capturar ID y Nombre del cliente
      const cells = row.querySelectorAll('td')
      const id = cells[0]?.innerText  
      const nombre = cells[1]?.innerText 

      if (!id) return

  
      const confirmar = confirm(`¿Desea eliminar al cliente "${nombre}"?`)
      if (!confirmar) return

      // Llamar a la store
      const result = await clientesStore.eliminarCliente(id)

      if (result.ok) {
        toast.success(result.mensaje)
        // Recargar DataTable
        const dt = DataTable.DataTable(table) 
        dt.ajax.reload(null, false) 
      } else {
        toast.error(result.mensaje)
      }
    }
  })
}) */

const confirmarEliminar = async (id, descripcion) => {
  const result = await Swal.fire({
    title: `¿Eliminar el producto "${descripcion}"?`,
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',  // texto del botón de confirmar
    cancelButtonText: 'Cancelar',       // texto del botón de cancelar
    reverseButtons: true                // opcional: invierte los botones para estilo común en español
  })

  if (result.isConfirmed) {
    const res = await productoStore.eliminarProducto(id)
    if (res.ok) {
      Swal.fire('Eliminado!', `Producto "${descripcion}" eliminado correctamente`, 'success')
      const dt = DataTable.DataTable(document.querySelector('.dataTable'))
      dt.ajax.reload(null, false)
    } else {
      Swal.fire('Error', res.mensaje, 'error')
    }
  }
}

</script>




<style  scoped>
 
</style>