<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-input
      v-model="query.stuName"
      clearable
      placeholder="学生姓名"
      style="width: 200px"
      class="filter-item"
      @keyup.enter.native="toQuery"
    />
    <el-input
      v-model="query.qstextbookName"
      clearable
      placeholder="课程名称"
      style="width: 200px"
      class="filter-item"
      @keyup.enter.native="toQuery"
    />
    <el-input
      v-model="query.qsTextbookTwoName"
      clearable
      placeholder="单元名称"
      style="width: 200px"
      class="filter-item"
      @keyup.enter.native="toQuery"
    />
    <el-input
      v-model="query.deptName"
      clearable
      placeholder="部门名称"
      style="width: 200px"
      class="filter-item"
      @keyup.enter.native="toQuery"
    />
    <el-input
      v-model="query.teachName"
      clearable
      placeholder="教师姓名"
      style="width: 200px"
      class="filter-item"
      @keyup.enter.native="toQuery"
    />

    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery"
      >搜索</el-button
    >
    <!-- 新增 -->
    <div v-if="false" style="display: inline-block; margin: 0px 2px">
      <el-button
        v-permission="['ADMIN', 'QSSTUDY_ALL', 'QSSTUDY_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true"
        >新增</el-button
      >
      <eForm ref="form" :is-add="true" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import eForm from './qsstudy_form'
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'stuId', display_name: '学生ID' },
        { key: 'qstextbookId', display_name: '目录编号' },
        { key: 'qstextbooktwoId', display_name: '单元内序号' },
        { key: 'deptId', display_name: '部门ID' },
        { key: 'teachId', display_name: '老师的用户id' },
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
