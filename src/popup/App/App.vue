<template>
  <div class="main_app">
    <msgList />
  </div>
</template>

<script>
import msgList from '../Components/MessageList'

export default {
  name: 'app',
  components: {
    msgList
  }
}
</script>

<style>
  .main_app {
    width: 500px;
  }
</style>
