<template lang="pug">
  #app
    advanced-search(
      v-model="value"
      :options="options"
    )
</template>

<script>
import AdvancedSearch from './AdvancedSearch.vue'

export default {
    components: { AdvancedSearch },
    data () {
      return {
        value: 'Option1_value',
        options: [
          { label: 'option1', value: 'Option1_value'},
          { label: 'option2', value: 'Option2_value'}
        ]
      }
    }
}
</script>

<style lang="less">
  
</style>
