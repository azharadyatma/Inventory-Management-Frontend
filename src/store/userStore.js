import { defineStore } from "pinia";
import apiClient from "@/plugins/axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await apiClient.get("/users");

        this.users = response.data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },

    async addUser(user) {
      try {
        const response = await apiClient.post("/users", user);

        this.users.push(response.data);
      } catch (error) {
        console.error("Failed to add user:", error.message);
      }
    },

    async updateUser(user) {
      try {
        const response = await apiClient.patch(`/users/${user.userId}`, user);
        const index = this.users.findIndex((u) => u.userId === user.userId);

        if (index !== -1) {
          this.users.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    },

    async deleteUser(userId) {
      try {
        await apiClient.delete(`/users/${userId}`);

        this.users = this.users.filter((user) => user.userId !== userId);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    },
  },
});
