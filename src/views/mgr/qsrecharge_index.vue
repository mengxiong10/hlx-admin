<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" border size="small" style="width: 100%;">
      <el-table-column align="center" prop="deptName" label="部门名称"/>
      <el-table-column align="center" label="记录类型">
        <template slot-scope="scope">
          {{ transName(ttypes,scope.row.ttype) }}
        </template>
      </el-table-column>
      <el-table-column v-if="false" align="center" prop="total" label="剩余总点数"/>
      <el-table-column align="center" prop="tnumber" label="充值或消费点数"/>
      <el-table-column align="center" prop="currTotal" label="截止当前点数"/>
      <el-table-column align="center" prop="remark" show-overflow-tooltip label="说明"/>
      <el-table-column align="center" show-overflow-tooltip prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createByName" label="操作人"/>
      <el-table-column v-if="false" prop="updateTime" show-overflow-tooltip label="修改时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="false" prop="updateBy" label="修改人"/>
      <el-table-column v-if="false && checkPermission(['ADMIN','QSRECHARGE_ALL','QSRECHARGE_EDIT','QSRECHARGE_DELETE'])" label="操作" width="100px" align="center">
        <template slot-scope="scope">
          <!--
          <edit v-permission="['ADMIN','QSRECHARGE_ALL','QSRECHARGE_EDIT']" :is-add="false" :is-adds="false" :data="scope.row" :sup_this="sup_this"/>
-->
          <el-popover
            v-permission="['ADMIN','QSRECHARGE_ALL','QSRECHARGE_DELETE']"
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
import { del } from '@/api/qsRecharge'
import { parseTime, transName, parseDate } from '@/utils/index'
import eHeader from './module/qsrecharge_header'
import edit from './module/qsrecharge_edit'
import { dictName } from '@/api/dictDetail'

export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this, ttypes: [],
      query: {
        deptName: '',
        ttype: '',
        startDate: this.parseDate(new Date()),
        endDate: this.parseDate(new Date())
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.dictNames('qsrecharge_code')
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    parseDate,
    dictNames(name) {
      dictName(name).then(res => {
        console.log(res)
        if (name === 'qsrecharge_code') {
          this.ttypes = res
        }
      })
    },
    transName,
    beforeInit() {
      this.url = 'api/qsRecharge'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const deptName = query.deptName
      if (deptName !== '' && deptName !== null) { this.params['deptName'] = deptName }
      const startDate = query.startDate
      if (startDate !== '' && startDate !== null) { this.params['startDate'] = startDate }
      const endDate = query.endDate
      if (endDate !== '' && endDate !== null) { this.params['endDate'] = endDate }
      const ttype = query.ttype
      if (ttype !== '' && ttype !== null) { this.params['ttype'] = ttype }

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
