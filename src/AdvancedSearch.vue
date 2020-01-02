<template lang="pug">
  .advanced-search-input(@keyup="onKeyPressed")
    .advanced-input-container
      .advanced-input-section
        input.advanced-input(
          @click="$event.stopPropagation()"
          @focus="onFocus"
          type="text"
          v-model="model"
          :placeholder="placeholder"
        )
    .search(v-if="!clickedOutside")
      .options(:class="{ 'available-options': autoCompleteOptions }")
        .row(
          v-for="(option, index) in autoCompleteOptions"
          @mouseover="active = index"
          @click="onClick(index)"
          :class="setActiveClass(index)")
          slot(name="option")
            .option
              .title {{ option.label }}
</template>

<script src="./AdvancedSearch.js"></script>

<style lang="less">
  @import './AdvancedSearch.less';
</style>
