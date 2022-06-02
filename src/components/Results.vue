<template>
  <v-container class="results">
    <p>
      <v-btn text icon @click="handleBack">
        <v-icon>mdi-arrow-left</v-icon> </v-btn
      >{{ total.toLocaleString() }} Results for &quot;{{ text }}&quot;
    </p>
    <div v-infinite-scroll="fetchData" infinite-scroll-disabled="busy">
      <v-row>
        <v-col
          v-for="(item, index) in photo"
          :key="index"
          class="image"
          cols="3"
        >
          <meme-generator
            :src="`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}`"
            :title="item.title"
            :id="index"
          />
        </v-col>
      </v-row>
      <h4>Loading...</h4>
    </div>
  </v-container>
</template>

<script>
import memeGenerator from "./Generator.vue";

export default {
  name: "searchResults",

  components: {
    memeGenerator,
  },

  data() {
    return {
      busy: true,
      text: this.$route.query.text,
      page: 0,
      photo: [],
      total: 0,
    };
  },

  created() {
    // watch the query of the route to fetch the data again
    this.$watch(
      () => this.$route.query,
      () => {
        this.init();
        this.fetchData();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },

  methods: {
    init() {
      this.busy = true;
      this.text = this.$route.query.text;
      this.page = 0;
      this.photo = [];
      this.total = 0;
    },

    fetchData() {
      this.busy = true;
      const url =
        "https://www.flickr.com/services/rest/?" +
        new URLSearchParams({
          method: "flickr.photos.search",
          api_key: "b235d15e6d03a052c424e6d5f652e217",
          text: this.text,
          sort: "relevance",
          page: this.page,
          format: "json",
          nojsoncallback: 1,
        });
      fetch(url)
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.photo = [...this.photo, ...data.photos.photo];
          this.page += 1;
          this.total = data.photos.total;
          this.busy = false;
        })
        .catch((error) => console.log(error));
    },

    handleBack(e) {
      e.preventDefault();
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
.results {
  max-width: 900px;
  padding-top: 80px;
}

.image {
  padding: 2px;
  cursor: pointer;
}

.dialog {
  padding: 0px;
}

.actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.buttons {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
</style>