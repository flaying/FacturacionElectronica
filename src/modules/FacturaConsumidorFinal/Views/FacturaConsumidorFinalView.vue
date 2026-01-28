<template>
  <div class="my-2">
    <h3 class="fw-bold mb-4 text-primary">
      <i class="bi bi-receipt"></i> Factura consumidor final
    </h3>

    <div class="row g-4">
      <!-- ================= DATOS CLIENTE ================= -->
      <div class="col-lg-5">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-primary text-white">
            Datos del Cliente
          </div>

          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Fecha</label>
              <input type="date" v-model="form.txtFecha" class="form-control" />
            </div>

            <div class="mb-3">
              <label class="form-label">Cliente *</label>
              <multiselect
                :options="clientes"
                label="nombre"
                v-model="form.NombreCliente"
                track-by="id"
                placeholder="Seleccione cliente"
              />

            </div>

            <div class="mb-3">

               <label class="form-label">Documento *</label>
              <input
                v-model="form.txtNumdocumento"
                @input="validarCampo('Documento', form.txtNumdocumento)"
                :class="[
                  'form-control',
                  errores.txtNumdocumento ? 'is-invalid' : form.txtNumdocumento ? 'is-valid' : '',
                ]"
                placeholder="Número de documento"
              />
              <div class="invalid-feedback">{{ errores.txtNumdocumento }}</div>

            </div>

            <div class="mb-3">
              <label class="form-label">Teléfono</label>
              <input class="form-control"
              placeholder="0000-0000"
              v-model="form.Telefono_principal"/>
            </div>

            <div class="mb-3">
              <label class="form-label">Correo</label>
              <input type="email" class="form-control"
              placeholder="correo@email.com"
              v-model="form.Correo_electronico" />
            </div>

            <div class="mb-3">
               <label class="form-label">Pais *</label>
              <multiselect
                :options="paises"
                label="Nombre_Pais"
                v-model="form.Pais"
                track-by="Cod_Pais"
                placeholder="Seleccione pais"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- ================= PRODUCTOS ================= -->
      <div class="col-lg-7">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-primary text-white">
            Agregar Producto
          </div>

          <div class="card-body">
            <div class="row g-3">

              <!-- SELECT PRODUCTO (OPCIONAL) -->
              <div class="col-md-12" v-if="config.producto">
                <select class="form-select">
                  <option value="">Seleccione producto</option>
                </select>
              </div>

              <div class="col-md-4">
                <input v-model="producto.codigo" class="form-control" placeholder="Código" />
              </div>

              <div class="col-md-8">
                <input v-model="producto.descripcion" class="form-control" placeholder="Descripción" />
              </div>

              <div class="col-md-3">
                <input type="number" v-model.number="producto.cantidad" class="form-control" min="1" />
              </div>

              <div class="col-md-4">
                <input
                  type="number"
                  v-model.number="producto.monto"
                  class="form-control"
                  :placeholder="config.IVA ? 'Monto sin IVA $' : 'Monto $'"
                />
              </div>

              <!-- IVA -->
              <div class="col-md-3" v-if="config.IVA">
                <input
                  class="form-control bg-light"
                  :value="'IVA $ ' + ivaCalculado"
                  readonly
                />
              </div>

              <div class="col-md-2 d-flex align-items-center">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="producto.exento" />
                  <label class="form-check-label">Exento</label>
                </div>
              </div>

              <!-- TURISMO -->
              <div class="col-md-12" v-if="config.turismo > 0">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="producto.turismo" />
                  <label class="form-check-label">
                    Impuesto Turismo
                  </label>
                </div>
              </div>

              <div class="col-md-12">
                <button class="btn btn-success w-100" @click="agregarProducto">
                  <i class="bi bi-plus-lg"></i> Agregar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= TABLA ================= -->
        <div class="card shadow-sm border-0 mt-4">
          <div class="card-body p-0">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Cant.</th>
                  <th>Monto</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in productos" :key="index">
                  <td>{{ item.codigo }}</td>
                  <td>{{ item.descripcion }}</td>
                  <td>{{ item.cantidad }}</td>
                  <td>${{ item.montoFinal.toFixed(2) }}</td>
                  <td class="fw-bold">${{ item.subtotal.toFixed(2) }}</td>
                  <td>
                    <button class="btn btn-sm btn-danger" @click="eliminar(index)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- ================= TOTALES ================= -->
            <div class="p-3 bg-light">
              <div class="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>${{ subtotal }}</span>
              </div>

              <div class="d-flex justify-content-between" v-if="config.turismo > 0">
                <span>Impuesto Turismo</span>
                <span>${{ totalTurismo }}</span>
              </div>

              <div class="d-flex justify-content-between" v-if="config.propina > 0">
                <span>Propina</span>
                <span>${{ totalPropina }}</span>
              </div>

              <hr />

              <h4 class="text-end">
                Total:
                <span class="text-success">
                  ${{ total }}
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTONES -->
    <div class="mt-4 text-end">
      <button class="btn btn-outline-secondary me-2">Cancelar</button>
      <button class="btn btn-primary btn-lg">
        <i class="bi bi-send"></i> Enviar Factura
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,onMounted ,watch} from 'vue'
import { useClientesStore } from "@/stores/cliente/cliente";
import { useGenericStore } from "@/stores//Generic/Generic";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

