<template>
  <router-view v-if="show" />
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      show: true
    }
  },

  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload () {
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style lang="less">
</style>
