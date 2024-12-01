<template>
  <div>
    <form @submit.prevent="submitForm" class="user-form">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>

        <input
          type="text"
          v-model="form.username"
          id="username"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>

        <input
          type="email"
          v-model="form.email"
          id="email"
          class="form-control"
          required
        />
      </div>

      <div v-if="!isEdit" class="mb-3">
        <label for="password" class="form-label">Password</label>

        <input
          type="password"
          v-model="form.password"
          id="password"
          class="form-control"
          required
        />
      </div>

      <div v-if="!isEdit" class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>

        <input
          type="password"
          v-model="form.confirmPassword"
          id="confirmPassword"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="role" class="form-label">Role</label>
        <select v-model="form.role" id="role" class="form-select" required>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>
      </div>

      <div v-if="form.error" class="alert alert-danger">{{ form.error }}</div>

      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-success">
          {{ isEdit ? "Simpan Perubahan" : "Tambah Pengguna" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import { useUserStore } from "@/store/userStore";

export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },

    isEdit: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "USER",
        error: "",
      },
    };
  },

  watch: {
    user: {
      immediate: true,

      handler(newUser) {
        if (this.isEdit) {
          this.form = {
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
          };
        } else {
          this.resetForm();
        }
      },
    },
  },

  methods: {
    resetForm() {
      this.form = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "USER",
        error: "",
      };
    },

    async submitForm() {
      const userStore = useUserStore();

      try {
        if (!this.isEdit) {
          if (this.form.password !== this.form.confirmPassword) {
            this.form.error = "Passwords do not match";

            return;
          }
        }

        this.form.error = "";

        const payload = {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          role: this.form.role,
        };

        console.log("Sending data to server:", payload);

        if (this.isEdit) {
          await axios.patch(`/users/${this.user.userId}`, payload);
        } else {
          const response = await axios.post("/users", payload);
          console.log("User created:", response.data);
        }

        this.$emit("submit", this.form);

        this.resetForm();
      } catch (error) {
        console.error("Failed to submit form:", error);
        this.form.error = "Failed to submit form: " + error.message;
      }
    },
  },
};
</script>

<style scoped>
form {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
}

.mb-3 {
  margin-bottom: 1rem;
}

.form-label {
  font-weight: bold;
  color: #4b3f6b;
}

.form-control {
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-control:focus {
  border-color: #4b3f6b;
  box-shadow: 0 0 0 0.2rem rgba(75, 63, 107, 0.25);
}

.form-label {
  font-weight: bold;
  color: #4b3f6b;
}

.btn-success {
  background-color: #35c88d;
  border-color: #35c88d;
  margin-top: 20px;
  font-weight: 600;
}

.btn-success:hover {
  background-color: #23855e;
  border-color: #23855e;
}
</style>
