# vue2-advanced-search

Forked version [vue-advanced-search](https://github.com/antonispat10/vue-advanced-search) by [@darkfriend](https://darkfriend.ru)

## Features:
* Autocomplete search
* Single select
* Multiple select

## Install & basic usage

```bash
npm install vue2-advanced-search -S

Add the css into your project 
<style src="vue2-advanced-search/dist/AdvancedSearch.css"></style>
```

### Example 1: Autocomplete search
```vue
<template>
  <div>
    <advanced-search
      v-model="model"
      :options="options"
    />
  </div>
</template>

<script>
  import AdvancedSearch from 'vue2-advanced-search'
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
<style src="vue2-advanced-search/dist/AdvancedSearch.css"></style>
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
    />
  </div>
</template>

<script>
  import AdvancedSearch from 'vue2-advanced-search'
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
<style src="vue2-advanced-search/dist/AdvancedSearch.css"></style>
```

### Example 3: Autocomplete search (async component)
```vue
<template>
  <div>
    <advanced-search
      v-model="model"
      :options="options"
    />
  </div>
</template>

<script>
  export default {
    components: {
        AdvancedSearch: () => import('vue2-advanced-search'),
    },
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
<style src="vue2-advanced-search/dist/AdvancedSearch.css"></style>
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
