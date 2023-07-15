<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="qseqId" label="测试题库编号"/>
      <el-table-column prop="jnlName" label="序号说明"/>
      <el-table-column prop="jnlTips" label="提示"/>
      <el-table-column prop="jnlContent" label="内容"/>
      <el-table-column prop="jnlTranslation" label="翻译"/>
      <el-table-column prop="jnlType" label="显示类型 .jpg .avi"/>
      <el-table-column prop="jnlUrl" label="显示类型值"/>
      <el-table-column prop="tsort" label="排序号"/>
      <el-table-column v-if="checkPermission(['ADMIN','QSEXAMQUESTIONJNL_ALL','QSEXAMQUESTIONJNL_EDIT','QSEXAMQUESTIONJNL_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSEXAMQUESTIONJNL_ALL','QSEXAMQUESTIONJNL_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','QSEXAMQUESTIONJNL_ALL','QSEXAMQUESTIONJNL_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/qsExamQuestionJnl'
import eHeader from './module/qsexamquestionjnl_header'
import edit from './module/qsexamquestionjnl_edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    checkPermission,
    beforeInit() {
      this.url = 'api/qsExamQuestionJnl'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const qseqId = query.qseqId
      if (qseqId !== '' && qseqId !== null) { this.params['qseqId'] = qseqId }
      const jnlName = query.jnlName
      if (jnlName !== '' && jnlName !== null) { this.params['jnlName'] = jnlName }
      const jnlContent = query.jnlContent
      if (jnlContent !== '' && jnlContent !== null) { this.params['jnlContent'] = jnlContent }
      const jnlUrl = query.jnlUrl
      if (jnlUrl !== '' && jnlUrl !== null) { this.params['jnlUrl'] = jnlUrl }

      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
