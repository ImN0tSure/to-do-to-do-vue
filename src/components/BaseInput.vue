<script setup>
import {defineProps, computed, defineEmits} from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    default: 'name'
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default:
        'Здесь могла быть ваша реклама.'
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})

const emit =defineEmits(['update:modelValue'])

const inputValueChange = (value, name) => {
  emit('update:modelValue', value, name)
}


</script>

<template>
  <div class="input-wrap">
    <input
        class="base-input"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="isDisabled"
        :id="name"
        @input="inputValueChange($event.target.value, name)"
    />
  </div>

</template>

<style scoped>
.base-input {
  width: 100%;
  padding: 16px;
  font-size: 1.1em;
  border: 2px solid #f06292;
  border-radius: 30px;
  color: #4b2c42;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(240, 98, 146, 0.3);
}
.input-wrap {
  margin-bottom: 20px;
}
</style>