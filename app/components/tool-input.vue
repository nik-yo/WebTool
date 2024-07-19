<script setup>
import { ref } from 'vue'

const props = defineProps({
  inputValue: String,
  enablePaste: {
    type: Boolean,
    default: false,
    required: false
  },
  multiline: {
    type: Boolean,
    default: false,
    required: false
  },
  minRows: {
    type: Number,
    default: 3,
    required: false
  },
  handleKeyup: {
    type: Function,
    required: false
  }
})

//https://vuejs.org/guide/components/v-model.html#v-model-arguments
const emit = defineEmits(['update:inputValue']);

const inputRef = ref(props.inputValue);
const isPasted = ref(false);

const paste = () => {
  navigator.clipboard
    .readText()
    .then(
      (value) => {
        inputRef.value = value;
        isPasted.value = true;
        setTimeout(() => isPasted.value = false, 500);
      })  
}

const handleChange = (event) => {
  if (event.target.value) {
    emit('update:inputValue', event.target.value);
  }  
} 
</script>

<template>
  <div v-if="multiline && enablePaste" class="input-group">
    <textarea class="form-control" aria-label="Multiline input" :rows="minRows" v-model="inputRef" @change="handleChange" @keyup="props.handleKeyup"></textarea>
    <button v-if="isPasted" class="btn btn-secondary">Pasted</button>
    <button v-else class="btn btn-secondary" @click="paste">Paste</button>
  </div>
  <div v-else-if="multiline">
    <textarea class="form-control" aria-label="Multiline input" :rows="minRows" v-model="inputRef" @change="handleChange" @keyup="props.handleKeyup"></textarea>
  </div>
  <div v-else-if="enablePaste" class="input-group">
    <input type="text" class="text-black form-control border border-secondary" v-model="inputRef" :title="inputRef" @change="handleChange" @keyup="props.handleKeyup"/>
    <button v-if="isPasted" class="btn btn-secondary">Pasted</button>
    <button v-else class="btn btn-secondary" @click="paste">Paste</button>
  </div>
  <div v-else>
    <input type="text" class="text-black form-control border border-secondary" v-model="inputRef" :title="inputRef" @change="handleChange" @keyup="props.handleKeyup"/>
  </div>
</template>