<script setup lang="ts">
import { inject } from 'vue'
import { ref } from 'vue'
import { uuid } from 'vue-uuid'
import { generateString, generateStringOptions } from '@/actions/generate-string'
import { letterCases, delimiterCases, convertLettercase } from '@/actions/convert-lettercase'

const input = ref('');
const output = ref('');
const action = ref('');

const actions = [
  {
    label: "Base64 Encode",
    value: "base64_encode"
  },
  {
    label: "Base64 Decode",
    value: "base64_decode"
  },
  {
    label: "Convert Letter Cases",
    value: "convert_letter_cases"
  },
  {
    label: "Generate String",
    value: "gen_string"
  },
  {
    label: "Generate UUID",
    value: "gen_uuid"
  },
  {
    label: "URL Encode",
    value: "url_encode"
  },
  {
    label: "URL Decode",
    value: "url_decode"
  }
]

const stringLength = ref(20);
const pickedGenStringOptions = ref<string[]>(generateStringOptions.slice(0,3).map(o => o.value));

const pickedLetterCase = ref(letterCases[0]);
const pickedDelimiterCase = ref (delimiterCases[0]);

const runAction = () => {
  switch(action.value) {
    case "base64_encode":
      output.value = btoa(input.value);
      break;
    case "base64_decode":
      output.value = atob(input.value);
      break;
    case "convert_letter_cases":
      output.value = convertLettercase(input.value, pickedLetterCase.value, pickedDelimiterCase.value);
      break;
    case "gen_string":
      output.value = generateString(stringLength.value, pickedGenStringOptions.value);
      break;
    case "gen_uuid":
      output.value = uuid.v4();
      break;
    case "url_encode":
      output.value = encodeURIComponent(input.value);
      break;
    case "url_decode":
      output.value = decodeURIComponent(input.value);
      break;
    default:
      break;
  }
}

const handleKeyup = (event: KeyboardEvent) => {
  if (event.key == "Enter" && action.value) {
    runAction();
  }
}
// const toolkit = inject<{
//   title: string;
//     url: string;
//     tools: {
//         name: string;
//         url: string;
//     }[];
// }[]>('toolkit');
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12 col-md-4">
        <div v-if="!action.startsWith('gen_')">
          <div class="p-2">
            <label><em>Input:</em></label>
          </div>        
          <ToolInput v-model:input-value="input" :handle-keyup="handleKeyup"/>
        </div>
      </div>
      <div class="col-sm-12 col-md-4">
        <div class="p-2">
          <label><em>Action:</em></label>
        </div>
        <div class="row">
          <div class="col">
            <select class="form-select" aria-label="Select action" v-model="action">
              <option v-for="action in actions" :value="action.value">
              {{ action.label }}
              </option>
            </select>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary" @click="runAction">Run</button>
          </div>
        </div>
        <div class="row mt-3" v-if="action == 'gen_string'">
          <div class="col">
            
            <div class="row mt-3">
              <div class="col-auto">
                <label for="length" class="col-form-label">Length</label>
              </div>
              <div class="col-4">
                <input type="number" id="length" class="form-control" aria-describedby="length" v-model="stringLength"/>
              </div>
            </div>

            <div class="row row-cols-1 row-cols-xl-2 mt-3">          
              <div class="col" v-for="option in generateStringOptions">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" :value="option.value" :id="option.value" v-model="pickedGenStringOptions">
                  <label class="form-check-label" :for="option.value">
                    {{ option.text }}
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="row mt-3" v-if="action == 'convert_letter_cases'">
          <div class="col">

            <div class="row text-start mt-3">
              <div class="col px-3">
                <label><em>Letter:</em></label>
              </div>
            </div>
            <div class="row row-cols-2 text-start mt-1">
              <div class="col" v-for="lettercase in letterCases">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="lettercase" 
                    :id="lettercase" 
                    :value="lettercase" 
                    v-model="pickedLetterCase">
                  <label class="form-check-label" :for="lettercase">
                    {{ lettercase }}
                  </label>
                </div>
              </div>
            </div>
            <div class="row text-start mt-3">
              <div class="col px-3">
                <label><em>Delimiter:</em></label>
              </div>
            </div>
            <div class="row row-cols-2 text-start mt-1">
              <div class="col" v-for="delimitercase in delimiterCases">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="delimitercase" 
                    :id="delimitercase" 
                    :value="delimitercase" 
                    v-model="pickedDelimiterCase">
                  <label class="form-check-label" :for="delimitercase">
                    {{ delimitercase }}
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-4">
        <div class="p-2">
          <label><em>Output:</em></label>
        </div>
        <ToolOutput :output-value="output"/>
      </div>
    </div>
  </div>
</template>


