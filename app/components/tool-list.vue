<script setup lang="ts">
import { inject } from 'vue'
import type { ToolCategory } from '~/models/tool-category';

const props = defineProps(['title'])

const toolkit = inject<ToolCategory[]>('toolkit');

const tools = toolkit?.filter((tk) => tk.title == props.title)[0].tools;
</script>


<template>
  <div class="container">
    <PageHeader :title="title" />
    <div class="text-center">
      <div class="row">
        <div class="col col-md-3" v-for="tool in tools">
          
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ tool.name }}</h5>
              <NuxtLink :to="tool.url" class="stretched-link"></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>