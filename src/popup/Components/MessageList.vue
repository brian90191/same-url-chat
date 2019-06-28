<template>
<div>
  <v-layout justify-center>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="teal lighten-2" dark>
          <v-toolbar-title>Hello {{ user }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn dark icon>
            <v-icon>add</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <!-- {{ messages }} -->

        <v-list two-line style="height: 450px; padding:0;" class="scroll-y">

          <template v-for="(msg, index) in messages">
            <v-list-tile :key="msg.title" avatar ripple @click=""
              :style="{ 'background-color': msg.author === user ? '#f4faea': 'white'  }">
              <v-list-tile-avatar>
                <v-avatar :color="getAvatarColor(msg.author).color" size="40">
                  <span class="white--text headline">{{ getAvatarColor(msg.author).letter }}</span>
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ msg.author }}</v-list-tile-title>
                <v-list-tile-sub-title v-html="msg.content"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ msg.timeStamp }}</v-list-tile-action-text>
                <v-icon v-show="msg.author === user" color="grey lighten-1">edit</v-icon>
              </v-list-tile-action>
            </v-list-tile>

            <v-divider :key="index"></v-divider>

          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  <msgInput :user="user" @submit="addMessage" />
</div>
</template>

<script>
import msgInput from '../Components/MessageInput'

// import { db } from '../../db'

export default {
  props: ['user'],
  components: {
    msgInput
  },
  data() {
    return {
      // messages: {},
      messages: [
        {
          author: 'Brian',
          timeStamp: '15 min',
          content: "<span class='text--primary'>Spike Lee</span> &mdash; I'll be in your neighborhood"
        },
        {
          author: 'Brian',
          timeStamp: '15 min',
          content: "<span class='text--primary'>to Operations support</span> &mdash; Wish I could come."
        },
        {
          author: 'Brian',
          timeStamp: '15 min',
          content: "<span class='text--primary'>Bella</span> &mdash; Do you have Paris recommendations"
        },
        {
          author: '布萊恩',
          timeStamp: '15 min',
          content: "<span class='text--primary'>LaToya</span> &mdash; Do you want to hang out?"
        },
        {
          author: 'Charlie',
          timeStamp: '15 min',
          content: "<span class='text--primary'>Nancy</span> &mdash; Do you see what time it is?"
        },
        {
          author: 'peng',
          timeStamp: '15 min',
          content: "<span class='text--primary'>LaToya</span> &mdash; Do you want to hang out?"
        },
        {
          author: 'YYY',
          timeStamp: '15 min',
          content: "<span class='text--primary'>cc: Daniel</span> &mdash; Tell me more..."
        },
        {
          author: 'Brian',
          timeStamp: '15 min',
          content: "<span class='text--primary'>Nancy</span> &mdash; Do you see what time it is?"
        }
      ],
      letter_colors: [{
          letter: 'A',
          color: '#E52032'
        },
        {
          letter: 'B',
          color: '#1A95B6'
        },
        {
          letter: 'C',
          color: '#C01E38'
        },
        {
          letter: 'D',
          color: '#F0DE84'
        },
        {
          letter: 'E',
          color: '#58BF76'
        },
        {
          letter: 'F',
          color: '#7E1A15'
        },
        {
          letter: 'G',
          color: '#E29D27'
        },
        {
          letter: 'H',
          color: '#5254A1'
        },
        {
          letter: 'I',
          color: '#09436E'
        },
        {
          letter: 'J',
          color: '#FFFFFF'
        },
        {
          letter: 'K',
          color: '#49BA48'
        },
        {
          letter: 'L',
          color: '#A67FBA'
        },
        {
          letter: 'M',
          color: '#B84EA4'
        },
        {
          letter: 'N',
          color: '#FFFFFB'
        },
        {
          letter: 'O',
          color: '#FAFAFE'
        },
        {
          letter: 'P',
          color: '#FABECE'
        },
        {
          letter: 'Q',
          color: '#6F6960'
        },
        {
          letter: 'R',
          color: '#32C1C5'
        },
        {
          letter: 'S',
          color: '#FA8572'
        },
        {
          letter: 'T',
          color: '#D1B38F'
        },
        {
          letter: 'U',
          color: '#2C2E82'
        },
        {
          letter: 'V',
          color: '#72529E'
        },
        {
          letter: 'W',
          color: '#7251A2'
        },
        {
          letter: 'X',
          color: '#E9E91E'
        },
        {
          letter: 'Y',
          color: '#F5EB13'
        },
        {
          letter: 'Z',
          color: '#50622B'
        }
      ]
    }
  },
  // firebase: {
  //   messages: {
  //     source: db.ref('Messages'),
  //     // Optional, allows you to handle any errors.
  //     cancelCallback(err) {
  //       console.error(err);
  //     }
  //   }
  // },
  mounted: function() {
    const objDiv = document.getElementsByClassName("v-list");
    objDiv[0].scrollTop = objDiv[0].scrollHeight;
  },
  updated() {
    const objDiv = document.getElementsByClassName("v-list");
    objDiv[0].scrollTop = objDiv[0].scrollHeight;
  },
  methods: {
    getAvatarColor: function (name) {
      const firstLetter = name.charAt(0).toUpperCase();
      const match = this.letter_colors.filter(item => item.letter === firstLetter);

      if (match.length > 0) {
        return match[0];
      } else {
        return {
          letter: firstLetter,
          color: "#484848"
        }
      }
    },
    getTime() {
      let now = new Date();
      let date = now.toISOString().substring(0, 10);
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      seconds = seconds < 10 ? '0'+seconds : seconds;
      let strTime = `${date} ${hours}:${minutes}:${seconds} ${ampm}`;
      return strTime;

      //  return new Date().toLocaleString();
    },
    addMessage: function (msg) {
      if (msg === '') return;
      this.messages.push({
        author: this.user,
        timeStamp: this.getTime(),
        content: msg
      });
    }

  }
}
</script>