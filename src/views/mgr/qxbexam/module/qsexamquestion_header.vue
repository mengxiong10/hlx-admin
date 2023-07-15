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
      <el-tab-pane label="条件查询">

        <el-select v-model="query.subType" clearable placeholder="科目" style="width: 200px;" class="filter-item">
          <el-option key="null" value label="全部" />
          <el-option v-for="(item,index) in subTypes" :key="index" :value="item.value" :label="item.label" />
        </el-select>
        <el-input v-model="query.qsTextbookId" clearable placeholder="试卷名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
        <el-input v-model="query.qsTkQuestion" clearable placeholder="填空题目" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
        <el-input v-model="query.qsXzQuestion" clearable placeholder="选择题目" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

        <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
        <!-- 新增 -->
        <div v-if="false" style="display: inline-block;margin: 0px 2px;">
          <el-button
            v-permission="['ADMIN','QSEXAMQUESTION_ALL','QSEXAMQUESTION_CREATE']"
            class="filter-item"
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="$refs.form.dialog = true">新增</el-button>
          <eForm ref="form" :is-add="true" :grades="grades" :sub-types="subTypes" :tips-code="tipsCode"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="试卷题库上传">
        <el-upload ref="esupload1" :on-success="handleSuccess" :on-error="handleError" :file-list="fileList" :before-upload="beforeAvatarUpload" :headers="headers" :action="jcUploadApi" :limit="limit" :on-exceed="handleExceed">
          <el-button v-loading="loading_u" slot="trigger" icon="el-icon-upload2" size="small" type="primary">试卷题库附件上传</el-button>
          <a style="padding-left:1rem;text-decoration:underline" href="/static/test_upload_demo.zip" class="download" download="试卷题库上传模板.zip" title="试卷题库模板下载">
            试卷题库模板下载
          </a>
          <div slot="tip" class="el-upload__tip">只能上传zip压缩包文件，且不超过50M</div>
        </el-upload>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import eForm from './qsexamquestion_form'
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
    grades: {
      type: Array,
      required: true
    },
    tipsCode: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading_u: false,
      fileList: [],
      limit: 3,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      jcUploadApi: process.env.BASE_API + '/api/qsExamUpload',
      queryTypeOptions: [
        { key: 'subType', display_name: '科目' },
        { key: 'qsTextbookId', display_name: '所属教材' },
        { key: 'qsTkQuestion', display_name: '填空题目' },
        { key: 'qsXzQuestion', display_name: '选择题目' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    }
  }
}
</script>
