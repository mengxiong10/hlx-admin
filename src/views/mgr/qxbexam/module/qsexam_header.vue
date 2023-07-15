<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->

    <el-select v-model="query.subType" clearable placeholder="科目" style="width: 200px;" class="filter-item">
      <el-option key="null" value label="全部" />
      <el-option v-for="(item,index) in subTypes" :key="index" :value="item.value" :label="item.label" />
    </el-select>
    <el-select v-model="query.trialGrades" clearable placeholder="适用学段" style="width: 200px;" class="filter-item">
      <el-option key="null" value label="全部" />
      <el-option v-for="(item,index) in grades" :key="index" :value="item.value" :label="item.label" />
    </el-select>
    <el-input v-model="query.testName" clearable placeholder="试卷名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','QSEXAM_ALL','QSEXAM_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true" :grades="grades" :sup_this="sup_this" :sub-types="subTypes"/>
    </div>

  </div>
</template>

<script>
import eForm from './qsexam_form'

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
    }
  },
  data() {
    return {

      queryTypeOptions: [
        { key: 'subType', display_name: '科目' },
        { key: 'trialGrades', display_name: '适用学段' },
        { key: 'testName', display_name: '试卷名称' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.sup_this.page = 0
      this.sup_this.init()
    }
  }
}
</script>
