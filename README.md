# vue-advanced-search


## Features:
* Autocomplete search
* Single select
* Multiple select

## Install & basic usage

```bash
npm install vue-advanced-search
```

```vue
<template>
  <div>
    <advanced-search
      v-model="model"
      :options="options">
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
            { label: 'label1', value: 'value1' }
        ]
      }
    }
  }
</script>
```

# Props

| prop             | type               | default                | description                                                                                                                                                                                              |
|------------------|--------------------|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| value            | Object||Array||String||Integer |                        | The selected value(s)
| options          | Array                          | []                     | Array of available options: If array of objects, label will be option.label
| placeholder      | String | 'Search' || 'Select'                                | The placeholder attribute


# Events

| event           | attributes                                                        | description                                       |
|-----------------|----------------------------------------------------------------------------|---------------------------------------------------|
| input           | (value)                                                 | triggers for any change to 'this.value'

# Slots


| slot       | description                                                                     |
|------------|---------------------------------------------------------------------------------|
| option     | Slot for custom option                                                                           


## Contributing

``` bash
# run it at localhost:8080
npm run server
