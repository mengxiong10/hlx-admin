<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-input v-model="query.province" clearable placeholder="省" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.city" clearable placeholder="市" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.county" clearable placeholder="区/县" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div v-if="false" style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','QSADDRESS_ALL','QSADDRESS_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true" :sup_this="sup_this"/>
    </div>
  </div>
</template>

<script>
import eForm from './qsaddress_form'
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
        { key: 'province', display_name: '省' },
        { key: 'city', display_name: '市' },
        { key: 'county', display_name: '区/县' }
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
