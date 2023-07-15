<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-select v-model="query.subType" clearable placeholder="科目" style="width: 150px;" class="filter-item">
      <el-option key="null" value label="全部" />
      <el-option v-for="(item,index) in subTypes" :key="index" :value="item.value" :label="item.label" />
    </el-select>
    <el-select v-if="false" v-model="query.trialGrades" clearable placeholder="适用学段" style="width: 150px;" class="filter-item">
      <el-option key="null" value label="全部" />
      <el-option v-for="(item,index) in grades" :key="index" :value="item.value" :label="item.label" />
    </el-select>
    <el-input v-model="query.qsName" clearable placeholder="课程名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />

    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button v-permission="['ADMIN','QSTEXTBOOK_ALL','QSTEXTBOOK_CREATE']" v-if="false" class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true" :sub-types="subTypes" :stuauths="stuauths" :grades="grades" :sup_this="sup_this" />
    </div>
  </div>
</template>

<script>
import eForm from './qstextbook_form'
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
    stuauths: {
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
        { key: 'subType', display_name: '科目 码表 汉语，英语' },
        { key: 'qsName', display_name: '课程名称' },
        { key: 'trialGrades', display_name: '适用学段 码表中选择， 使用逗号隔开' },
        { key: 'enabled', display_name: '数据状态 1正常 0无效' }
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
