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
      }
    },
    data () {
      return {
        clickedOutside: true,
        active: -1,
        model: ''
      }
    },
    mounted () {
      window.addEventListener('click', this.onClickOutside)
      this.model = this.getValues()
    },
    computed: {
      autoCompleteOptions () {
        if (!this.model) return
        return this.options.map(v => {
          if (v.label.indexOf(this.model) !== -1) return v
        }).filter(v=> v)
      }
    },
    methods: {
      onClickOutside ($event) {
        this.clickedOutside = true
        this.active = -1
        $event.stopPropagation()
      },
      onFocus () {
        this.clickedOutside = false
        this.active = 0
      },
      setActiveClass (index) {
        if (this.active === index) return 'active'
        return ''
      },
      onClick (index) {
        this.$emit('input', this.autoCompleteOptions[index].value)
      },
      onKeyPressed (event) {
          // Enter
        if (event.keyCode === 13) {
            this.clickedOutside = true
            let option = this.autoCompleteOptions[this.active] || ''
            this.$emit('input', option.value)
            return
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
      getValues () {
        // if (this.multiple && Array.isArray(this.value)) {
        //   return this.value.map((value) => {
        //     const option = this.options.find((option) => option.value === value)
        //     if (!option) return ''
        //     return option.label
        //   })
        // }
        const active = this.options.find((option) => option.value === this.value)
        if (active) return active.label
        return ''
      }
    },
    destroyed () {
      window.removeEventListener('click', this.onClickOutside)
    },
    watch: {
      value () {
        this.model = this.getValues()
      }
    }
}