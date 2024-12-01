<template>
  <div :class="['sidebar', { 'd-none': !isSidebarVisible }]">
    <img
      src="@/assets/InventoryHub.png"
      alt="Inventory Hub Logo"
      class="logo"
    />

    <p class="menu-title">MENU</p>

    <ul>
      <li v-if="currentRole === 'admin'">
        <a href="#" @click.prevent="showComponent('users')" class="nav-link">
          <i class="bi bi-house-door-fill"></i> Users
        </a>
      </li>

      <li>
        <a href="#" @click.prevent="showComponent('items')" class="nav-link">
          <i class="bi bi-archive-fill"></i> Items
        </a>
      </li>

      <li>
        <a
          href="#"
          @click.prevent="showComponent('transactions')"
          class="nav-link"
        >
          <i class="bi bi-cash-coin"></i> Transactions
        </a>
      </li>

      <li v-if="currentRole == 'user'">
        <a href="#" @click.prevent="showComponent('history')" class="nav-link">
          <i class="bi bi-clock-history"></i> History
        </a>
      </li>
    </ul>

    <p class="credit">© 2024 Azhar Adyatma</p>
  </div>
</template>

<script>
export default {
  props: {
    currentRole: {
      type: String,
      required: true,
    },

    isSidebarVisible: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    showComponent(component) {
      this.$router.push({ name: this.currentRole, params: { component } });
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: #35c88d;
  color: white;
  padding: 14px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  font-size: 18px;
  font-family: sans-serif;
  transition: transform 0.3s ease;
}

.sidebar.hidden {
  transform: translateX(-100%);
}

.logo {
  max-width: 140px;
  height: auto;
  display: block;
  margin: 20px auto;
}

.credit {
  font-size: 10px;
  color: #ffffff;
  text-align: center;
  margin-top: auto;
  margin-bottom: 10px;
}

.menu-title {
  font-size: 10px;
  color: #ffffff;
  margin: 20px 0 20px;
  text-align: left;
  padding-left: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 20px;
  text-align: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

a i {
  margin-right: 10px;
}
</style>
