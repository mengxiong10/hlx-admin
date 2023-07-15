<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="qstextbookId" label="关联目录编号"/>
      <el-table-column prop="outName" label="对外显示名称"/>
      <el-table-column prop="inName" label="对内显示名称"/>
      <el-table-column prop="stepNum" label="步骤顺序"/>
      <el-table-column prop="stepValue" label="步骤对应题型 码表 题型"/>
      <el-table-column v-if="checkPermission(['ADMIN','QSTEXTBOOKSTEP_ALL','QSTEXTBOOKSTEP_EDIT','QSTEXTBOOKSTEP_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSTEXTBOOKSTEP_ALL','QSTEXTBOOKSTEP_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','QSTEXTBOOKSTEP_ALL','QSTEXTBOOKSTEP_DELETE']"
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
import { del } from '@/api/qsTextbookStep'
import eHeader from './module/qstextbookstep_header'
import edit from './module/qstextbookstep_edit'
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
      this.url = 'api/qsTextbookStep'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const qstextbookId = query.qstextbookId
      if (qstextbookId !== '' && qstextbookId !== null) { this.params['qstextbookId'] = qstextbookId }
      const outName = query.outName
      if (outName !== '' && outName !== null) { this.params['outName'] = outName }
      const inName = query.inName
      if (inName !== '' && inName !== null) { this.params['inName'] = inName }

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
