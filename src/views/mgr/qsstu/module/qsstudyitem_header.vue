<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-input v-if="false" v-model="query.studyId" clearable placeholder="学习记录编号" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.qsTextbookTwoName" clearable placeholder="单元名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div v-if="false" style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','QSSTUDYITEM_ALL','QSSTUDYITEM_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true" :sup_thiss="sup_thiss"/>
    </div>
  </div>
</template>

<script>
import eForm from './qsstudyitem_form'
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
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'studyId', display_name: '学习记录编号' },
        { key: 'qstextbooktwoId', display_name: '单元编号' }
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
