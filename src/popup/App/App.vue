<template>
  <div class="main_app">
    <msgList :user="user" />
  </div>
</template>

<script>
import msgList from '../Components/MessageList'

export default {
  name: 'app',
  components: {
    msgList
  },
  data () {
    return {
      user: 'Brian'
    }
  }
}
</script>

<style>
  .main_app {
    width: 500px;
  }
</style>
