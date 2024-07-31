<template>
  <div class="max-w-4xl mx-auto p-4 bg-white rounded-md shadow-md">
    <h2 class="text-2xl font-bold mb-4">User List</h2>
    <div class="w-full flex justify-end">
      <router-link to="/add-user" class="block text-white">
        <button
          class="px-4 py-2 bg-[#303f9f] text-white rounded-md hover:bg-[#5c6bc0]"
        >
          เพิ่มผู้ใช้งาน
        </button>
      </router-link>
    </div>
    <div
      class="flex justify-between items-center p-4 border-b border-gray-200 font-bold"
    >
      <span class="w-1/3">ชื่อ</span>
      <span class="w-1/3">อีเมล</span>
      <span class="w-1/6">อายุ</span>
      <span class="w-1/6"></span>
    </div>
    <ul>
      <li
        v-for="user in users"
        :key="user.id"
        class="flex justify-between items-center p-4 border-b border-gray-200"
      >
        <span class="w-1/3">{{ user.name }}</span>
        <span class="w-1/3">{{ user.email }}</span>
        <span class="w-1/6">{{ user.age }}</span>
        <div class="w-1/6 flex justify-end">
          <button
            @click="editUser(user)"
            class="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            @click="deleteUser(user.id)"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useUserStore } from "../store/User";
import { useRouter } from "vue-router";
import { User } from "../store/User";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const users = computed(() => userStore.users);

    const editUser = (user: User) => {
      userStore.selectUser(user);
      router.push("/edit");
    };

    const deleteUser = (userId: number) => {
      userStore.deleteUser(userId);
    };

    return {
      users,
      editUser,
      deleteUser,
    };
  },
});
</script>
