<template>
  <div class="user-card card mb-3 shadow-sm">
    <div class="card-body">
      <div class="card-header">
        <h3 class="card-title">{{ user.username }}</h3>
        <span :class="['role', user.role.toLowerCase()]">{{ user.role }}</span>
      </div>
      <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
      <div class="buttons d-flex gap-2 mt-3">
        <button @click="$emit('edit-user', user)" class="btn btn-success edit">
          Edit
        </button>

        <button
          @click="$emit('delete-user', user.userId)"
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
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log("Rendered user:", this.user);
  },
};
</script>

<style scoped>
.user-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-body {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 12px;
  margin-bottom: 12px;
  background-color: #fff;
}

.card-title {
  font-size: 1.5em;
  color: #000;
}

.card-text {
  margin: 20px 16px;
  color: #000;
}

.buttons {
  display: flex;
  gap: 10px;
  margin: 16px;
}

.btn {
  transition: background-color 0.2s, transform 0.2s;
  border-radius: 6px;
  font-size: 14px;
  padding: 8px 16px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.btn-success {
  background-color: #fed86e;
  border-color: #fed86e;
}

.btn-success:hover {
  background-color: #f0c35d;
  transform: scale(1.05);
}

.btn-danger {
  background-color: #e74c3c;
  border-color: #e74c3c;
}

.btn-danger:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.role {
  padding: 8px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.role.admin {
  background-color: #ff6347;
  color: white;
}

.role.user {
  background-color: #35c88d;
  color: white;
}
</style>