const clientesStore = useClientesStore();
const genericStore = useGenericStore();

const clientes = ref([]);
const paises = ref([]);
const productos = ref([]);
/* configuracion de valores para activar */
const config = {
  IVA: false,
  propina: 0,
  turismo: 0,
  producto: false
}

const form = ref({
txtFecha:new Date().toISOString().substr(0, 10),
  NombreCliente: null,
  txtNumdocumento: "",
  Telefono_principal: "",
  Correo_electronico: "",
  Pais:null
});



const producto = ref({
  codigo: '',
  descripcion: '',
  cantidad: 1,
  monto: 0,
  exento: false,
  turismo: false
})


const errores = ref({
   NombreCliente: null,
  txtNumdocumento: "",
  Telefono_principal: "",
  Correo_electronico: "",
  Pais:null
});



/* ================= CÁLCULOS ================= */
const ivaCalculado = computed(() =>
  config.IVA ? +(producto.value.monto * 0.13).toFixed(2) : 0
)

const agregarProducto = () => {
  const montoBase = producto.value.monto
  const montoFinal = montoBase + ivaCalculado.value

  const subtotal = +(montoFinal * producto.value.cantidad).toFixed(2)

  productos.value.push({
    ...producto.value,
    montoFinal,
    subtotal
  })

  producto.value = {
    codigo: '',
    descripcion: '',
    cantidad: 1,
    monto: 0,
    exento: false,
    turismo: false
  }
}

const eliminar = (index) => {
  productos.value.splice(index, 1)
}

const subtotal = computed(() =>
  productos.value.reduce((acc, p) => acc + p.subtotal, 0).toFixed(2)
)

const totalTurismo = computed(() =>
  config.turismo > 0
    ? +((subtotal.value / 1.13) * config.turismo).toFixed(2)
    : 0
)

const totalPropina = computed(() =>
  config.propina > 0
    ? +((subtotal.value / 1.13) * config.propina).toFixed(2)
    : 0
)

const total = computed(() =>
  (
    parseFloat(subtotal.value) +
    totalTurismo.value +
    totalPropina.value
  ).toFixed(2)
)


onMounted(async () => {
  clientes.value = await clientesStore.obtenerClientes();
  paises.value = await genericStore.getPaises();

});


watch(paises, (lista) => {
  if (!form.value.Pais && lista.length > 0) {
    const sv = lista.find(p => p.Cod_Pais === 'SV')
    if (sv) {
      form.value.Pais = sv
    }
  }
})

</script>

<style scoped>
.table td {
  vertical-align: middle;
}
</style>
