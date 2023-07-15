<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="stuId" label="学生ID"/>
      <el-table-column prop="qsinfoId" label="题库ID"/>
      <el-table-column prop="trialQsType" label="试用题型 码表"/>
      <el-table-column prop="reslut" label="答题结果"/>
      <el-table-column prop="resultFlag" label="答题结果标志 1正确，0错误"/>
      <el-table-column prop="resultNum" label="答题次数"/>
      <el-table-column prop="createBy" label="创建人编号"/>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['ADMIN','QSWRONGRECORD_ALL','QSWRONGRECORD_EDIT','QSWRONGRECORD_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSWRONGRECORD_ALL','QSWRONGRECORD_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','QSWRONGRECORD_ALL','QSWRONGRECORD_DELETE']"
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
import { del } from '@/api/qsWrongRecord'
import { parseTime } from '@/utils/index'
import eHeader from './module/qswrongrecord_header'
import edit from './module/qswrongrecord_edit'
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
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/qsWrongRecord'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const stuId = query.stuId
      if (stuId !== '' && stuId !== null) { this.params['stuId'] = stuId }
      const qsinfoId = query.qsinfoId
      if (qsinfoId !== '' && qsinfoId !== null) { this.params['qsinfoId'] = qsinfoId }
      const trialQsType = query.trialQsType
      if (trialQsType !== '' && trialQsType !== null) { this.params['trialQsType'] = trialQsType }
      const resultFlag = query.resultFlag
      if (resultFlag !== '' && resultFlag !== null) { this.params['resultFlag'] = resultFlag }

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
