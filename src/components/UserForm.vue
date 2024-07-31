<template>
  <div class="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
    <h2 class="text-2xl font-bold mb-4">
      {{ isEditing ? "Edit User" : "Add User" }}
    </h2>
    <form @submit.prevent="saveUser">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Name:</label
        >
        <input
          v-model="user.name"
          placeholder="กรุณากรอกชื่อ"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Email:</label
        >
        <input
          v-model="user.email"
          placeholder="กรุณากรอกอีเมล"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <p v-if="emailError" class="text-red-500 text-sm mt-2">
          {{ emailError }}
        </p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >อายุ:</label
        >
        <select
          v-model="user.age"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option disabled value="">กรุณากรอกอายุ</option>
          <option>15-20</option>
          <option>21-26</option>
          <option>27-32</option>
          <option>33-38</option>
        </select>
      </div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Save
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useUserStore } from "../store/User";
import { useRouter, useRoute } from "vue-router";
import { User } from "../store/User";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();
    const user = ref<User>({
      id: Date.now(),
      name: "",
      email: "",
      age: "",
    });

    const emailError = ref<string | null>(null);

    const isEditing = computed(() => !!userStore.selectedUser);

    watch(
      userStore,
      () => {
        if (isEditing.value && userStore.selectedUser) {
          user.value = { ...userStore.selectedUser };
        }
      },
      { immediate: true }
    );

    watch(
      route,
      () => {
        if (route.path === "/add-user") {
          userStore.clearSelectedUser(); // Clear the selected user in the store
          user.value = {
            id: Date.now(),
            name: "",
            email: "",
            age: "",
          };
        }
      },
      { immediate: true }
    );

    const validateEmail = (email: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    const saveUser = () => {
      if (!user.value.email) {
        emailError.value = "Email is required.";
      } else if (!validateEmail(user.value.email)) {
        emailError.value = "Please enter a valid email address.";
      } else {
        emailError.value = null;
        if (isEditing.value) {
          userStore.updateUser(user.value);
        } else {
          userStore.addUser(user.value);
        }
        userStore.clearSelectedUser();
        router.push("/user-list");
      }
    };

    return {
      user,
      isEditing,
      saveUser,
      emailError,
    };
  },
});
</script>
