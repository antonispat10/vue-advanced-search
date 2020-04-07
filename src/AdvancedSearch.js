export default {
    props: {
      value: {
        type: [String, Array],
        default: () => [] || '',
        required: true
      },
      options: {
        type: Array,
        required: true
      },
      placeholder: {
        type: String,
        required: false,
        default: 'Search'
      },
      selectMode: {
        type: Boolean,
        required: false,
        default: false
      },
      multiple: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data () {
      return {
        clickedOutside: true,
        active: -1,
        labels: '',
        values: '',
        search: '',
        selected: [],
        enableInput: false
      }
    },
    mounted () {
      window.addEventListener('click', this.onClickOutside)
      this.labels = this.getValues()
      if (this.selectMode && this.multiple) {
        if (this.value.length) this.values = [this.value]
        else this.values = []
      }
      else this.values = this.value
    },
    computed: {
      autoCompleteOptions () {
        const options = this.options.map(v => {
          if (v.label.indexOf(this.search) !== -1) return v
        }).filter(v => v)
        if (!options.length) return [{ value: '', label: 'No available options'}]
        return options
      },
      selectedOptions () {
        let selected = []
        this.options.map((option) => {
          if (Array.isArray(this.values) && this.values.indexOf(option.value) !== -1) {
            selected.push(option.value)
          }
        })
        return selected
      },
      displayLabels () {
        if (Array.isArray(this.labels) && this.labels.length) {
          return this.labels.join(', ')
        }
        return this.search
      }
    },
    methods: {
      onInputClick ($event) {
       $event.stopPropagation()
       this.active = -1
      },
      onLabelClick ($event) {
        this.$nextTick(() => {
          this.$refs.advancedInput.style.display = 'block'
          this.$refs.advancedInput.focus()
        })
        $event.stopPropagation()
        this.enableInput = true
        // if (this.selectMode) this.clickedOutside = false
      },
      onClickOutside ($event) {
        this.clickedOutside = true
        this.active = -1
        this.enableInput = false
        this.$refs.advancedInput.style.display = 'none'
        $event.stopPropagation()
      },
      onFocus () {
        if (this.selectMode) this.clickedOutside = false
        if (!this.multiple) {
          if (this.labels.length) this.search = ''
          this.labels = ''
        }
      },
      setActiveClass (i, option) {
        let classList = []
        if (this.selectedOptions.indexOf(option.value) !== -1) {
          classList.push('selected')
        }
        if (this.active === i) classList.push('active')
        return classList.join(' ')
      },
      onOptionClick (event, index) {
        event.stopPropagation()
        if (this.selectMode) {
          if (this.multiple) {
            if (!Array.isArray(this.labels)) this.labels = []
            const label = this.getValues(this.autoCompleteOptions[index].value)
            const findIndex = this.values.indexOf(this.autoCompleteOptions[index].value)
            if (findIndex === -1) {
              console.log(2, findIndex)
              if (!this.autoCompleteOptions[index].value) return
              this.labels.push(label)
              this.values.push(this.autoCompleteOptions[index].value)
            } else {
              this.values.splice(findIndex, 1)
              this.labels.splice(findIndex, 1)
            }
          }
        } else if (!this.selectMode || (this.selectMode && !this.multiple)) {
          const label = this.getValues(this.autoCompleteOptions[index].value)
          this.labels = [label]
          this.values = this.autoCompleteOptions[index].value
          if (!this.values) return
          this.clickedOutside = true
          this.enableInput = false
          this.$refs.advancedInput.style.display = 'none'
        }
        this.$emit('select', this.values)
      },
      onKeyPressed (event) {
        event.stopPropagation()
        if (this.search) this.clickedOutside = false
          // Enter
        if (event.keyCode === 13) {
          let option = this.autoCompleteOptions[this.active] || ''
          if (!option.value) return
          if (this.selectMode) {
            if (this.multiple) {
              this.clickedOutside = false
              if (!Array.isArray(this.labels)) this.labels = []
              const label = this.getValues(option.value)
              const findIndex = this.values.indexOf(option.value)
              if (findIndex === -1) {
                this.labels.push(label)
                this.values.push(option.value)
              } else {
                this.values.splice(findIndex, 1)
                this.labels.splice(findIndex, 1)
              }
            }
            
          } else if (!this.selectMode || (this.selectMode && !this.multiple)) {
            const label = this.getValues(option.value)
            this.labels = label ? [label] : [this.search]
            this.values = option.value || this.search
            this.clickedOutside = true
            this.enableInput = false
            this.$refs.advancedInput.style.display = 'none'
          }
          console.log('sel', option.value, this.values, this.search)
          this.$emit('select', this.values)
        }
        // Down
        if (event.keyCode === 40) {
          this.active = this.active === (this.autoCompleteOptions.length - 1) ? 0 : this.active + 1
        }
        // Up
        if (event.keyCode === 38) {
          this.active = this.active === 0 ? this.autoCompleteOptions.length - 1 : this.active - 1
        }
        this.$emit('keyup', event)
      },
      getValues (value) {
        if (this.selectMode && this.multiple && Array.isArray(value)) {
          return value.map((val) => {
            const option = this.options.find((option) => option.value === val)
            if (!option) return ''
            return option.label
          })
        }
        const active = this.options.find((option) => option.value === value)
        if (active) return [active.label]
        return ''
      }
    },
    destroyed () {
      window.removeEventListener('click', this.onClickOutside)
    }
}