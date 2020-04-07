# vue-advanced-search


## Features:
* Autocomplete search
* Single select
* Multiple select

## Install & basic usage

```bash
npm install vue-advanced-search

Add the css into your project 
<style src="vue-advanced-search/dist/AdvancedSearch.css"></style>
```

### Example 1: Autocomplete search
```vue
<template>
  <div>
    <advanced-search
      v-model="model"
      :options="options"
    >
    </advanced-search>
  </div>
</template>

<script>
  import Advanced-Search from 'vue-advanced-search'
  export default {
    components: { AdvancedSearch },
    data () {
      return {
        model: null,
        options: [
            { label: 'label1', value: 'value1' },
            { label: 'label2', value: 'value2' }
        ]
      }
    }
  }
</script>
<style src="vue-advanced-search/dist/AdvancedSearch.css"></style>
```

### Example 2: Multiple select with search
```vue
<template>
  <div>
    <advanced-search
      v-model="model"
      :options="options"
      select
      multiple
    >
    </advanced-search>
  </div>
</template>

<script>
  import Advanced-Search from 'vue-advanced-search'
  export default {
    components: { AdvancedSearch },
    data () {
      return {
        model: null,
        options: [
            { label: 'label1', value: 'value1' },
            { label: 'label2', value: 'value2' },
            { label: 'label3', value: 'value3' }
        ]
      }
    }
  }
</script>
<style src="vue-advanced-search/dist/AdvancedSearch.css"></style>
```

# Props

| prop             | type               | default                | description                                                                                                                                                                                              |
|------------------|--------------------|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| value            | String/Integer/Array/Object    | ''                     | The selected value(s)
| options          | Array                          | []                     | Array of available options: If array of objects, label will be option.label
| placeholder      | String                         | 'Search'               | The placeholder attribute
| selectMode       | Boolean                        | false                  | Enables input select
| multiple         | Boolean                        | false                  | Enable multiple select


# Events

| event           | attributes                                                        | description                                       |
|-----------------|----------------------------------------------------------------------------|---------------------------------------------------|
| input           | (value)                                                 | triggers for any change to 'this.value'
| select          | (value)                                                 | triggers after selecting an option

# Slots


| slot       | description                                                                     |
|------------|---------------------------------------------------------------------------------|
| input      | Slot for the input                                               
| label      | Slot for the label displayed                                                                         
| option     | Slot for custom option                                                                           


## Contributing

``` bash

npm run serve
