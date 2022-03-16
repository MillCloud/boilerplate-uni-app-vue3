<template>
  <view class="container items-center justify-center">
    <image
      class="m-4 mx-auto block h-20 w-20"
      src="/static/logo.png"
    />
    <view class="flex justify-center">
      <text class="text-xl">{{ title }}</text>
    </view>
    <view class="flex justify-between">
      <button
        class="m-4 rounded border border-solid border-gray-300 bg-gray-100 px-4 transition"
        hover-class="bg-primary border-primary text-white"
      >
        Default Button
      </button>
      <button
        class="m-4 rounded border border-solid border-primary bg-primary px-4 text-white transition"
        hover-class="bg-primary-darken-1 border-primary-darken-1"
      >
        Primary Button
      </button>
    </view>
  </view>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue';

const title = ref('Hello UniApp');
</script>
