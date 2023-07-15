<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      --> <el-tabs type="border-card" tab-position="bottom" style="padding:2px;">
      <el-tab-pane label="查询">
    <el-input v-model="query.word" clearable placeholder="单词" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <el-select v-model="query.audioType" clearable placeholder="类型" class="filter-item" style="width: 200px">
      <el-option v-for="(item,index) in subTypes" :key="index" :value="item.value" :label="item.label" />
    </el-select>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','QSAUDIO_ALL','QSAUDIO_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true" :sup_this="sup_this" :sub-types="subTypes" />
    </div>  </el-tab-pane>
      <el-tab-pane label="汉英字词批量上传">
    <el-upload ref="esupload1" :on-success="handleSuccess" :on-error="handleError" :file-list="fileList" :before-upload="beforeAvatarUpload" :headers="headers" :action="jcUploadApi" :limit="limit" :on-exceed="handleExceed">
      <el-button v-loading="loading_u" slot="trigger" icon="el-icon-upload2" size="small" type="primary">汉英字词批量上传</el-button>
      <a style="padding-left:1rem;text-decoration:underline" href="/static/zyci_demo.zip" class="download" download="汉英字词上传模板.zip" title="汉英字词模板下载">
        汉英字词模板下载
      </a>
      <div slot="tip" class="el-upload__tip">只能上传zip压缩包文件，且不超过50M</div>
    </el-upload></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import eForm from './qsaudio_form'
import { getToken } from '@/utils/auth'

export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    },
    subTypes: {
      type: Array,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return { loading_u: false,
      fileList: [],
      limit: 3,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      jcUploadApi: process.env.BASE_API + '/api/qsAudioUpload',
      queryTypeOptions: [
        { key: 'word', display_name: '单词' },
        { key: 'audioType', display_name: '类型 码表 英文 中文' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    }, beforeAvatarUpload(file) {
      this.loading_u = true
      console.log(file.type)
      // const isXsl = file.type === 'application/x-zip-compressed'
      const isLt10M = file.size / 1024 / 1024 < 50

      /*
      if ((isXsl.toString()).indexOf('zip') === -1) {
        this.$notify({
          title: '上传文件只能是 zip 格式!', //
          type: 'error',
          duration: 2500
        })
        this.loading_u = false
      }*/
      if (!isLt10M) {
        this.$notify({
          title: '上传文件大小不能超过 50MB!', //
          type: 'error',
          duration: 2500
        })
        this.loading_u = false
      }
      console.log('验证通过----')
      return isLt10M
    },
    handleSuccess(response, file, fileList) {
      this.loading_u = false
      console.log(response)
      //   this.$refs.upload.clearFiles()
      var msg = response.respMsg
      var info = 'error'
      if (response.respCode === '000000') {
        info = 'success'
        msg = response.respBody
      }
      this.$notify({
        title: msg, //
        type: info,
        duration: 2500
      })
      this.toQuery()
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      this.loading_u = false
      //   this.$refs.upload.clearFiles()
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.resMsg,
        type: 'error',
        duration: 2500
      })
      console.log('上传失败----')
    },
    handleExceed(files, fileList) {
      this.$notify({
        title: '当前限制上传3个文件，若要继续上传文件，请删除之前文件或刷新当前页面！', //
        type: 'error',
        duration: 2500
      })
    }
  }

}
</script>
