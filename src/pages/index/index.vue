<template>
  <view class="center flex-col">
    <image class="my-20 mx-auto block h-20 w-20" src="/static/logo.png" />
    <view class="flex justify-center">
      <text class="text-xl">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const title = ref('Hello');
</script>
