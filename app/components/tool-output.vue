<script setup>
import { ref } from 'vue'

const props = defineProps({
  outputValue: String,
  multiline: {
    type: Boolean,
    default: false,
    required: false
  },
  minRows: {
    type: Number,
    default: 3,
    required: false
  }
})

const isCopied = ref(false);

const copy = () => {
  if (props.outputValue) {
    navigator.clipboard.writeText(props.outputValue).then(() => {
      isCopied.value = true;
      setTimeout(() => isCopied.value = false, 500);
    });
  }  
}
</script>

<template>
  <div v-if="multiline">
    <textarea class="form-control" aria-label="Multiline input" :rows="minRows" :value="outputValue"></textarea>
  </div>
  <div v-else class="input-group">
    <input type="text" class="text-black form-control border border-secondary" readonly :value="outputValue" :title="outputValue" />
    <button v-if="isCopied" class="btn btn-secondary">Copied</button>
    <button v-else class="btn btn-secondary" @click="copy">Copy</button>
  </div>
</template>