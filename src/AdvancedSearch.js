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
      select: {
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
      if (this.select && this.multiple) {
        if (this.value.length) this.values = [this.value]
        else this.values = []
      }
      else this.values = this.value
    },
    computed: {
      autoCompleteOptions () {
        return this.options.map(v => {
          if (v.label.indexOf(this.search) !== -1) return v
        }).filter(v => v)
      },
      selectedOptions () {
        let selected = []
        this.options.map((option) => {
          if (this.values.indexOf(option.value) !== -1) {
            selected.push(option.value)
          }
        })
        return selected
      },
      displayLabels () {
        if (Array.isArray(this.labels) && this.labels.length) {
          return this.labels.join(', ')
        }
        return ''
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
        this.clickedOutside = false
      },
      onClickOutside ($event) {
        this.clickedOutside = true
        this.active = -1
        this.enableInput = false
        this.$refs.advancedInput.style.display = 'none'
        $event.stopPropagation()
      },
      onFocus () {
        this.clickedOutside = false
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
        if (this.select) {
          if (this.multiple) {
            if (!Array.isArray(this.labels)) this.labels = []
            const label = this.getValues(this.autoCompleteOptions[index].value)
            const findIndex = this.values.indexOf(this.autoCompleteOptions[index].value)
            if (findIndex === -1) {
              this.labels.push(label)
              this.values.push(this.autoCompleteOptions[index].value)
            } else {
              this.values.splice(findIndex, 1)
              this.labels.splice(findIndex, 1)
            }
          }
        } else if (!this.select || (this.select && !this.multiple)) {
          const label = this.getValues(this.autoCompleteOptions[index].value)
          this.labels = [label]
          this.values = this.autoCompleteOptions[index].value
          this.clickedOutside = true
          this.enableInput = false
          this.$refs.advancedInput.style.display = 'none'
        }
        this.$emit('input', this.values)
      },
      onKeyPressed (event) {
        event.stopPropagation()
          // Enter
        if (event.keyCode === 13) {
          let option = this.autoCompleteOptions[this.active] || ''
          if (this.select) {
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
            
          } else if (!this.select || (this.select && !this.multiple)) {
            const label = this.getValues(option.value)
            this.labels = [label]
            this.values = option.value
            this.clickedOutside = true
            this.enableInput = false
            this.$refs.advancedInput.style.display = 'none'
          }
          this.$emit('input', this.values)
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
        if (!value) value = this.value
        if (this.select && this.multiple && Array.isArray(value)) {
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