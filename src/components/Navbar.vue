<template>
  <v-form @submit="handleSubmit">
    <v-app-bar flat color="white" class="Navbar">
      <v-container class="Search">
        <v-text-field
          dense
          placeholder="Search Your Meme"
          prepend-inner-icon="mdi-magnify"
          outlined
          hide-details
          clearable
          v-model="text"
        />
      </v-container>
    </v-app-bar>
  </v-form>
</template>

<script>
export default {
  name: "navBar",

  data() {
    return {
      text: "",
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.text) {
        this.$router.push({ name: "search", query: { text: this.text } });
      }
    },
  },
};
</script>

<style scoped>
.Navbar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
  position: fixed;
  z-index: 10;
}

.Search {
  display: flex;
  justify-content: center;
  max-width: 600px;
}
</style>