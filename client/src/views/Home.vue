<!-- using :src binds the src to the imageURL -->
<!-- I used onerror to prevent default image error pic when user tries to use a bad imageurl -->
<!-- we bind the input to our data with v-model -->

<template>
  <div>
    <form @submit.prevent="addMessage">
      <fieldset>
        <legend>Legend</legend>
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
          <input v-model="message.imageURL" type="url" class="form-control" id="imageURL" placeholder="Enter Image/GIF URL">
        </div>
        <div class="form-group">
          <label for="exampleInputFile">File input</label>
          <input v-on:change="uploadImage" type="file" accept="image/*" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
          <small id="fileHelp" class="form-text text-muted">Upload a file</small>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </fieldset>
    </form>
    <div class="list-unstyled" v-for ="message in messages" :key="message._id">
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

//this is the address for the API containing all the messages
const  API_URL = 'http://localhost:1234/messages';


//mounted method runs when homepage gets run
//we make a request against the messages api when page loads home
export default {
  name: 'home',
  data: () => ({

    messages: [],
    componentKey: 0,
    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imageURL: '',
      imageFile:null,
    }
  }),
  mounted() {
    fetch(API_URL).then(response => response.json()).then(result => {
      this.messages = result;
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
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json'
        }
      })
    },
    forceRerender() {
      this.componentKey += 1;
    }
  }
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
