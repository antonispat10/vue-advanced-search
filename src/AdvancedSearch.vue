<template lang="pug">
  .advanced-search-input(@keyup="onKeyPressed")
    .advanced-input-container
      .advanced-input-section
        .label(v-if="!enableInput" @click="onLabelClick")
          slot(name="label")
            span(v-if="labels.length > 1") {{ labels.length }} options selected 
            span(v-else) {{ displayLabels || this.placeholder }}
        slot(name="input")    
          input.advanced-input(
            ref="advancedInput"
            @click="onInputClick"
            @focus="onFocus"
            type="text"
            v-model="search"
            :placeholder="placeholder"
          )
    .search(v-if="!clickedOutside")
      .options(:class="{ 'available-options': autoCompleteOptions, 'empty-results': !autoCompleteOptions.length }")
        .row(
          v-for="(option, index) in autoCompleteOptions"
          @mouseover="active = index"
          @click="onOptionClick($event, index)"
          :class="setActiveClass(index, option)")
          slot(name="option")
            .option
              .title {{ option.label }}
</template>

<script src="./AdvancedSearch.js"></script>

<style lang="less">
  @import './AdvancedSearch.less';
</style>
