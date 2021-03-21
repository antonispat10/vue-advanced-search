<template lang="pug">
  #app
    .examples
      .example.autocomplete-search
        .demo-title Autocomplete search
        advanced-search(
          v-model="value"
          :options="options"
        )
      .example.autocomplete-search
        .demo-title Autocomplete select search
        advanced-search(
          v-model="value"
          :options="options"
          selectMode
        )
      .example.multiple-select-with-search
        .demo-title Multiple select with search
        advanced-search(
          v-model="multipleValue"
          :options="options"
          selectMode
          multiple
        )  
</template>

<script>
import AdvancedSearch from './AdvancedSearch.vue'

export default {
    components: { AdvancedSearch },
    data () {
      return {
        value: 'Option1_value',
        multipleValue: '',
        options: [
          { label: 'option1', value: 'Option1_value'},
          { label: 'option2', value: 'Option2_value'},
          { label: 'option3', value: 'Option3_value'}
        ]
      }
    }
}
</script>

<style lang="less">
  .examples {
    display: flex;
    justify-content: center;
    .example {
      margin-right: 100px;
      .demo-title {
        margin-bottom: 10px;
        font-weight: 600;
        font-family: "Source Sans Pro";
      }
    }
  }
</style>
