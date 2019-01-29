<template>
  <mdb-container class="d-flex flex-row page" fluid>
    <div class="p-2">
      <mdb-select multiple selectAll @getValue="getSelectValue" :options="multiOptions" />
      <label>Example label</label>
    </div>
    <div class="p-2">
      <mdb-select color="primary" @getValue="getSelectValue" :options="colorOptions" />
      <label>Blue select</label>
    </div>
    <div class="p-2">
      <mdb-select @getValue="getSelectValue" :options="basicOptions" />
    </div>
  </mdb-container>
</template>

<script>
import { mdbSelect, mdbContainer, Btn, } from 'mdbvue'

export default {
  name: 'Selects',
  components: {
    mdbSelect,
		mdbContainer,
		Btn,
  },
  data() {
    return {
       basicOptions: [
        { text: 'Choose your option', value: null, disabled: true, selected: true },
        { text: 'Option nr 1', value: 'Option 1' },
        { text: 'Option nr 2', value: 'Option 2' },
        { text: 'Option nr 3', value: 'Option 3' },
      ],
      colorOptions: [
        { text: 'Option nr 1', value: 'Option 1', selected: true },
        { text: 'Option nr 2', value: 'Option 2' },
        { text: 'Option nr 3', value: 'Option 3' },
        { text: 'Option nr 4', value: 'Option 4' },
        { text: 'Option nr 5', value: 'Option 5' }
      ],
       multiOptions: [
        { text: 'Choose your options', value: null, disabled: true, selected: true },
        { text: 'Option nr 1', value: 'Option 1' },
        { text: 'Option nr 2', value: 'Option 2' },
        { text: 'Option nr 3', value: 'Option 3' },
        { text: 'Option nr 4', value: 'Option 4' },
        { text: 'Option nr 5', value: 'Option 5' },
      ],
    }
  },
  methods: {
    getSelectValue(value, text) {
      console.log(value)
    },
  }
}
</script>
<style scoped>
 .multi-wrapper {
  border-color: blue !important;
  border-width: 1px  !important;
}

.select-wrapper > input.select-dropdown {
    border-bottom: 3px solid #ced4da !important;
}

.active {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
