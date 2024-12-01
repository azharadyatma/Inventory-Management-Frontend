<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="itemId" class="form-label">Kode Barang</label>

        <input
          type="number"
          v-model="form.itemId"
          id="itemId"
          class="form-control"
          :disabled="isEdit"
          required
        />
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">Nama Barang</label>

        <input
          type="text"
          v-model="form.name"
          id="name"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Deskripsi</label>

        <input
          type="text"
          v-model="form.description"
          id="description"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="quantity" class="form-label">Stok</label>

        <input
          type="number"
          v-model="form.quantity"
          id="quantity"
          class="form-control"
          required
        />
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-success">
          {{ isEdit ? "Simpan Perubahan" : "Tambah Barang" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useItemStore } from "@/store/itemStore";
export default {
  props: {
    item: {
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
        itemId: "",
        name: "",
        description: "",
        quantity: 0,
      },
    };
  },

  watch: {
    item: {
      immediate: true,

      handler(newItem) {
        if (this.isEdit) {
          this.form = {
            itemId: newItem.itemId,
            name: newItem.name,
            description: newItem.description,
            quantity: newItem.quantity,
            error: "",
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
        itemId: "",
        name: "",
        description: "",
        quantity: 0,
        error: "",
      };
    },

    async submitForm() {
      try {
        this.form.error = "";

        const payload = {
          id: this.form.id,
          name: this.form.name,
          description: this.form.description,
          quantity: this.form.quantity,
        };

        console.log("Sending data to server:", payload);

        if (this.isEdit) {
          await useItemStore().updateItem(payload);
        } else {
          await useItemStore().addItem(payload);
        }

        this.$emit("submit", this.form);
        this.resetForm();
      } catch (error) {
        console.error("Failed to submit form:", error);

        if (error.response) {
          console.error("Response Status:", error.response.status);
          console.error("Response Data:", error.response.data);
          this.form.error = error.response.data.message || "Unknown error";
        } else if (error.request) {
          console.error(
            "Request made but no response received:",
            error.request
          );
          this.form.error = "Request made but no response received";
        } else {
          console.error("Error details:", error.message);
          this.form.error = error.message || "Failed to submit form";
        }
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
