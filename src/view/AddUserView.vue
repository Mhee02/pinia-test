<template>
  <div>
    <UserForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserForm from "../components/UserForm.vue";

export default defineComponent({
  components: {
    UserForm,
  },
});
</script>
