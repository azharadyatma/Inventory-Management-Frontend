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
            <th>Nama Karyawan</th>
            <th>Nama Barang</th>
            <th>Jumlah Pinjam</th>
            <th>Tanggal Pinjam</th>
            <th>Tanggal Kembali</th>
            <th>Status</th>
            <th class="action-column">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction.transactionId"
          >
            <td>{{ transaction.transactionId }}</td>
            <td>{{ transaction.username }}</td>
            <td>{{ transaction.name }}</td>
            <td>{{ transaction.quantityBorrowed }}</td>
            <td>{{ transaction.borrowedAt }}</td>
            <td>{{ transaction.returnedAt }}</td>
            <td>{{ transaction.status }}</td>

            <td class="action-buttons">
              <button
                class="verif-btn"
                @click="verifikasi(transaction)"
                :disabled="transaction.status === 'Returned'"
              >
                {{
                  transaction.status === "Returned" ? "Returned" : "Verifikasi"
                }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactions: [
        {
          transactionId: "2024001",
          username: "Budiono",
          name: "Acer Nitro 15 AN515-58",
          quantityBorrowed: 1,
          borrowedAt: "2024-8-10",
          returnedAt: "2024-8-17",
          status: "Borrowed",
        },

        {
          transactionId: "2024002",
          username: "Sisil",
          name: "Lenovo LOQ 15 15IRH8",
          quantityBorrowed: 1,
          borrowedAt: "2024-8-10",
          returnedAt: "2024-8-17",
          status: "Borrowed",
        },
      ],
    };
  },
  methods: {
    verifikasi(transaction) {
      if (transaction.status === "Borrowed") {
        transaction.status = "Returned";
      }
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
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
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

.verif-btn {
  background-color: #3564c8;
  color: white;
  font-size: 14px;
  font-weight: 600;
}

.verif-btn:hover {
  background-color: #235485;
}

.verif-btn[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
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
