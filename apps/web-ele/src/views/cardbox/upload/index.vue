<script setup lang="ts">
import { ref } from 'vue'
import { genFileId, ElUpload, ElButton, ElMessage } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile, UploadFile } from 'element-plus'

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

// 处理上传错误
const handleError: UploadProps['onError'] = (error: Error, uploadFile: UploadFile) => {
  console.error('上传错误:', error)
  console.error('上传文件:', uploadFile)
  ElMessage.error(`文件上传失败: ${error.message || '未知错误'}`)
}

// 处理上传成功
const handleSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFile[]) => {
  console.log('上传成功:', response)
  console.log('上传的文件:', uploadFile)
  
  // 检查服务器返回的状态码
  if (response?.code !== 0 && response?.code !== 200) {
    // 服务器返回错误
    const errorMessage = response?.message || response?.error || '上传失败'
    ElMessage.error(errorMessage)
    return
  }
  
  ElMessage.success('文件上传成功')
}

// 处理上传进度
const handleProgress: UploadProps['onProgress'] = (event: any, uploadFile: UploadFile, uploadFiles: UploadFile[]) => {
  console.log('上传进度:', event.percent)
  console.log('当前文件:', uploadFile)
}

// 处理文件移除
const handleRemove: UploadProps['onRemove'] = (uploadFile: UploadFile, uploadFiles: UploadFile[]) => {
  console.log('文件被移除:', uploadFile)
  console.log('剩余文件:', uploadFiles)
}

// 处理文件状态改变
const handleChange: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFile[]) => {
  console.log('文件状态改变:', uploadFile)
  console.log('所有文件:', uploadFiles)
}

const submitUpload = () => {
  try {
    upload.value!.submit()
  } catch (error) {
    console.error('提交上传时发生错误:', error)
    ElMessage.error('提交上传失败')
  }
}
</script>

<template>
  <ElUpload
    ref="upload"
    class="upload-demo"
    action="https://cardsclub.cn:9443/adm/file/upload?t=cardbox"
    :limit="1"
    :on-exceed="handleExceed"
    :on-error="handleError"
    :on-success="handleSuccess"
    :on-progress="handleProgress"
    :on-remove="handleRemove"
    :on-change="handleChange"
    :auto-upload="false"
    :show-file-list="true"
    :before-upload="(file) => {
      // 文件大小限制 (10MB)
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        ElMessage.error('文件大小不能超过 10MB!')
        return false
      }
      return true
    }"
  >
    <template #trigger>
      <ElButton type="primary">选择文件</ElButton>
    </template>
    <ElButton class="ml-3" type="success" @click="submitUpload">
      上传服务器
    </ElButton>
    <template #tip>
      <div class="el-upload__tip text-red">
        请上传一个文件, 上传的文件将覆盖旧文件
      </div>
    </template>
  </ElUpload>
</template>

