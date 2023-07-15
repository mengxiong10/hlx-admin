<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-input v-model="query.uploadFileName" clearable placeholder="上传文件名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.dealStatus" clearable placeholder="处理状态" style="width: 200px;" class="filter-item">
      <el-option key="null" value label="全部" />
      <el-option value="0" label="处理中" />
      <el-option value="1" label="处理完成" />
    </el-select>
    <el-input v-model="query.errorFileName" clearable placeholder="错误文件名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.errorCode" clearable placeholder="错误编码" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div v-if="false" style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','QSUPLOADLOG_ALL','QSUPLOADLOG_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>
  </div>
</template>

<script>
import eForm from './qsuploadlog_form'
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'uploadFileName', display_name: '上传文件名称' },
        { key: 'dealStatus', display_name: '处理状态：处理中，处理完成' },
        { key: 'errorFileName', display_name: '错误文件名称' },
        { key: 'errorCode', display_name: '错误编码' }
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
