<script setup lang="ts">
const title = 'String token';

const tokens = [
  {
    text: 'Letter',
    value: 'letter',
    ref: ref(false)
  },
  {
    text: 'Word',
    value: 'word',
    ref: ref(false)
  },
  {
    text: 'Line',
    value: 'line',
    ref: ref(false)
  },
  // {
  //   text: 'Regex',
  //   value: 'regex',
  //   ref: ref(false),
  //   inputRef: ref('')
  // }
]

const pickedToken = ref(tokens[0].value);

const inputString = ref('');
const outputString = ref('0');

const letterPattern = /([a-zA-Z])/g
const wordPattern = /(?:^\w|[A-Z]|\b\w)/g

const count = () => {
  if (inputString.value) {
    let outputValue = '0';

    const tokenIndex = tokens.findIndex(t => t.value == pickedToken.value);
    switch(tokenIndex) {
      case 0:
        outputValue = inputString.value.match(letterPattern)?.length.toString() || outputValue;
        break;
      case 1:
        outputValue = inputString.value.match(wordPattern)?.length.toString() || outputValue;
        break;
      case 2:
        outputValue = inputString.value.split('\n').length.toString();
        break;
      default:
        break;
    }
    outputString.value = outputValue;
  }
}

</script>

<template>
  <ToolContainer>
    <PageHeader :title="title" />
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <ToolInput v-model:input-value="inputString" :multiline="true"/>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col px-3">
          <label><em>Tokens:</em></label>
        </div>
      </div>
      <div class="row mt-1" v-for="token in tokens">
        <div class="col-auto">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="tokens" 
              :id="token.value" 
              :value="token.value" 
              v-model="pickedToken">
            <label class="form-check-label" :for="token.value">
              {{ token.text }}
            </label>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="d-grid col">
          <button class="btn btn-primary" @click="count">Count</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <ToolOutput :output-value="outputString" />
        </div>
      </div>
    </div>
  </ToolContainer>
</template>