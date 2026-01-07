<template>
   <div class="d-flex">
    <SidebarView />

    <div class="flex-grow-1">
      <TopbarView />
      <main class="p-4 bg-light min-vh-100">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarView from '@/components/SidebarView.vue';
import TopbarView from '@/components/TopbarView.vue'
</script>
<style  scoped>
 
</style>