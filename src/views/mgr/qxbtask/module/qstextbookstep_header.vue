<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-input v-model="query.qstextbookId" clearable placeholder="关联目录编号" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.outName" clearable placeholder="对外显示名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.inName" clearable placeholder="对内显示名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','QSTEXTBOOKSTEP_ALL','QSTEXTBOOKSTEP_CREATE']"
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
import eForm from './qstextbookstep_form'
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
        { key: 'qstextbookId', display_name: '关联目录编号' },
        { key: 'outName', display_name: '对外显示名称' },
        { key: 'inName', display_name: '对内显示名称' }
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
