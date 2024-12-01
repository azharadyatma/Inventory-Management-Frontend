<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label" for="kode">Kode Barang:</label>
        <input
          class="form-control"
          type="text"
          v-model="form.kode"
          id="kode"
          :disabled="true"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="nama">Nama Produk:</label>
        <input
          class="form-control"
          type="text"
          v-model="form.nama"
          id="nama"
          :disabled="true"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="deskripsi">Deskripsi:</label>

        <input
          class="form-control"
          type="text"
          v-model="form.deskripsi"
          id="deskripsi"
          :disabled="true"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="tanggal_pinjam">Tanggal Pinjam:</label>
        <input
          class="form-control"
          type="date"
          v-model="form.tanggal_pinjam"
          id="tanggal_pinjam"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="tanggal_kembali">Tanggal Kembali:</label>

        <input
          class="form-control"
          type="date"
          v-model="form.tanggal_kembali"
          id="tanggal_kembali"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="jumlah_pinjam">Jumlah Pinjam:</label>
        <input
          class="form-control"
          type="number"
          v-model="form.jumlah_pinjam"
          id="jumlah_pinjam"
        />
      </div>

      <div class="button-container d-flex justify-content-center">
        <button class="btn btn-success" type="submit">Ajukan</button>
        <button class="btn btn-danger" type="button" @click="cancelForm">
          Batal
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    isEdit: Boolean,
  },

  data() {
    return {
      form: {
        kode: this.item ? this.item.kode : "",
        nama: this.item ? this.item.nama : "",
        deskripsi: this.item ? this.item.deskripsi : "",
        tanggal_pinjam: "",
        tanggal_kembali: "",
        jumlah_pinjam: 1,
      },
    };
  },

  methods: {
    submitForm() {
      this.$emit("submit", { ...this.form });
    },

    cancelForm() {
      this.$emit("cancel");
    },
  },

  watch: {
    item(newItem) {
      if (newItem) {
        this.form.kode = newItem.kode;
        this.form.nama = newItem.nama;
        this.form.deskripsi = newItem.deskripsi;
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
  margin-right: 5px;
  font-size: 14px;
}

.btn-success:hover {
  background-color: #23855e;
  border-color: #23855e;
}

.btn-danger {
  background-color: #df3636;
  border-color: #df3636;
  margin-top: 20px;
  font-weight: 600;
  margin-left: 5px;
  font-size: 14px;
}

.btn-danger:hover {
  background-color: #bb3232;
  border-color: #bb3232;
}
</style>
