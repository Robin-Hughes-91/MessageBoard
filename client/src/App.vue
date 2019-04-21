<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">Bad Day?</a>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input v-model="searchTerm" class="form-control mr-sm-2" type="text" placeholder="Search">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit" @click=getGifs()>Search</button>
        </form>
      </div>
    </nav>
    <div class="gif-container">
      <img v-for="gif in gifs" :src="gif" :key="gif.id">
    </div>
    <router-view class="container"/>
  </div>
</template>


<script>
export default {
  data() {
    return {
      searchTerm: "",
      gifs: [],
    };
  },
  methods: {
    getGifs() {
      console.log(this.searchTerm);

      let apiKey = "dc6zaTOxFJmzC";
      let searchEndPoint = "https://api.giphy.com/v1/gifs/search?";
      let limit = 5;

      let url = `${searchEndPoint}&api_key=${apiKey}&q=${
        this.searchTerm
      }&limit=${limit}`;

      fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        this.buildGifs(json);
      })
      .catch(err => {
        console.log(err);
      });
    },
    buildGifs(json) {
      this.gifs = json.data
      .map(gif => gif.id)
      .map(gifId => {
        return `https://media.giphy.com/media/${gifId}/giphy.gif`;
      });
    },
  }
};
</script>

<style>

</style>
