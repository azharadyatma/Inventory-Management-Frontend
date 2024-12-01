<template>
  <div class="item-list">
    <div class="header">
      <h2>Daftar Barang</h2>

      <button class="add-btn" @click="showAddForm">Tambah Item</button>
    </div>

    <div class="item-cards row">
      <ItemCard
        v-for="item in items"
        :key="item.itemId"
        :item="item"
        @edit-item="editItem"
        @delete-item="handleDeleteItem"
        class="col-md-6 col-lg-4 mx-2"
      />
    </div>

    <Modal :visible="showForm" @close="cancelEditForm">
      <ItemForm
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="cancelEditForm"
      />
    </Modal>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { EventBus } from "@/utils/EventBus";
import ItemCard from "@/components/admin/item/ItemCard.vue";
import Modal from "@/components/Modal.vue";
import ItemForm from "@/components/admin/item/ItemForm.vue";
import { useItemStore } from "@/store/itemStore";

export default {
  name: "ItemList",
  components: {
    ItemCard,
    Modal,
    ItemForm,
  },

  data() {
    return {
      showForm: false,
      selectedItem: null,
      isEdit: false,
      searchQuery: "",
    };
  },

  setup() {
    const itemStore = useItemStore();
    const items = computed(() => itemStore.items);

    onMounted(() => {
      itemStore.fetchItems();
    });

    return {
      items,
      itemStore,
      addItem: itemStore.addItem,
      updateItem: itemStore.updateItem,
      deleteItem: itemStore.deleteItem,
    };
  },

  computed: {
    items() {
      return this.itemStore.items;
    },

    filteredItems() {
      return this.items.filter((item) => {
        return (
          item.itemId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },

  methods: {
    showAddForm() {
      this.selectedItem = {
        itemId: "",
        name: "",
        description: "",
        quantity: "",
      };
      this.isEdit = false;
      this.showForm = true;
    },

    editItem(item) {
      this.selectedItem = { ...item };
      this.isEdit = true;
      this.showForm = true;
    },

    async handleSubmit(item) {
      if (this.isEdit) {
        await this.itemStore.updateItem(item);
      } else {
        await this.itemStore.addItem(item);
      }
      await this.itemStore.fetchItems();
      this.showForm = false;
    },

    cancelEditForm() {
      this.showForm = false;
    },

    async handleDeleteItem(itemId) {
      this.itemStore.deleteItem(itemId);
      await this.itemStore.fetchItems();
    },

    handleSearch(query) {
      this.searchQuery = query;
    },
  },

  mounted() {
    EventBus.on("search", this.handleSearch);
  },

  beforeUnmount() {
    EventBus.off("search", this.handleSearch);
  },
};
</script>

<style scoped>
.item-cards {
  margin: 15px;
}

.item-list {
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
</style>
