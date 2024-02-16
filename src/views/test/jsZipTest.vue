<template>
  <div>
    <input type="file" ref="fileInput" multiple accept="image/*">
    <button style="background-color: #646cff" @click="compressAndDownload">压缩并上传</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import JSZip from 'jszip';
import axios from "axios";

const fileInput = ref<HTMLInputElement | null>(null);

const compressAndDownload = () => {
  const files = fileInput.value?.files;

  if (!files || files.length === 0) {
    alert('请先选择图片文件！');
    return;
  }

  const zip = new JSZip();
  const promises: Promise<void>[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    const promise = new Promise<void>((resolve, reject) => {
      reader.onload = (event) => {
        zip.file(file.name, event.target.result);
        resolve();
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });

    promises.push(promise);
  }

  Promise.all(promises)
      .then(() => {
      //   zip.generateAsync({ type: 'blob' })
      //       .then((content) => {
      //         const blob = new Blob([content]);
      //         const link = document.createElement('a');
      //         link.href = window.URL.createObjectURL(blob);
      //         link.download = 'compressed_files.zip';
      //         link.click();
      //       })
      //       .catch((error) => {
      //         console.error('压缩失败：', error);
      //       });
      // })
      // .catch((error) => {
      //   console.error('文件读取失败：', error);
      // });
        zip.generateAsync({ type: 'blob' })
            .then(content => {
              const formData = new FormData();
              formData.append('file', content, 'compressed_files.zip');

              axios.post('http://localhost:8080/api/media/upload_zip', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwicm9sZV9tYXAiOnsiNyI6IlJPTEVfR1JPVVBfQURNSU4iLCJzeXMiOiJST0xFX0FETUlOIn0sInJvbGVfbGlzdCI6WyJzeXM9c3lzOnVzZXJfbWFuYWdlciIsInN5cz1zeXM6cm9sZV9tYW5hZ2VyIiwic3lzPXN5czptb25pdG9yIiwic3lzPVJPTEVfQURNSU4iLCI3PVJPTEVfR1JPVVBfQURNSU4iXSwiaXNzIjoiZWNoaXNhbiIsImV4cCI6MTcwODcwMDg1MiwiaWF0IjoxNzA4MDk2MDUyfQ.uRieZ9zQO1FCjMAPq21-CDeJy8oGjemA3X9gZV1klMB0cFc2z3vDRRHzduPLfpuwYDOXhqKYB1pqgJqBs1li3g'
                }
              })
                  .then(response => {
                    console.log('上传成功！服务器响应：', response.data);
                  })
                  .catch(error => {
                    console.error('上传失败：', error);
                  });
            })
            .catch(error => {
              console.error('压缩失败：', error);
            });
      })
      .catch(error => {
        console.error('文件读取失败：', error);
      });
};
</script>

<style scoped>
/* Add your component's style here */
</style>
