<template>
  <input type="file" @change="fil"/>
  <pre>{{exif}}</pre>
</template>

<script setup lang="ts">
import {ref} from "vue";
import exifr from "exifr";
import {formatDate} from "@/utils/dateTime/DateTimeUtil.ts";
import {getExif} from "@/utils/ExifUtil.ts";

const exif = ref();
const fil = (f)=>{
  let file = f.target.files[0];
  getExif(file).then(res=>{
    console.log(res)
  })
}
</script>

<style scoped>

</style>
