<script lang="ts" setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import { Page } from '@vben/common-ui';
import { useRoute } from 'vue-router';

import {
  ElButton,
  ElCard,
  ElMessage,
  ElNotification,
  ElSegmented,
  ElSpace,
  ElTable,
  ElInput,
  ElForm,
  ElFormItem,
  ElMessageBox,
} from 'element-plus';
import type { Action } from 'element-plus'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import ImageUploader from 'quill-image-uploader'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const news = reactive({
  title: '',
  content: '',
  cover_img: '',
})

const router = useRoute()
const newsid = router.query.id;
const getNews = async() => {
  axios.get("https://cardsclub.cn:9443/adm/news?id="+newsid)
    .then(res => {
      console.log(res);
      news.title = res.data.news[0].title; 
      news.content = res.data.news[0].content;
      news.cover_img = '<image src="' + res.data.news[0].cover_img + '"></image>';
    })
    .catch(err => {
      console.log(err);
    })

}
if(newsid) { 
  getNews();
}

const modules = [{
        name: 'imageUploader',
        module: ImageUploader,
        options: {
          upload: (file: File) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("image", file);

              axios.post('https://cardsclub.cn:9443/adm/file/upload?t=news', formData)
              .then(res => {
                console.log(res)
                resolve(res.data.url);
              })
              .catch(err => {
                reject("Upload failed");
                console.log("Error:", err)
              })
            })
          }
        }
    },
  ]


function submit() {
  var url = 'https://cardsclub.cn:9443/adm/news'
  if(newsid) {
    url += "?id=" + newsid;
  }
  axios.post(url, news)
  .then(res => {
    console.log(res)
    ElMessageBox.alert('This is a message', 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    callback: (action: Action) => {
    },
  })
  })
  .catch(err => {
    console.log(err)
  })
}

</script>

<template>
  <Page
    description=""
    title="新闻编辑器"
  >
  <!--
    <div class="flex flex-wrap gap-5">
      <ElCard class="mb-5 w-auto">
        <template #header> 按钮 </template>
        <ElSpace>
          <ElButton text>Text</ElButton>
          <ElButton>Default</ElButton>
          <ElButton type="primary"> Primary </ElButton>
          <ElButton type="info"> Info </ElButton>
          <ElButton type="success"> Success </ElButton>
          <ElButton type="warning"> Warning </ElButton>
          <ElButton type="danger"> Error </ElButton>
        </ElSpace>
      </ElCard>
      <ElCard class="mb-5 w-80">
        <template #header> Message </template>
        <ElSpace>
          <ElButton type="info" @click="info"> 信息 </ElButton>
          <ElButton type="danger" @click="error"> 错误 </ElButton>
          <ElButton type="warning" @click="warning"> 警告 </ElButton>
          <ElButton type="success" @click="success"> 成功 </ElButton>
        </ElSpace>
      </ElCard>
      <ElCard class="mb-5 w-80">
        <template #header> Notification </template>
        <ElSpace>
          <ElButton type="info" @click="notify('info')"> 信息 </ElButton>
          <ElButton type="danger" @click="notify('error')"> 错误 </ElButton>
          <ElButton type="warning" @click="notify('warning')"> 警告 </ElButton>
          <ElButton type="success" @click="notify('success')"> 成功 </ElButton>
        </ElSpace>
      </ElCard>
      <ElCard class="mb-5 w-auto">
        <template #header> Segmented </template>
        <ElSegmented
          v-model="segmentedValue"
          :options="segmentedOptions"
          size="large"
        />
      </ElCard>
      <ElCard class="mb-5 w-80">
        <template #header> V-Loading </template>
        <div class="flex size-72 items-center justify-center" v-loading="true">
          一些演示的内容
        </div>
      </ElCard>
      <ElCard class="mb-5 w-80">
        <ElTable :data="tableData" stripe>
          <ElTable.TableColumn label="测试列1" prop="prop1" />
          <ElTable.TableColumn label="测试列2" prop="prop2" />
        </ElTable>
      </ElCard>
    </div>
    -->
    <ElForm :model="form" label-width="auto">
    <ElFormItem label="标题">
      <ElInput v-model="news.title" style="width: 600px" placeholder="请输入标题" />
    </ElFormItem>
    <ElFormItem  label="封面图"> </ElFormItem>
    <QuillEditor v-model:content="news.cover_img" :modules="modules" toolbar="full" theme="snow" style="min-height: 300px;" content-type="html"/>
    <ElFormItem label="内容"> </ElFormItem>
    <QuillEditor v-model:content="news.content" toolbar="full" theme="snow" style="min-height: 300px;" content-type="html"/>
    </ElForm>
    <ElButton type="primary" @click="submit"> 提交 </ElButton>
  </Page>
</template>
