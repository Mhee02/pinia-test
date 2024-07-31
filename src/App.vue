<template>
  <div class="flex h-screen">
    <aside class="w-64 bg-[#673ab7] p-6">
      <h2 class="text-white text-xl mb-4 text-center">Menu</h2>
      <router-link to="/add-user" class="block text-white mb-4"
        >เพิ่มผู้ใช้งาน</router-link
      >
      <router-link to="/user-list" class="block mb-2 text-white"
        >รายชื่อผู้ใช้งาน</router-link
      >
    </aside>
    <main class="flex-grow p-6">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
/* ไม่มีการใช้ CSS ตรงนี้แล้ว เพราะเราใช้ Tailwind CSS */
</style>
