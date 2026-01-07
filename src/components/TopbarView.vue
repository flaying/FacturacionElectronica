<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showBell = ref(false)
const showUser = ref(false)

const closeAll = (e) => {
  if (!e.target.closest('.dropdown')) {
    showBell.value = false
    showUser.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeAll)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeAll)
})
</script>

<template>
  <nav class="navbar navbar-light bg-white border-bottom px-4">
    
    <div class="ms-auto d-flex align-items-center gap-3">

      <!-- 👤 USUARIO -->
      <div class="dropdown position-relative">
        <i
            class="bi bi-person-circle fs-5 dropdown-toggle cursor-pointer"
            @click.stop="showUser = !showUser; showBell = false"
        ></i>

        <ul
            class="dropdown-menu dropdown-menu-end user-dropdown animated flipInX"
            :class="{ show: showUser }"
        >
          <li class="user-body">
            <a class="dropdown-item" href="#">
              <i class="bi bi-person text-muted me-2"></i> Mis datos
            </a>
         
            <div class="dropdown-divider"></div>

            <a class="dropdown-item" href="#">
              <i class="bi bi-lock text-muted me-2"></i> Salir
            </a>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

/* Animación tipo admin */
.animated {
  animation-duration: 0.3s;
  animation-fill-mode: both;
}

@keyframes flipInX {
  from {
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
  to {
    transform: perspective(400px) rotateX(0);
    opacity: 1;
  }
}

.flipInX {
  animation-name: flipInX;
}
.user-dropdown {
  right: 0;
  left: auto;
  min-width: 220px;
  max-width: calc(100vw - 20px);
  overflow-x: hidden;
}
</style>
