<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Page } from '@vben/common-ui';

import {
  ElButton,
  ElTable,
  ElPagination
} from 'element-plus';

import '@vueup/vue-quill/dist/vue-quill.snow.css'

const router = useRouter();

const tableData = ref([]);
const totalCnt = ref(0);
const pageNum = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);
const getNews = async() => {
  axios.get("https://cardsclub.cn:9443/adm/cardboxgroup?pageNum="+currentPage.value)
    .then(res => {
      console.log(res);
      tableData.value = res.data.data; 
      totalCnt.value = res.data.totalCnt;
      pageNum.value = res.data.pageNum;
    })
    .catch(err => {
      console.log(err);
    })

}
getNews()


//const tableData = [
//  { prop1: '1', prop2: 'A' },
//  { prop1: '2', prop2: 'B' },
//  { prop1: '3', prop2: 'C' },
//  { prop1: '4', prop2: 'D' },
//  { prop1: '5', prop2: 'E' },
//  { prop1: '6', prop2: 'F' },
//];


function editNews(x:any) {
  router.push("/news/editor?id="+x)  
}

function deleteNews(x:any) {
  axios.delete('https://cardsclub.cn:9443/adm/cardboxgroup?id='+x)
  .then(res => {
    console.log(res)
    tableData.value = tableData.value.filter((y) => y['id'] != x)
  })
  .catch(err => {
    console.log(err)
  })
}

function pageChange() {
  var x = currentPage.value || 1;
  axios.get("https://cardsclub.cn:9443/adm/cardboxgroup?pageNum="+x)
    .then(res => {
      console.log(res);
      console.log(currentPage.value);
      tableData.value = res.data.data; 
      //totalCnt.value = res.data.totalCnt;
      //pageNum.value = res.data.pageNum;
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
    <ElTable :data="tableData" stripe>
      <ElTable.TableColumn label="" prop="id" />
      <ElTable.TableColumn label="系列名" prop="title" />
      <ElTable.TableColumn label="标签" prop="tag" />
      <ElTable.TableColumn label="操作" prop="id">
        <template #default="scope">
          <!-- <ElButton type="primary" @click="editNews(scope.row.id)">编辑</ElButton> -->
          <ElButton type="danger" @click="deleteNews(scope.row.id)">删除</ElButton>
        </template>
      </ElTable.TableColumn>
    </ElTable> 
    <ElPagination
      v-model:current-page="currentPage"
      layout="prev, pager, next"
      v-model:total="totalCnt"
      v-model:page-size="pageSize"
      @current-change="pageChange" />
  </Page>
</template>
