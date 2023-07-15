<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="步骤记录" width="1200px">

    <div>
      <eHeader :query="query" :sup_thiss="sup_thiss"/>
      <!--表格渲染-->
      <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
        <el-table-column align="center" prop="qsTextbookTwo.qsUnit" label="单元名称"/>
        <el-table-column align="center" prop="stepNum" label="步骤序号"/>
        <el-table-column align="center" prop="stepValue" label="步骤名称">
          <template slot-scope="scope">
            {{ transName(qsinfoTypeCode,scope.row.stepValue) }}
          </template>
        </el-table-column>
        <el-table-column v-if="false" align="center" prop="score" label="分数"/>
        <el-table-column align="center" prop="studyTime" label="用时(秒)"/>
        <el-table-column show-overflow-tooltip align="center" prop="startTime" label="开始时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.startTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="finishTime" label="完成时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.finishTime) }}</span>
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
    <div slot="footer" class="dialog-footer">
      <el-button type="info" icon="el-icon-close" @click="cancel">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/qsStudyItem'
import { isEmpty, transName, parseTime } from '@/utils/index'
import { dictName } from '@/api/dictDetail'
import eHeader from './module/qsstudyitem_header'
import edit from './module/qsstudyitem_edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_thiss: this,
      dialog: false,
      qsinfoTypeCode: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.dictName('qsinfo_type_code')
    })
  },
  methods: {
    isEmpty, transName, parseTime,
    checkPermission,
    dictName(name) {
      dictName(name).then(res => {
        if (name === 'qsinfo_type_code') {
          this.qsinfoTypeCode = res
        }
      })
    },
    beforeInit() {
      this.url = 'api/qsStudyItem'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const studyId = query.studyId
      if (studyId !== '' && studyId !== null) { this.params['studyId'] = studyId }
      const qsTextbookTwoName = query.qsTextbookTwoName
      if (qsTextbookTwoName !== '' && qsTextbookTwoName !== null) { this.params['qsTextbookTwoName'] = qsTextbookTwoName }

      return true
    },
    cancel() {
      this.dialog = false
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
