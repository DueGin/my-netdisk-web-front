<template>
  <div id="upload-container">
    <span>点击或将文件拖拽至此上传</span>
  </div>
  <div id="upload-list">
  </div>
  <button id="picker" style="display: none;">点击上传文件</button>
</template>

<script setup>
import WebUploader from 'webuploader';
import $ from 'jquery'

$('#upload-container').click(function (event) {
  $("#picker").find('input').click();
});
var uploader = WebUploader.create({
  auto: true,// 选完文件后，是否自动上传。
  swf: 'Uploader.swf',// swf文件路径
  server: '/upload',// 文件接收服务端。
  dnd: '#upload-container',
  pick: '#picker',// 内部根据当前运行是创建，可能是input元素，也可能是flash. 这里是div的id
  multiple: true, // 选择多个
  chunked: true,// 开启分片上传。
  threads: 20, // 上传并发数。允许同时最大上传进程数。
  method: 'POST', // 文件上传方式，POST或者GET。
  fileSizeLimit: 1024 * 1024 * 1024 * 10, //验证文件总大小是否超出限制, 超出则不允许加入队列。
  fileSingleSizeLimit: 1024 * 1024 * 1024, //验证单个文件大小是否超出限制, 超出则不允许加入队列。
  fileVal: 'upload', // [默认值：'file'] 设置文件上传域的name。
});

uploader.on("beforeFileQueued", async function (file) {
  console.log(file); // 获取文件的后缀
  var fileName = file.name;
  var md5;
  await uploader.md5File(file)//大文件秒传
      // 及时显示进度
      .progress(function (percentage) {
        console.log('Percentage:', percentage);
      })
      // 完成
      .then(function (val) {
        console.log('md5 result:', val);
        md5 = val;
      });
  console.log(fileName);
  console.log(md5);
  send(fileName, md5);
});

function send(fileName, md5) {
  $.ajax({
    url: '/upload',
    method:'post',
    data: {
      "name": fileName,
      "md5": md5
    }
  });
}

uploader.on('fileQueued', function (file) {
  // 选中文件时要做的事情，比如在页面中显示选中的文件并添加到文件列表，获取文件的大小，文件类型等
  console.log(file.ext); // 获取文件的后缀
  console.log(file.size);// 获取文件的大小
  console.log(file.name);
  var html = '<div class="upload-item"><span>文件名：' + file.name + '</span><span data-file_id="' + file.id + '" class="btn-delete">删除</span><span data-file_id="' + file.id + '" class="btn-retry">重试</span><div class="percentage ' + file.id + '" style="width: 0%;"></div></div>';
  $('#upload-list').append(html);
  uploader.md5File(file)//大文件秒传

      // 及时显示进度
      .progress(function (percentage) {
        console.log('Percentage:', percentage);
      })

      // 完成
      .then(function (val) {
        console.log('md5 result:', val);
      });
});

uploader.on('uploadBeforeSend', async function (object, data) {
  console.log(object);
  console.log(data);
});

uploader.on('uploadProgress', function (file, percentage) {
  console.log(percentage * 100 + '%');
  var width = $('.upload-item').width();
  $('.' + file.id).width(width * percentage);
});

uploader.on('uploadSuccess', function (file, response) {
  console.log(file.id + "传输成功");
});

uploader.on('uploadError', function (file) {
  console.log(file);
  console.log(file.id + 'upload error')
});

$('#upload-list').on('click', '.upload-item .btn-delete', function () {
  // 从文件队列中删除某个文件id
  let file_id = $(this).data('file_id');
  // uploader.removeFile(file_id); // 标记文件状态为已取消
  uploader.removeFile(file_id, true); // 从queue中删除
  console.log(uploader.getFiles());
});

$('#upload-list').on('click', '.btn-retry', function () {
  uploader.retry($(this).data('file_id'));
});

uploader.on('uploadComplete', function (file) {
  console.log(uploader.getFiles());
});
</script>

<style scoped>
#upload-container, #upload-list {
  width: 500px;
  margin: 0 auto;
}

#upload-container {
  cursor: pointer;
  border-radius: 15px;
  background: #EEEFFF;
  height: 200px;
}

#upload-list {
  height: 800px;
  border: 1px solid #EEE;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px 20px;
}

#upload-container > span {
  windows: 100%;
  text-align: center;
  color: gray;
  display: block;
  padding-top: 15%;
}

.upload-item {
  margin-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px dashed gray;
}

.percentage {
  height: 5px;
  background: green;
}

.btn-delete, .btn-retry {
  cursor: pointer;
  color: gray;
}

.btn-delete:hover {
  color: orange;
}

.btn-retry:hover {
  color: green;
}

#down{
  margin: 20px 20px;
  font-size: 2em;
}
</style>
