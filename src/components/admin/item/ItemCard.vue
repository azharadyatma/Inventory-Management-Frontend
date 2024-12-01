<template>
  <div class="item-card card mb-3 shadow-sm rounded-lg">
    <div class="card-body">
      <h3 class="card-title">{{ item.name }}</h3>
      <p class="card-text">{{ item.description }}</p>
      <p class="card-text stock">Stok: {{ item.quantity }}</p>
      <div class="buttons d-flex gap-2 mt-3">
        <button @click="$emit('edit-item', item)" class="btn btn-success edit">
          Edit
        </button>

        <button
          @click="$emit('delete-item', item.itemId)"
          class="btn btn-danger delete"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log("Rendered item:", this.item);
  },
};
</script>

<style scoped>
.item-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.6em;
  color: #333;
  margin-bottom: 12px;
}

.card-text {
  color: #555;
  margin: 8px 0;
}

.card-text.stock {
  font-weight: bold;
  color: #2c3e50;
}

.buttons button {
  padding: 10px 15px;
  font-size: 14px;
  text-align: center;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-success {
  background-color: #fed86e;
  border-color: #fed86e;
  font-weight: 600;
}

.btn-success:hover {
  background-color: #f0c35d;
  transform: scale(1.05);
}

.btn-danger {
  background-color: #e74c3c;
  border-color: #e74c3c;
  font-weight: 600;
}

.btn-danger:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.item-card .btn {
  width: 100%;
}

.item-card .btn:hover {
  transform: scale(1.05);
}

.card-title,
.card-text {
  line-height: 1.5;
}
</style>
