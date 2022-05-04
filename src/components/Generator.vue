<template>
  <v-dialog
    v-model="open"
    max-width="900"
    scrollable
    @click:outside="hanldeClose"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-img :src="`${src}_q.jpg`" :title="title" v-bind="attrs" v-on="on" />
    </template>
    <v-card>
      <v-card-title>Generate Your Meme</v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col xs="12" md="6" class="dialog">
            <v-img :src="`${src}.jpg`" :id="id">
              <h1 class="above">{{ aboveText }}</h1>
              <h1 class="below">{{ belowText }}</h1>
            </v-img>
          </v-col>
          <v-col xs="12" md="6" class="dialog actions">
            <v-card-text class="buttons">
              <v-text-field
                label="Enter the above text here"
                outlined
                clearable
                hide-details
                v-model="aboveText"
              />
              <v-text-field
                label="Enter the below text here"
                outlined
                clearable
                hide-details
                v-model="belowText"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" depressed @click="handleExport">
                <v-icon left>mdi-download</v-icon>
                Export
              </v-btn>
              <v-btn color="primary" text @click="hanldeClose"> Cancel </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

export default {
  name: "memeGenerator",

  data() {
    return {
      open: false,
      aboveText: "",
      belowText: "",
    };
  },

  props: {
    src: String,
    title: String,
    id: Number,
  },

  methods: {
    handleExport() {
      htmlToImage.toPng(document.getElementById(this.id)).then((dataUrl) => {
        download(
          dataUrl,
          `${this.title}_${this.aboveText}_${this.belowText}.png`
        );
      });
    },

    hanldeClose() {
      this.aboveText = "";
      this.belowText = "";
      this.open = false;
    },
  },
};
</script>

<style scoped>
.above {
  position: absolute;
  left: 50%;
  top: 0%;
  transform: translate(-50%, 0);
  color: white;
  text-shadow: 0px 0px 10px black;
}

.below {
  position: absolute;
  left: 50%;
  bottom: 0%;
  transform: translate(-50%, 0);
  color: white;
  text-shadow: 0px 0px 10px black;
}
</style>