<template>
  <div class="head-container" style="padding-bottom:7px !important;">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-input v-model="query.qsUnit" clearable placeholder="单元名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />

    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <el-button v-permission="['ADMIN','QSTEXTBOOKTWO_ALL']" v-show="qsTextbook.id != ''" class="filter-item" type="info" icon="el-icon-s-release" size="mini" @click="subDeleteCache()">清除缓存</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button v-permission="['ADMIN','QSTEXTBOOKTWO_ALL','QSTEXTBOOKTWO_CREATE']" v-if="false" class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="toAdd">新增</el-button>
      <eForm ref="form" :is-add="true" :sup_this="sup_this" />
    </div>
  </div>
</template>

<script>
import eForm from './qstextbooktwo_form'
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
    qsTextbook: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'qstbId', display_name: '教材目录id' },
        { key: 'qsUnit', display_name: '单元名称' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.sup_this.page = 0
      this.sup_this.init()
    }, toAdd() {
      const _this = this.$refs.form
      _this.form.qsTextbook = this.qsTextbook
      _this.dialog = true
    }, subDeleteCache() {
      this.sup_this.deleteCache()
    }
  }
}
</script>
