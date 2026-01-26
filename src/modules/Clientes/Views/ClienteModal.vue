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
            <input type="hidden" v-model="form.id" />
            <div class="col-md-6">
              <label class="form-label">Nombre negocio *</label>
              <input
                v-model="form.nombre"
                @input="validarCampo('nombre', form.nombre)"
                :class="[
                  'form-control',
                  errores.nombre ? 'is-invalid' : form.nombre ? 'is-valid' : '',
                ]"
                placeholder="Nombre"
              />
              <div class="invalid-feedback">{{ errores.nombre }}</div>
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
              <input
                v-model="form.nrc"
                @input="
                  validarCampo('nrc', form.nrc);
                  form.nrc = form.nrc.replace(/\D/g, '');
                "
                :class="['form-control', errores.nrc ? 'is-invalid' : form.nrc ? 'is-valid' : '']"
                placeholder="NRC"
              />
              <div class="invalid-feedback">{{ errores.nrc }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Teléfono</label>
              <input
                v-model="form.telefono"
                @input="
                  validarCampo('telefono', form.telefono);
                  form.telefono = form.telefono.replace(/\D/g, '');
                "
                :class="[
                  'form-control',
                  errores.telefono ? 'is-invalid' : form.telefono ? 'is-valid' : '',
                ]"
                placeholder="Teléfono"
              />
              <div class="invalid-feedback">{{ errores.telefono }}</div>
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
              <input
                v-model="form.email"
                @input="validarCampo('email', form.email)"
                :class="[
                  'form-control',
                  errores.email ? 'is-invalid' : form.email ? 'is-valid' : '',
                ]"
                placeholder="Email"
              />
              <div class="invalid-feedback">{{ errores.email }}</div>
            </div>

            <div class="col-md-12">
              <label class="form-label">Dirección</label>
              <textarea
                v-model="form.direccion"
                class="form-control"
                placeholder="Dirección"
              ></textarea>
            </div>

            <div class="col-md-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="form.retencion" />
                <label class="form-check-label"> Gran contribuyente </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button class="btn btn-primary" @click="guardar">
            <i class="bi bi-save me-1"></i>
            {{ form.id === -1 ? "Guardar" : "Modificar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { useGenericStore } from "@/stores//Generic/Generic";
import { useClientesStore } from "@/stores/cliente/cliente";
import { toast } from "vue3-toastify";
import { Modal } from "bootstrap";
import { storeToRefs } from "pinia";
const genericStore = useGenericStore();
const clientesStore = useClientesStore();
const departamentos = ref([]);
const municipios = ref([]);
const giros = ref([]);

const { clienteEditar } = storeToRefs(clientesStore);

// Formulario reactivo
const form = ref({
  id: -1,
  nombre: "",
  departamento: null,
  municipio: null,
  nrc: "",
  telefono: "",
  giro: null,
  documento: "",
  email: "",
  direccion: "",
  retencion: false,
});

onMounted(async () => {
  departamentos.value = await genericStore.getDepartamentos();
  giros.value = await genericStore.getgiros();

  const modalEl = document.getElementById("clienteModal");

  modalEl.addEventListener("hidden.bs.modal", () => {
    resetForm();
    clientesStore.limpiarClienteEditar();
  });
});

watch(
  () => form.value.departamento,
  async (newDep) => {
    form.value.municipio = null;
    if (newDep) {
      municipios.value = await genericStore.getMunicipios(newDep.id_departament);
    } else {
      municipios.value = [];
    }
  },
);

const guardar = async () => {
  if (!form.value.nombre) {
    toast.warning("Ingrese nombre o nombre institución");
    return;
  }

  if (!form.value.departamento) {
    toast.warning("Seleccione departamento");
    return;
  }

  if (!form.value.municipio) {
    toast.warning("Seleccione municipio");
    return;
  }
  if (!form.value.nrc) {
    toast.warning("Seleccione nrc");
    return;
  }

  if (!esNumerico(form.value.nrc)) {
    toast.warning("El NRC solo debe contener números");
    return;
  }

  if (!form.value.telefono) {
    toast.warning("Ingrese teléfono");
    return;
  }

  if (!esNumerico(form.value.telefono)) {
    toast.warning("El teléfono solo debe contener números");
    return;
  }

  if (!form.value.giro) {
    toast.warning("Seleccione giro");
    return;
  }

  if (!form.value.documento) {
    toast.warning("Ingrese número de documento o NIT");
    return;
  }

  if (!form.value.email) {
    toast.warning("Ingrese correo eléctronico");
    return;
  }

  if (!esEmailValido(form.value.email)) {
    toast.warning("Ingrese un correo electrónico válido");
    return;
  }
  if (!form.value.direccion) {
    toast.warning("Ingrese la dirección");
    return;
  }

  const result = await clientesStore.GuardarCliente(form.value);

  console.log(result);
  if (result.ok) {
    toast.success(result.mensaje);

    const modalEl = document.getElementById("clienteModal");
    const modal = Modal.getInstance(modalEl);
    modal.hide();

    // Limpiar formulario
    resetForm();
  } else {
    toast.error(result.message || "Error al guardar información del cliente");
  }
};

watch(clienteEditar, async (cliente) => {
  if (!cliente) return;

  const idDepto = String(cliente.idDepto).padStart(2, "0");
  const idMuni = String(cliente.idMuni).padStart(2, "0");

  form.value.id = cliente.id;
  form.value.nombre = cliente.nombre;
  form.value.nrc = cliente.nrc;
  form.value.telefono = cliente.telefono;
  form.value.documento = cliente.numDocumento;
  form.value.email = cliente.correoElectronico;
  form.value.direccion = cliente.direccion;
  form.value.retencion = cliente.retencion == 1;

  // Selecciones
  form.value.departamento = departamentos.value.find((d) => d.id_departament == idDepto);

  municipios.value = await genericStore.getMunicipios(cliente.idDepto);

  form.value.municipio = municipios.value.find((m) => m.id_municipality == idMuni);

  form.value.giro = giros.value.find((g) => g.code_activity == cliente.idGiro);
});

const resetForm = () => {
  form.value = {
    id: -1,
    nombre: "",
    departamento: null,
    municipio: null,
    nrc: "",
    telefono: "",
    giro: null,
    documento: "",
    email: "",
    direccion: "",
    retencion: false,
  };
  municipios.value = [];
  Object.keys(errores.value).forEach((key) => (errores.value[key] = ""));
};

const errores = ref({
  nombre: "",
  departamento: "",
  municipio: "",
  telefono: "",
  nrc: "",
  giro: "",
  documento: "",
  email: "",
  direccion: "",
});

const esEmailValido = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const esNumerico = (valor) => {
  return /^\d+$/.test(valor);
};

const validarCampo = (campo, valor) => {
  switch (campo) {
    case "nombre":
      errores.value.nombre = valor ? "" : "Ingrese nombre";
      break;
    case "departamento":
      errores.value.departamento = valor ? "" : "Seleccione departamento";
      break;
    case "municipio":
      errores.value.municipio = valor ? "" : "Seleccione municipio";
      break;
    case "telefono":
      if (!valor) errores.value.telefono = "Ingrese teléfono";
      else if (!/^\d+$/.test(valor)) errores.value.telefono = "Solo números";
      else errores.value.telefono = "";
      break;
    case "nrc":
      if (!valor) errores.value.nrc = "Ingrese NRC";
      else if (!/^\d+$/.test(valor)) errores.value.nrc = "Solo números";
      else errores.value.nrc = "";
      break;
    case "giro":
      errores.value.giro = valor ? "" : "Seleccione giro";
      break;
    case "documento":
      errores.value.documento = valor ? "" : "Ingrese número de documento";
      break;
    case "email":
      if (!valor) errores.value.email = "Ingrese correo electrónico";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) errores.value.email = "Correo no válido";
      else errores.value.email = "";
      break;
    case "direccion":
      errores.value.direccion = valor ? "" : "Ingrese dirección";
      break;
  }
};
</script>

<style scoped>
.modal-header {
  border-bottom: none;
}
.modal-footer {
  border-top: none;
}
.is-valid {
  border-color: #28a745;
  background-image: url("data:image/svg+xml,..."); /* opcional icono */
}

.is-invalid {
  border-color: #dc3545;
  background-image: url("data:image/svg+xml,..."); /* opcional icono */
}
</style>
