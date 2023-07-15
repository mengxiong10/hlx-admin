<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-input v-model="query.deptName" clearable placeholder="部门名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.ttype" class="filter-item" clearable placeholder="请选择记录类型">
      <el-option key="1" label="充值" value="007001"/>
      <el-option key ="2" label="消费" value="007002"/>
    </el-select>
    <el-date-picker
      v-model="query.startDate"
      :clearable="false"
      class="filter-item"
      type="date"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      placeholder="开始日期"
      style="width:160px;" />
    <el-date-picker
      v-model="query.endDate"
      :clearable="false"
      class="filter-item"
      type="date"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      placeholder="结束日期"
      style="width:160px;" />

    <el-input v-if="false" v-model="query.tnumber" clearable placeholder="充值点数" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','QSRECHARGE_ALL','QSRECHARGE_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="to">充值</el-button>
      <eForm ref="form" :is-add="true" :is-adds="true" :sup_this="sup_this"/>
    </div>
  </div>
</template>

<script>
import eForm from './qsrecharge_form'
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
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'deptId', display_name: '部门编号 关联组织部门表编号' },
        { key: 'tnumber', display_name: '充值点数' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.sup_this.page = 0
      this.sup_this.init()
    },
    to() {
      const _this = this.$refs.form
      _this.getAllDept()
      _this.dialog = true
    }
  }
}
</script>
