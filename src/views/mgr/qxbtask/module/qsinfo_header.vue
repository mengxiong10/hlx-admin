<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-tabs type="border-card" tab-position="bottom" style="padding:2px;">
      <el-tab-pane label="查询">
        <el-select v-if="false" v-model="query.subType" clearable placeholder="科目" style="width: 200px;" class="filter-item">
          <el-option key="null" value label="全部" />
          <el-option v-for="(item,index) in subTypes" :key="index" :value="item.value" :label="item.label" />
        </el-select>
        <el-select v-if="false" v-model="query.trialGrades" clearable placeholder="适用学段" style="width: 200px;" class="filter-item">
          <el-option key="null" value label="全部" />
          <el-option v-for="(item,index) in grades" :key="index" :value="item.value" :label="item.label" />
        </el-select>
        <el-input v-model="query.qsName" clearable placeholder="课程名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
        <el-input v-model="query.qsUnit" clearable placeholder="单元名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
        <el-input v-model="query.qsUnitSort" clearable placeholder="单元内序号" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

        <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-delete"
          @click="toDelete">批量删除</el-button>
        <!-- 新增 -->
        <div v-if="false" style="display: inline-block;margin: 0px 2px;">
          <el-button
            class="filter-item"
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="toAdd">新增</el-button>
            <!--
          <eForm ref="form" :is-add="true" :qs-units="qsUnits" :sub-types="subTypes" :sup_this="sup_this" :upload-file-type="uploadFileType"/>
        -->
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="subType==='001002'" label="英语课程内容批量上传">
        <el-upload ref="esupload1" :on-success="handleSuccess" :on-error="handleError" :file-list="fileList" :before-upload="beforeAvatarUpload" :headers="headers" :action="jcUploadApi" :limit="limit" :on-exceed="handleExceed">
          <el-button v-loading="loading_u" slot="trigger" icon="el-icon-upload2" size="small" type="primary">英语课程内容批量上传</el-button>
          <a style="padding-left:1rem;text-decoration:underline" href="/static/yy_upload_demo.zip" class="download" download="英语课程内容上传模板.zip" title="英语课程内容模板下载">
            英语课程内容模板下载
          </a>
          <div slot="tip" class="el-upload__tip">只能上传zip压缩包文件，且不超过50M</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane v-if="subType==='001001'" label="汉语课程内容批量上传">
        <el-upload ref="esupload2" :on-success="handleSuccess" :on-error="handleError" :file-list="fileList" :before-upload="beforeAvatarUpload" :headers="headers" :action="jcUploadApi" :limit="limit" :on-exceed="handleExceed">
          <el-button v-loading="loading_u" slot="trigger" icon="el-icon-upload2" size="small" type="primary">汉语课程内容批量上传</el-button>
          <a style="padding-left:1rem;text-decoration:underline" href="/static/yw_upload_demo.zip" class="download" download="汉语课程内容上传模板.zip" title="汉语课程内容模板下载">
            汉语课程内容模板下载
          </a>
          <div slot="tip" class="el-upload__tip">只能上传zip压缩包文件，且不超过50M</div>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
    <div/>
  </div>
</template>

<script>
import eForm from './qsinfo_form'
import { getToken } from '@/utils/auth'
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
    subTypes: {
      type: Array,
      required: true
    },
    uploadFileType: {
      type: Array,
      required: true
    },
    subType: {
      type: String,
      required: true
    },
    grades: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading_u: false,
      fileList: [],
      qsUnits: [],
      limit: 3,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      jcUploadApi: process.env.BASE_API + '/api/qsinfoUpload',
      queryTypeOptions: [
        { key: 'subType', display_name: '科目 码表 001 汉语，英语' },
        { key: 'qsName', display_name: '课程名称' },
        { key: 'qsUnit', display_name: '单元名' },
        { key: 'qsUnitSort', display_name: '单元内序号' }
      ]
    }
  },
  methods: {
    toAdd() {
      const _this = this.$refs.form
      _this.form.subType = this.subType

      _this.dialog = true
    },
    toQuery() {
      this.sup_this.page = 0
      this.sup_this.init()
    },
    toDelete() {
      this.sup_this.delBatch()
    },
    beforeAvatarUpload(file) {
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
