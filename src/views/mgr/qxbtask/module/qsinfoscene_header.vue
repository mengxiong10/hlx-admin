<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-input v-if="false" v-model="query.qstbsId" clearable placeholder="关联单元ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-if="false" v-model="query.qsinfoId" clearable placeholder="关联题库ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.trialQsType" clearable placeholder="适用题型" style="width: 200px;" class="filter-item">
      <el-option key="null" value label="全部" />
      <el-option v-for="(item,index) in qsInfoType" :key="index" :value="item.value" :label="item.label" />
    </el-select>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div v-if="false" style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','QSINFOSCENE_ALL','QSINFOSCENE_CREATE']"
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
import eForm from './qsinfoscene_form'
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    },
    sup_thiss: {
      type: Object,
      required: true
    },
    qsInfoType: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'qstbsId', display_name: '关联单元ID' },
        { key: 'qsinfoId', display_name: '关联题库ID' },
        { key: 'trialQsType', display_name: '适用题型 码表 看和听' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.sup_thiss.page = 0
      this.sup_thiss.init()
    }
  }
}
</script>
