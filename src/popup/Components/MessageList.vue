<template>
<div>
  <v-layout justify-center>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>

        <auth @setUser="setUser" @cleanUser="cleanUser" />

        <v-list two-line style="height: 450px; padding:0;" class="scroll-y">

          <template v-for="(msg, index) in messages">
            <v-list-tile :key="msg.title" avatar ripple
              :style="{ 'background-color': msg.author.uid === user.uid ? '#f4faea': 'white'  }">
              <v-list-tile-avatar>
                <v-avatar size="36">
                  <img :src="msg.author.photoURL ? msg.author.photoURL : ''" alt="avatar">
                </v-avatar>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-sub-title v-if="msg.author.uid !== user.uid">{{ msg.author.name }}</v-list-tile-sub-title>
                <v-list-tile-sub-title v-else>Me</v-list-tile-sub-title>

                <v-list-tile-title v-html="msg.content"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ getTime(msg.createTime) }}</v-list-tile-action-text>
                <v-icon v-show="msg.author === user" color="grey lighten-1">edit</v-icon>
              </v-list-tile-action>
            </v-list-tile>

            <v-divider :key="index"></v-divider>

          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  <msgInput v-if="isLogin" @submit="addMessage" />
  <v-dialog v-model="showLoginMsg" hide-overlay persistent width="350">
    <v-card color="red lighten-2" dark>
      <v-card-text class="headline">
        <v-icon medium>error_outline</v-icon>
        Login to write a message.
      </v-card-text>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import auth from '../Components/Auth'
import msgInput from '../Components/MessageInput'
import firebase from 'firebase/app'
import { db } from '../../firebase'

const fStore = db.firestore()

export default {
  components: {
    auth, msgInput
  },
  data () {
    return {
      currentURL: '',
      user: {},
      isLogin: false,
      messages: []
    }
  },
  computed: {
    showLoginMsg () {
      return !this.isLogin
    }
  },
  mounted: function () {
    const objDiv = document.getElementsByClassName('v-list')
    objDiv[0].scrollTop = objDiv[0].scrollHeight

    const vm = this
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
      vm.currentURL = tabs[0].url

      // Gey message by current URL from firestore
      vm.$bind(
        'messages',
        fStore.collection('messages').where('url', '==', vm.currentURL).orderBy('createTime')
      )
    })
  },
  updated () {
    const objDiv = document.getElementsByClassName('v-list')
    objDiv[0].scrollTop = objDiv[0].scrollHeight
  },
  methods: {
    getTime (firebaseTS) {
      let dateObj = new Date(firebaseTS.seconds * 1000) // date object
      let date = dateObj.toISOString().substring(0, 10)
      let hours = dateObj.getHours()
      let minutes = dateObj.getMinutes()
      let seconds = dateObj.getSeconds()
      let ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours > 0 ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds
      let strTime = `${date} ${hours}:${minutes}:${seconds} ${ampm}`
      return strTime
    },
    setUser (user) {
      this.user = user
      this.isLogin = true
    },
    cleanUser () {
      this.user = {}
      this.isLogin = false
    },
    addMessage: function (msg) {
      if (msg === '') return

      // Add message to firestore
      fStore.collection('messages')
        .add({
          'author': {
            'uid': this.user.uid,
            'name': this.user.displayName,
            'photoURL': this.user.photoURL,
            'email': this.user.email
          },
          'content': msg,
          'createTime': firebase.firestore.Timestamp.fromDate(new Date()),
          'url': this.currentURL
        })
        .then(() => {
          console.log('Message added.')
        })
        .catch(() => {
          console.log('Something error happened.')
        })
    }
  }
}
</script>
