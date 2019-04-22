
<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">Bad Day?</a>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <h5 for="text" class="mr-2" >Search Giphy!</h5>
          <input v-model="searchTerm" class="form-control mr-sm-2" type="text" placeholder="Search">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit" @click="getGifs(), showGiphySearch = true">Search</button>
        </form>
      </div>
    </nav>
    <div v-if="showGiphySearch" id="slider" class="slider" @mousemove="mouseMoving" @mouseup="stopDrag">
      <h3 class="sliderHeading m-2"> Click and slide!</h3>
      <div class="slider-cards" :style="`transform: translate3d(${cardsX}px,0,0)`">
        <div @mousedown="startDrag"
        @mouseup="stopDrag"
        v-for="(gif, index) in gifs"
        :key="index"
        class="slider-card"
        v-on:click="addGifToMessageForm(index)">
        <img :src="gif" :key="gif.id" draggable="false">
      </div>
    </div>
    <button type="button" @click="showGiphySearch = false" class="btn btn-info slider mt-3 mb-3">^^^</button>
  </div>

  <router-view class="container"/>
</div>
</template>


<script>
//event  bus for sending the clicked gif url to home view
import { EventBus } from './event-bus.js';

export default {
  data() {
    return {
      searchTerm: '',
      gifs: [],
      showGiphySearch: false,
      clickedGifUrl: '',


      selectedIndex: 0,
      dragging: false,
      initialMouseX: 0,
      initialCardsX: 0,
      cardsX: 0
    }
  },
  computed: {
    selectedSlide () {
      return this.slides[this.selectedIndex]
    }
  },
  methods: {
    startDrag (e) {
      e.preventDefault()
      console.log(this.dragging)
      this.dragging = true
      this.initialMouseX = e.pageX
      this.initialCardsX = this.cardsX
    },
    stopDrag () {
      this.dragging = false

      const cardWidth = 290
      const nearestSlide = -Math.round(this.cardsX / cardWidth)
      this.selectedIndex = Math.min(Math.max(0, nearestSlide), this.gifs.length -1)
    },
    mouseMoving (e) {
      if(this.dragging) {
        const dragAmount = e.pageX - this.initialMouseX
        const targetX = this.initialCardsX + dragAmount
        this.cardsX = targetX
      }
    },
    getGifs() {
      console.log(this.searchTerm);
      let apiKey = "dc6zaTOxFJmzC";
      let searchEndPoint = "https://api.giphy.com/v1/gifs/search?";
      let limit = 24;

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
      this.gifs = [];
      this.gifs = json.data
      .map(gif => gif.id)
      .map(gifId => {
        return `https://media.giphy.com/media/${gifId}/giphy.gif`;
      });
    },
    addGifToMessageForm(index) {
      const gifUrl = this.gifs[index];
      this.clickedGifUrl = gifUrl;
      EventBus.$emit('i-got-clicked', this.clickedGifUrl);
      console.log("clickedgifurl", gifUrl);
    }
  },
};
</script>

<style>

.slider {
  overflow: hidden;
  background-color: #1F1140;
  width: 100%;
  height: 100%;
  align-content: center;
  margin:0 auto;
}

.slider-cards {
  /* position: relative; */
  /* overflow: hidden; */
  width: 500%;
  max-height: 160px;
  margin: 20px 50px;
  z-index: 1;
  display:inline-flex;
  /* align-content: center; */
}

.slider-card {
  display:inline;
  background-color: #1F1140;
  width: 260px;
  height: 150px;
  margin-right: 30px;
  border-radius: 12px;
  box-shadow:0px 60px 20px -20px rgba(0, 0, 0, 0.3);
  align-content: center;



}
.slider-card img {
  width: 260px;
  max-height: 150px;
  border-radius: 15px;
}

h3.sliderHeading {
  text-align: center;
  border: 10px;
}

button.btn.btn-info.slider.mt-3.mb-3 {
  text-align: center;
  max-height: 20px;
}




</style>
