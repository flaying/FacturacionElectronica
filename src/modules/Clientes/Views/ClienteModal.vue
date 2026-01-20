<template>
  <div class="modal fade" id="clienteModal" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">

        <!-- Header -->
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">
            <i class="bi bi-person-plus-fill me-2"></i>
            Agregar cliente
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="row g-3">
           <input type="hidden" v-model="form.id">
            <div class="col-md-6">
              <label class="form-label">Nombre negocio *</label>
              <input v-model="form.nombre" class="form-control" placeholder="Nombre" />
            </div>

            <div class="col-md-6">
              <label class="form-label">Departamento *</label>
              <multiselect
                :options="departamentos"
                label="name"
                v-model="form.departamento"
                track-by="id_departament"
                placeholder="Seleccione departamento"
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">Municipio *</label>
              <multiselect
                :options="municipios"
                label="name_municipality"
                v-model="form.municipio"  
                  track-by="id_municipality"
                placeholder="Seleccione municipio"
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">NRC</label>
              <input v-model="form.nrc" class="form-control"  placeholder="NRC"/>
            </div>

            <div class="col-md-6">
              <label class="form-label">Teléfono</label>
              <input v-model="form.telefono" class="form-control" placeholder="Teléfono" />
            </div>

            <div class="col-md-6">
              <label class="form-label">Giro *</label>
              <multiselect
                :options="giros"
                label="name_activity"
                v-model="form.giro"
                 track-by="code_activity"
                placeholder="Seleccione giro"
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">NIT / DUI *</label>
              <input v-model="form.documento" class="form-control" placeholder="NIT/DUI" />
            </div>

            <div class="col-md-6">
              <label class="form-label">Correo electrónico</label>
              <input v-model="form.email" type="email" class="form-control"  placeholder="Email"/>
            </div>

            <div class="col-md-12">
              <label class="form-label">Dirección</label>
              <textarea v-model="form.direccion" class="form-control" placeholder="Dirección"></textarea>
            </div>

            <div class="col-md-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="form.retencion">
                <label class="form-check-label">
                  Gran contribuyente
                </label>
              </div>
            </div>

          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button class="btn btn-primary" @click="guardar">
            <i class="bi bi-save me-1"></i> Guardar
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted,watch   } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { useGenericStore } from '@/stores//Generic/Generic'
import { useClientesStore } from '@/stores/cliente/cliente'
import { toast } from 'vue3-toastify'
const genericStore = useGenericStore();
const clientesStore = useClientesStore()
const departamentos = ref([]);
const municipios = ref([]);
const giros = ref([]);
// Formulario reactivo
const form = ref({
  id:-1,
  nombre: '',
  departamento: null,
  municipio: null,
  nrc: '',
  telefono: '',
  giro: null,
  documento: '',
  email: '',
  direccion: '',
  retencion: false
})

onMounted(async () => { 
  departamentos.value = await genericStore.getDepartamentos();
   giros.value = await genericStore.getgiros();
})

 
watch(
  () => form.value.departamento,
  async (newDep) => {
    form.value.municipio = null  
    if (newDep) {
     municipios.value = await genericStore.getMunicipios(newDep.id_departament)
    } else {
      municipios.value = []; // limpiar municipios si no hay departamento
    }
  }
)


const guardar = async () => {
   
  if (!form.value.nombre ) {

    toast.warning('Ingrese nombre o nombre institución')
    return
  }

   if ( !form.value.departamento) {
    toast.warning('Seleccione departamento')
    return
  }

  if ( !form.value.municipio) {
    toast.warning('Seleccione municipio')
    return
  }
if ( !form.value.nrc) {
    toast.warning('Seleccione nrc')
    return
  }
  if (!form.value.telefono ) {
    toast.warning('Ingrese teléfono')
    return
  }
  if ( !form.value.giro) {
    toast.warning('Seleccione giro')
    return
  }

  if (!form.value.documento ) {
    toast.warning('Ingrese número de documento o NIT')
    return
  }

   if (!form.value.email) {
    toast.warning('Ingrese correo eléctronico')
    return
  }

    if (!form.value.direccion ) {
    toast.warning('Ingrese la dirección')
    return
  }

   const result = await clientesStore.GuardarCliente(form.value)
   if (result.ok) {
   toast.success('Cliente registrado correctamente')
 } else {
   toast.error(result.message || 'Error al guardar información del cliente')
 }


}
</script>

<style scoped>
.modal-header {
  border-bottom: none;
}
.modal-footer {
  border-top: none;
}
</style>
