<template>
  <div class="history-list">
    <div class="header">
      <h2>Riwayat Transaksi</h2>
    </div>

    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Barang</th>
            <th>Jumlah Pinjam</th>
            <th>Tanggal Pinjam</th>
            <th>Tanggal Kembali</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="history in histories" :key="history.id">
            <td>{{ history.id }}</td>
            <td>{{ history.namaBarang }}</td>
            <td>{{ history.jumlahPinjam }}</td>
            <td>{{ history.tanggalPinjam }}</td>
            <td>{{ history.tanggalKembali }}</td>
            <td :class="['status', history.status.toLowerCase()]">
              {{ history.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryList",

  data() {
    return {
      histories: [
        {
          id: 1,
          namaBarang: "Acer Nitro 15 AN515-58",
          jumlahPinjam: 1,
          tanggalPinjam: "2023-05-01",
          tanggalKembali: "2023-05-10",
          status: "selesai",
        },

        {
          id: 2,
          namaBarang: "Lenovo LOQ 15 15IRH8",
          jumlahPinjam: 2,
          tanggalPinjam: "2023-06-15",
          tanggalKembali: "2023-06-20",
          status: "diproses",
        },
      ],
    };
  },
};
</script>

<style scoped>
.history-list {
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

.borrow-btn {
  background-color: #3564c8;

  color: white;
}

.borrow-btn:hover {
  background-color: #235485;
}

.status {
  text-transform: capitalize;
  font-weight: bold;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
}

.status.diproses {
  color: #fed86e;
}

.status.selesai {
  color: #35c88d;
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
