<template>
  <div class="user-list">
    <div class="header">
      <h2>Daftar Pengguna</h2>

      <button class="add-btn" @click="showAddForm">Tambah Pengguna</button>
    </div>

    <div class="user-cards">
      <UserCard
        v-for="user in filteredUsers"
        :key="user.userId"
        :user="user"
        @edit-user="editUser"
        @delete-user="handleDeleteUser"
      />
    </div>

    <Modal :visible="showForm" @close="cancelEditForm">
      <UserForm
        :user="selectedUser"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="cancelEditForm"
      />
    </Modal>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import UserCard from "@/components/admin/user/UserCard.vue";
import Modal from "@/components/Modal.vue";
import UserForm from "@/components/admin/user/UserForm.vue";
import eventBus from "@/utils/EventBus";

export default {
  name: "UserList",

  components: {
    UserCard,
    Modal,
    UserForm,
  },

  setup() {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const users = computed(() => userStore.users);

    onMounted(() => {
      if (authStore.token) {
        userStore.fetchUsers();
      } else {
        console.error("User is not authenticated");
      }
    });

    return {
      users,
      userStore,
      addUser: userStore.addUser,
      updateUser: userStore.updateUser,
      deleteUser: userStore.deleteUser,
    };
  },

  data() {
    return {
      showForm: false,
      selectedUser: null,
      isEdit: false,
      searchQuery: "",
    };
  },

  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  methods: {
    showAddForm() {
      this.selectedUser = {
        userId: "",
        username: "",
        email: "",
        role: "USER",
      };
      this.isEdit = false;
      this.showForm = true;
    },

    editUser(user) {
      this.selectedUser = { ...user };
      this.isEdit = true;
      this.showForm = true;
    },

    async handleSubmit(user) {
      if (this.isEdit) {
        await this.updateUser(user);
      } else {
        await this.addUser(user);
      }

      await this.userStore.fetchUsers(); // Fetch latest users

      this.showForm = false;
    },

    cancelEditForm() {
      this.showForm = false;
    },

    async handleDeleteUser(userId) {
      await this.deleteUser(userId);
      await this.userStore.fetchUsers(); // Fetch latest users
    },

    handleSearch(query) {
      this.searchQuery = query;
    },
  },

  mounted() {
    eventBus.on("search", this.handleSearch);
  },

  beforeUnmount() {
    eventBus.off("search", this.handleSearch);
  },
};
</script>

<style scoped>
.user-list {
  padding: 24px;
  background-color: #fff;
  border-radius: 10px;
  margin: 20px;
}

.user-cards {
  margin: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 40px;
}

h2 {
  color: #35c88d;
  font-size: 32px;
  font-weight: 600;
}

.add-btn {
  background-color: #35c88d;
  color: white;
  padding: 12px 12px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
}

.add-btn:hover {
  background-color: #23855e;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: center;
  vertical-align: middle;
}

th {
  background-color: #35c88d;
  color: white;
  text-transform: uppercase;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

button {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.edit-btn {
  background-color: #fed86e;
  color: white;
  margin-right: 5px;
}

.edit-btn:hover {
  background-color: #bca052;
}

.delete-btn {
  background-color: #df3636;
  color: white;
}

.delete-btn:hover {
  background-color: #bb3232;
}

@media (max-width: 600px) {
  th,
  td {
    padding: 8px 10px;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .action-buttons button {
    margin: 5px 0;
  }
}
</style>
