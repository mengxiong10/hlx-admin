<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-select
      v-model="query.enabled"
      clearable
      placeholder="回复状态"
      style="width: 200px"
      class="filter-item"
    >
      <el-option key="null" value label="全部" />
      <el-option key="0" value="0" label="未回复" />
      <el-option key="1" value="1" label="已回复" />
    </el-select>
    <el-input
      v-model="query.recontent"
      clearable
      placeholder="来信内容"
      style="width: 200px"
      class="filter-item"
      @keyup.enter.native="toQuery"
    />
    <el-input
      v-model="query.response"
      clearable
      placeholder="回复内容"
      style="width: 200px"
      class="filter-item"
      @keyup.enter.native="toQuery"
    />

    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery"
      >搜索</el-button
    >
    <!-- 新增 -->
    <div style="display: inline-block; margin: 0px 2px">
      <el-button
        v-permission="['ADMIN', 'QSFEEDBACK_ALL', 'QSFEEDBACK_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true"
        >新增</el-button
      >
      <eForm ref="form" :is-add="true" :sup_this="sup_this" />
    </div>
  </div>
</template>

<script>
import eForm from './qsfeedback_form'
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true,
    },
    sup_this: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'recontent', display_name: '来信内容' },
        { key: 'response', display_name: '回复内容' },
        { key: 'enabled', display_name: '回复状态 0未回复，1已回复' },
      ],
    }
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    },
  },
}
</script>
