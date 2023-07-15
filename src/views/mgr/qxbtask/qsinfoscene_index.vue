<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="支持题型场景" width="600px">

    <eHeader :query="query" :sup_thiss="sup_thiss" :qs-info-type="qsInfoType" />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column align="center" show-overflow-tooltip prop="qstbsName" label="单元名称"/>
      <el-table-column align="center" show-overflow-tooltip prop="qsinfoName" label="单元内序号"/>
      <el-table-column align="center" show-overflow-tooltip prop="trialQsType" label="适用题型">
        <template slot-scope="scope">
          {{ transName(qsInfoType, scope.row.trialQsType) }}
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="createByName" label="创建人编号"/>
      <el-table-column align="center" show-overflow-tooltip prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="false && checkPermission(['ADMIN','QSINFOSCENE_ALL','QSINFOSCENE_EDIT','QSINFOSCENE_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSINFOSCENE_ALL','QSINFOSCENE_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','QSINFOSCENE_ALL','QSINFOSCENE_DELETE']"
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
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/qsInfoScene'
import eHeader from './module/qsinfoscene_header'
import edit from './module/qsinfoscene_edit'
import { isEmpty, transName, parseTime } from '@/utils/index'
import { dictName } from '@/api/dictDetail'

export default {
  components: { eHeader, edit },
  mixins: [initData],

  data() {
    return {
      delLoading: false, sup_thiss: this,
      dialog: false,
      isAdd: false,
      qsInfoType: [],
      query: {
        qstbsId: '',
        trialQsType: ''
      }
    }
  },
  created() {
    this.$nextTick(() => {
      // this.init()
      this.dictName('qsinfo_type_code')
    })
  },
  methods: {
    parseTime,
    transName,
    isEmpty,
    checkPermission,
    dictName(name) {
      dictName(name).then(res => {
        if (name === 'qsinfo_type_code') {
          this.qsInfoType = res
        }
      })
    },
    cancel() {
      this.dialog = false
    },
    beforeInit() {
      this.url = 'api/qsInfoScene'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const qstbsId = query.qstbsId

      if (qstbsId !== '' && qstbsId !== null) { this.params['qstbsId'] = qstbsId }
      const qsinfoId = query.qsinfoId
      if (qsinfoId !== '' && qsinfoId !== null) { this.params['qsinfoId'] = qsinfoId }
      const trialQsType = query.trialQsType
      if (trialQsType !== '' && trialQsType !== null) { this.params['trialQsType'] = trialQsType }

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
