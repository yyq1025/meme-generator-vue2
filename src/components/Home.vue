<template>
  <v-form @submit="handleSubmit">
    <v-container class="Home">
      <v-text-field
        autofocus
        placeholder="Search Your Meme"
        append-icon="mdi-magnify"
        rounded
        outlined
        clearable
        hide-details
        v-model="text"
        @click:append="handleSubmit"
        class="Search"
      />
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "homePage",

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
.Home {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Search {
  max-width: 600px;
}
</style>