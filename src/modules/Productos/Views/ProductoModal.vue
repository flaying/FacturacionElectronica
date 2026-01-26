<template>
  <div class="modal fade" id="productoModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">
            <i class="bi bi-person-plus-fill me-2"></i>
            Agregar producto
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="row g-3">
            <input type="hidden" v-model="form.id" />

            <div class="col-12">
              <label class="form-label">Código producto *</label>
              <input
                v-model="form.codigo"
                @input="validarCampo('codigo', form.codigo)"
                :class="[
                  'form-control',
                  errores.codigo ? 'is-invalid' : form.codigo ? 'is-valid' : '',
                ]"
                placeholder="Código"
              />
              <div class="invalid-feedback">{{ errores.codigo }}</div>
            </div>

            <div class="col-12">
              <label class="form-label">Descripción producto *</label>
              <input
                v-model="form.descripcion"
                @input="validarCampo('descripcion', form.descripcion)"
                :class="[
                  'form-control',
                  errores.descripcion ? 'is-invalid' : form.descripcion ? 'is-valid' : '',
                ]"
                placeholder="Descripción"
              />
              <div class="invalid-feedback">{{ errores.descripcion }}</div>
            </div>

            <div class="col-12">
              <label class="form-label">{{ precioLabel }}</label>
              <input
                v-model="form.precio"
                @input="validarCampo('precio', form.precio)"
                :class="[
                  'form-control',
                  errores.precio ? 'is-invalid' : form.precio ? 'is-valid' : '',
                ]"
                placeholder="Precio"
              />
              <div class="invalid-feedback">{{ errores.precio }}</div>
            </div>

            <div class="col-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="form.exento" />
                <label class="form-check-label"> Exento </label>
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
import { ref, onMounted, watch, computed } from "vue";

import { useProductoStore } from "@/stores/producto/producto";
import { toast } from "vue3-toastify";
import { Modal } from "bootstrap";
import { storeToRefs } from "pinia";

const productoStore = useProductoStore();

const { productoEditar } = storeToRefs(productoStore);

// Formulario reactivo
const form = ref({
  id: -1,
  codigo: "",
  descripcion: "",
  precio: "",
  exento: false,
});

onMounted(async () => {
  const modalEl = document.getElementById("productoModal");

  modalEl.addEventListener("hidden.bs.modal", () => {
    resetForm();
    productoStore.limpiarProductoEditar();
  });
});

const precioLabel = computed(() => {
  const iva = localStorage.getItem("IVA");

  return iva === "1" ? "Precio sin IVA($)" : "Precio con IVA($)";
});

const guardar = async () => {
  if (!form.value.codigo) {
    toast.warning("Ingrese el código producto");
    return;
  }
  if (!form.value.descripcion) {
    toast.warning("Ingrese la descripción");
    return;
  }

  if (!form.value.precio) {
    toast.warning("Ingrese precio");
    return;
  }

  if (!esNumericoDecimal(form.value.precio)) {
    toast.warning("El precio solo debe contener números");
    return;
  }

  const result = await productoStore.GuardarProducto(form.value);

  console.log(result);
  if (result.ok) {
    toast.success(result.mensaje);

    const modalEl = document.getElementById("productoModal");
    const modal = Modal.getInstance(modalEl);
    modal.hide();

    // Limpiar formulario
    resetForm();
  } else {
    toast.error(result.message || "Error al guardar información del producto");
  }
};

watch(productoEditar, async (producto) => {
  if (!producto) return;

  form.value.id = producto.id;
  form.value.codigo = producto.codigo;
  form.value.descripcion = producto.descripcion;
  form.value.precio = producto.precio;
  form.value.exento = producto.exento == 1;
});

const resetForm = () => {
  form.value = {
    id: -1,
    codigo: "",
    descripcion: "",
    precio: "",
    exento: false,
  };

  Object.keys(errores.value).forEach((key) => (errores.value[key] = ""));
};

const errores = ref({
  codigo: "",
  descripcion: "",
  preccio: "",
  exento: "",
});

const esNumericoDecimal = (valor) => {
  return /^\d+(\.\d{1,2})?$/.test(valor);
};

const validarCampo = (campo, valor) => {
  switch (campo) {
    case "codigo":
      errores.value.codigo = valor ? "" : "Ingrese código";
      break;
    case "precio":
      if (!valor) {
        errores.value.precio = "Ingrese precio";
      } else if (!/^\d+(\.\d{1,2})?$/.test(valor)) {
        errores.value.precio = "Ingrese un precio válido (ej: 10.50)";
      } else {
        errores.value.precio = "";
      }
      break;
    case "descripcion":
      errores.value.descripcion = valor ? "" : "Ingrese número de documento";
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
