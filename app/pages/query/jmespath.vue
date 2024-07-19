<script setup lang="ts">
import { ref } from 'vue'
import jmespath from 'jmespath'

const title = 'JMESPath';

const inputJson = ref('');
const outputJson = ref('');
const expression = ref('');

const run = () => {
  if (inputJson.value && expression.value) {
    const inputJsonObject = JSON.parse(inputJson.value);
    outputJson.value = jmespath.search(inputJsonObject, expression.value);
  }
}
</script>

<template>
  <ToolContainer>
    <PageHeader :title="title" />
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <ToolInput v-model:input-value="inputJson" :multiline="true"/>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-auto">
          <label for="expression" class="col-form-label">Expression</label>
        </div>
        <div class="col">
          <input type="text" id="expression" class="form-control" aria-describedby="expression" v-model="expression"/>
        </div>
      </div>
      <div class="row mt-3">
        <div class="d-grid col">
          <button class="btn btn-primary" @click="run">Run</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <ToolOutput :output-value="outputJson" :multiline="true"/>
        </div>
      </div>
    </div>
  </ToolContainer>
</template>