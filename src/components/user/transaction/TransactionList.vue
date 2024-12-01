<template>
  <div class="transaction-list">
    <div class="header">
      <h2>Daftar Transaksi</h2>
    </div>

    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama User</th>
            <th>Nama Barang</th>
            <th>Jumlah Pinjam</th>
            <th>Tanggal Pinjam</th>
            <th>Tanggal Pengembalian</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.namaUser }}</td>
            <td>{{ transaction.namaBarang }}</td>
            <td>{{ transaction.jumlahPinjam }}</td>
            <td>{{ transaction.tanggalPinjam }}</td>
            <td>{{ transaction.tanggalPengembalian }}</td>
            <td>{{ transaction.status }}</td>

            <td class="action-buttons">
              <button
                class="return-btn"
                @click="openReturnForm(transaction)"
                :disabled="transaction.status === 'Returned'"
              >
                {{
                  transaction.status === "Returned"
                    ? "Dikembalikan"
                    : "Kembalikan"
                }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :visible="showForm" @close="cancelReturnForm">
      <TransactionForm
        :transaction="selectedTransaction"
        @submit="handleReturn"
        @cancel="cancelReturnForm"
      />
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import TransactionForm from "@/components/user/transaction/TransactionForm.vue";

export default {
  components: {
    Modal,
    TransactionForm,
  },

  data() {
    return {
      transactions: [
        {
          id: "2024001",
          namaUser: "John Doe",
          namaBarang: "Acer Nitro 15 AN515-58",
          jumlahPinjam: 1,
          tanggalPinjam: "2022-10-10",
          tanggalPengembalian: "2022-10-17",
          status: "Borrowed",
        },

        {
          id: "2024002",
          namaUser: "Jane Smith",
          namaBarang: "Lenovo LOQ 15 15IRH8",
          jumlahPinjam: 1,
          tanggalPinjam: "2022-10-10",
          tanggalPengembalian: "2022-10-17",
          status: "Borrowed",
        },
      ],

      showForm: false,
      selectedTransaction: null,
    };
  },

  methods: {
    openReturnForm(transaction) {
      this.selectedTransaction = { ...transaction };
      this.showForm = true;
    },

    handleReturn(updatedTransaction) {
      const index = this.transactions.findIndex(
        (t) => t.id === updatedTransaction.id
      );

      if (index !== -1) {
        this.transactions[index] = {
          ...updatedTransaction,
          status: "Returned",
        };
      }
      this.cancelReturnForm();
    },

    cancelReturnForm() {
      this.showForm = false;
      this.selectedTransaction = null;
    },
  },
};
</script>

<style scoped>
.transaction-list {
  padding: 24px;
  background-color: #fff;
  border-radius: 10px;
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
  margin: 20px;
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

.return-btn {
  background-color: #3564c8;
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.return-btn:hover {
  background-color: #235485;
}

@media (max-width: 600px) {
  th,
  td {
    padding: 8px 10px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
