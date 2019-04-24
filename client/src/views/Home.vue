<!-- using :src binds the src to the imageURL -->
<!-- I used onerror to prevent default image error pic when user tries to use a bad imageurl -->
<!-- we bind the input to our data with v-model -->

<template>
  <div>
    <button  @click=" getGifUrl(), showMessageForm = !showMessageForm" type="button" class="btn btn-info mt-3 mb-3" id="showMessageButton">Message Box Toggle</button>
    <form v-if="showMessageForm" @submit.prevent="addMessage" class=" mb-3">
      <div v-if = "error" class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4>Error!</h4> <a>{{error}}</a>
      </div>
      <fieldset>
        <div class="form-group row">
          <div class="col-sm-10">
          </div>
        </div>
        <div class="form-group">
          <label for="username">User Name</label>
          <input v-model="message.username" type="username" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username" required>
          <small id="usernameHelp" class="form-text text-muted">Leave blank to stay anonymous.</small>
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input v-model="message.subject" type="subject" class="form-control" id="subject" placeholder="Enter Message Subject" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea v-model="message.message" class="form-control" id="message" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="imageURL">Image/GIF URL</label>
          <input v-model="message.imageURL" type="text" class="form-control" id="imageURL" value=message.imageURL >
        </div>
        <div class="form-group">
          <label for="exampleInputFile">File input</label>
          <input v-on:change="uploadImage" type="file" accept="image/*" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
          <small id="fileHelp" class="form-text text-muted">Upload a file</small>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </fieldset>
    </form>
    <div class="list-unstyled" v-for ="message in reversedMessages" :key="message._id">
      <li class="media" >
        <img v-if="message.imageURL"  class="mr-3" :src="message.imageURL" onerror="this.onerror=null;this.src='https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif';" :alt="message.imageFile">
        <img v-else="message.imageFile"  class="mr-3" :src="message.imageFile" onerror="this.onerror=null;this.src='https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif';" >
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{message.username}}</h4>
          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          {{message.message}}
          <br />
        </div>
      </li>
      <small>{{message.created_on}}</small>
      <hr>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//we use an eventbus to do pubsub to pull in the clicked gif url
import { EventBus } from '../event-bus.js';
  EventBus.$on('i-got-clicked', gifUrl => {
    document.getElementById("showMessageButton").click();

  });




//this is the address for the API containing all the messages
const  API_URL = 'https://full-stack-gif-message-board.herokuapp.com/';


//mounted method runs when homepage gets run
//we make a request against the messages api when page loads home
export default {
  name: 'home',
  data: () => ({

    messages: [],
    clickedGifUrl: '',
    showMessageForm: false,
    error: '',

    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imageURL: '',
      imageFile: null,
    }
  }),
  computed: {
    reversedMessages() {
      console.log("reverse",this.messages.slice().reverse());
      return this.messages.slice().reverse();
    }
  },
  mounted() {
    //fetches the messages from the db
    fetch(API_URL).then(response => response.json()).then(result => {
      this.messages = result;
      console.log(this.messages);
    });
  },

  methods: {

    uploadImage(e){
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.message.imageFile = e.target.result;
        console.log("uploaded image",this.message);
      };
    },
    addMessage() {
      //we make a post request to url and body is the form content and contenttype is json so it gets parsed
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => response.json()).then(result => {
        if (result.details) {
          //there was an error
          const error = result.details.map(detail => detail.message).join(' ');
          console.log(error);
          this.error = error;
        }else{
          this.error = '';
          this.messages.push(result);
          this.showMessageForm = false;

        }
        console.log(JSON.stringify(this.message));

      });
    },
    getGifUrl(){
      EventBus.$on('i-got-clicked', gifUrl => {
        this.showMessageForm = true;
        this.message.imageURL = gifUrl;
        var el = document.getElementById("imageURL");
        el.value = gifUrl
        this.clickedGifUrl = gifUrl;
        console.log(`Oh, that's nice. It's gotten ${gifUrl} clicked! :)`)
      });
    }
  },
};
</script>

<style>
hr {
  border: 1px solid white;
}

img {
  max-width: 300px;
}

li.media{
  padding: 10px;
}
</style>
