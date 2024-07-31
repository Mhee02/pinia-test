import { defineStore } from 'pinia';

export interface User {
  id: number;
  name: string;
  email: string;
  age: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    selectedUser: null as User | null,
  }),
  actions: {
    addUser(user: User) {
      this.users.push(user);
    },
    updateUser(updatedUser: User) {
      const index = this.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        this.users.splice(index, 1, updatedUser);
      }
    },
    deleteUser(userId: number) {
      this.users = this.users.filter(user => user.id !== userId);
    },
    selectUser(user: User) {
      this.selectedUser = user;
    },
    clearSelectedUser() {
      this.selectedUser = null;
    },
  },
});
