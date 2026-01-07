

<template>
  <div class="sidebar bg-white border-end">
    <!-- LOGO -->
    <div class="p-3 fw-bold fs-5 text-primary">
      <i class="bi bi-mortarboard-fill me-2"></i> FactElectronica
    </div>

    <ul class="nav flex-column px-2">

      <!-- Dashboard -->
      <li class="nav-item">
        <RouterLink
          to="/Dashboard"
          class="nav-link"
          :class="{ active: isActive('/') }"
        >
          <i class="bi bi-speedometer2 me-2"></i> Dashboard
        </RouterLink>
      </li>

      <!-- Mantenimientos -->
      <li class="nav-item">
        <a
          href="#"
          class="nav-link d-flex justify-content-between align-items-center"
          @click.prevent="openMantenimientos  = !openMantenimientos "
          :class="{ active: openMantenimientos  }"
        >
          <span>
            <i class="bi bi-ui-checks me-2"></i> Mantenimientos
          </span>
          <i class="bi bi-chevron-down transition" :class="{ rotate: openMantenimientos }"></i>
        </a>

        <!-- SUBMENÚ -->
        <ul v-show="openMantenimientos" class="nav flex-column ms-3">
            <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/Clientes') }"
                >
                  Man. Clientes
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                  to="/Productos"
                  class="nav-link"
                  :class="{ active: isActive('/Productos') }"
                >
                  Productos
                </RouterLink>
              </li>
                   
        </ul>
      </li>
      
      <!-- Tranacciones -->
      <li class="nav-item">
        <a
          href="#"
          class="nav-link d-flex justify-content-between align-items-center"
          @click.prevent="openTransacciones = !openTransacciones"
          :class="{ active: openTransacciones }"
        >
          <span>
            <i class="bi bi-ui-checks me-2"></i> Transacciones
          </span>
          <i class="bi bi-chevron-down transition" :class="{ rotate: openTransacciones }"></i>
        </a>

        <!-- SUBMENÚ -->
        <ul v-show="openTransacciones" class="nav flex-column ms-3">
            <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Transacciones exitosas
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Transacciones con error
                </RouterLink>
              </li>

                <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Transacciones anuladas
                </RouterLink>
              </li>

                <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Transacciones eliminadas
                </RouterLink>
              </li>

                <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Consulta de transacciones
                </RouterLink>
              </li>
                   
        </ul>
      </li>
    
    <!-- Elaboracion de documentos -->
      <li class="nav-item">
        <a
          href="#"
          class="nav-link d-flex justify-content-between align-items-center"
          @click.prevent="openDocumentos = !openDocumentos"
          :class="{ active: openDocumentos }"
        >
          <span>
            <i class="bi bi-ui-checks me-2"></i> Elaboración de documentos
          </span>
          <i class="bi bi-chevron-down transition" :class="{ rotate: openDocumentos }"></i>
        </a>

        <!-- SUBMENÚ -->
        <ul v-show="openDocumentos" class="nav flex-column ms-3">
            <li class="nav-item">
                <RouterLink
                  to="/ConsumidorFinal"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Fact. Cons. Final sin cliente
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                  to="/ConsumidorFinal2"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Fact. Cons. Final
                </RouterLink>
              </li>

                <li class="nav-item">
                <RouterLink
                  to="/CreditoFiscal"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Fact. Cred. Fiscal
                </RouterLink>
              </li>

                <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Fact. Exportación
                </RouterLink>
              </li>

                <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Sujeto excluido
                </RouterLink>
              </li>

               <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Retención
                </RouterLink>
              </li>

               <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Nota de Crédito
                </RouterLink>
              </li>
                   
        </ul>
      </li>

      <!-- Compras -->
      <li class="nav-item">
        <a
          href="#"
          class="nav-link d-flex justify-content-between align-items-center"
          @click.prevent="openCompras = !openCompras"
          :class="{ active: openCompras }"
        >
          <span>
            <i class="bi bi-ui-checks me-2"></i> Compras
          </span>
          <i class="bi bi-chevron-down transition" :class="{ rotate: openCompras }"></i>
        </a>

        <!-- SUBMENÚ -->
        <ul v-show="openCompras" class="nav flex-column ms-3">
            <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Importar compras
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Registrar compras
                </RouterLink>
              </li>

               <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Lista compras
                </RouterLink>
              </li>
                   
        </ul>
      </li>

      <!-- Reportes -->
      <li class="nav-item">
        <a
          href="#"
          class="nav-link d-flex justify-content-between align-items-center"
          @click.prevent="openReportes = !openReportes"
          :class="{ active: openReportes }"
        >
          <span>
            <i class="bi bi-ui-checks me-2"></i> Reportes
          </span>
          <i class="bi bi-chevron-down transition"
             :class="{ rotate: openReportes }"></i>
        </a>

        <!-- SUBMENÚ -->
        <ul v-show="openReportes" class="nav flex-column ms-3">
            <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Documentos  Hacienda
                </RouterLink>
              </li>

             
          <!-- Cards (PADRE) -->
          <li class="nav-item">
            <a
              href="#"
              class="nav-link d-flex justify-content-between align-items-center"
              @click.prevent="openReportesArchivos = !openReportesArchivos"
              :class="{ active: isCardActive }"
            >
              <span>
                <i class="bi bi-card-text me-2"></i> Archivos para hacienda
              </span>
              <i class="bi bi-chevron-down transition"
                 :class="{ rotate: openReportesArchivos }"></i>
            </a>

            <!-- HIJOS -->
            <ul v-show="openReportesArchivos" class="nav flex-column ms-3">
              <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Crédito fiscal
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                  to="/cards/advanced"
                  class="nav-link"
                  :class="{ active: isActive('/cards/advanced') }"
                >
                  Consumidor Final
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                  to="/cards/advanced"
                  class="nav-link"
                  :class="{ active: isActive('/cards/advanced') }"
                >
                  Retención IVA 1%
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                  to="/cards/advanced"
                  class="nav-link"
                  :class="{ active: isActive('/cards/advanced') }"
                >
                  Sujeto excluido
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                  to="/cards/advanced"
                  class="nav-link"
                  :class="{ active: isActive('/cards/advanced') }"
                >
                  Compras crédito fiscal
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                  to="/cards/advanced"
                  class="nav-link"
                  :class="{ active: isActive('/cards/advanced') }"
                >
                  Compras consumidor Final
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                  to="/cards/advanced"
                  class="nav-link"
                  :class="{ active: isActive('/cards/advanced') }"
                >
                  Resumen impuesta pagar
                </RouterLink>
              </li>
            </ul>

          </li>
        </ul>
      </li>


        <!-- INFORMES  -->
      <li class="nav-item">
        <a
          href="#"
          class="nav-link d-flex justify-content-between align-items-center"
          @click.prevent="openInformes = !openInformes"
          :class="{ active: openInformes }"
        >
          <span>
            <i class="bi bi-ui-checks me-2"></i> Informes
          </span>
          <i class="bi bi-chevron-down transition" :class="{ rotate: openInformes }"></i>
        </a>

        <!-- SUBMENÚ -->
        <ul v-show="openInformes" class="nav flex-column ms-3">
            <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Verificador ventas
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Cliente crédito
                </RouterLink>
              </li>

                <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Ventas general
                </RouterLink>
              </li>

                <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Ventas mensuales
                </RouterLink>
              </li>

                <li class="nav-item">
                <RouterLink
                  to="/Clientes"
                  class="nav-link"
                  :class="{ active: isActive('/cards/basic') }"
                >
                  Ventas diarias
                </RouterLink>
              </li>
                   
        </ul>
      </li>

    </ul>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// UN ref POR CADA MENÚ PADRE
const openMantenimientos = ref(false)
const openTransacciones = ref(false)
const openDocumentos = ref(false)
const openCompras = ref(false)
const openReportes = ref(false)
const openReportesArchivos = ref(false)
const openInformes = ref(false)

const isActive = (path) => route.path === path
</script>



<style scoped>
.sidebar {
  width: 260px;
  min-height: 100vh;
}

.nav-link {
  color: #333;
  border-radius: 6px;
}

.nav-link.active {
  background-color: #e7f1ff;
  color: #0d6efd;
  font-weight: 500;
}

.nav .nav .nav-link.active {
  background-color: #f2f7ff;
  color: #0d6efd;
  font-weight: 400;
  padding-left: 1.5rem;
  border-left: 3px solid #0d6efd;
}

.transition {
  transition: transform 0.2s ease;
}

.rotate {
  transform: rotate(180deg);
}
</style>
