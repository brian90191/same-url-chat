<template>
  <v-form @submit.prevent="sendMessage">
    <v-flex xs12 sm6>
      <v-text-field
        v-model.trim="message"
        box
        label="Write a message"
        hide-details
        append-icon="send"
        @click:append="sendMessage"
        >
      </v-text-field>
    </v-flex>
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage: function () {
      this.$emit('submit', this.message);
      this.message = '';
    }
  }
}
</script>
