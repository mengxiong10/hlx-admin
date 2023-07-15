<template>
  <div class="app-container">
    <eHeader :query="query" :sub-types="subTypes" :sup_this="sup_this" :grades="grades" />
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      :expand-row-keys="expands"
      :row-key="getRowKeys"
      size="small"
      style="width: 100%;"
      highlight-current-row
      border
      @expand-change="rowExpand">
      <!-- 展开行 是另一个表格 begin -->
      <el-table-column fixed type="expand" label="其他">
        <template slot-scope="scope2">
          <el-table v-loading="dloading" :data="tableData2" size="small" border >
            <el-table-column v-if="false" align="center" label="yc" >
              <template>
                {{ scope2.row.id }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="题型" >
              <template slot-scope="scope">
                <span style="color:red;"> {{ transName(qsTypes,scope.row.qseqType) }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="qsExamQuestion.unitSort" label="编号"/>
            <el-table-column align="center" prop="subType" label="科目">
              <template slot-scope="scope">
                {{ transName(subTypes,scope.row.qsExam.subType) }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="qsExamQuestion.qsTkQuestion" show-overflow-tooltip label="填空题目"/>
            <el-table-column align="center" prop="qsExamQuestion.qsTkAnswer" show-overflow-tooltip label="填空答案"/>
            <el-table-column align="center" prop="qsExamQuestion.qsXzQuestion" show-overflow-tooltip label="选择题目"/>
            <el-table-column align="center" prop="qsExamQuestion.qsXzAnswer" show-overflow-tooltip label="选择题答案"/>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="subType" align="center" label="科目">
        <template slot-scope="scope">
          {{ transName(subTypes,scope.row.subType) }}
        </template>
      </el-table-column>
      <el-table-column prop="trialGrades" align="center" label="适用学段">
        <template slot-scope="scope">
          {{ (scope.row.trialGrades==null || scope.row.trialGrades=='')? '全部':transName(grades,scope.row.trialGrades) }}
        </template>
      </el-table-column>
      <el-table-column prop="testName" align="center" show-overflow-tooltip label="试卷名称"/>
      <el-table-column prop="testSort" align="center" show-overflow-tooltip label="排序"/>
      <el-table-column prop="testDesc" align="center" show-overflow-tooltip label="测试描述"/>
      <el-table-column v-if="false" prop="testFocus" align="center" show-overflow-tooltip label="考察侧重点"/>
      <el-table-column prop="createTime" align="center" show-overflow-tooltip label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" align="center" width="80px" label="ID"/>
      <el-table-column v-if="checkPermission(['ADMIN','QSEXAM_ALL','QSEXAM_EDIT','QSEXAM_DELETE','QSEXAM_DELETE_CACHE'])" label="操作" width="300px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSEXAM_ALL','QSEXAM_EDIT']" :sub-types="subTypes" :data="scope.row" :grades="grades" :sup_this="sup_this"/>
          <questionEdit v-permission="['ADMIN','QSEXAM_ALL','QSEXAM_EDIT']" :tips-code="tipsCode" :qs-types="qsTypes" :sub-types="subTypes" :data="scope.row" :grades="grades" :sup_this="sup_this"/>
          <el-button v-permission="['ADMIN','QSEXAM_ALL']" type="info" icon="el-icon-s-release" size="mini" @click="subDeleteCache(scope.row.id)">清除缓存</el-button>
          <el-popover
            v-permission="['ADMIN','QSEXAM_ALL','QSEXAM_DELETE']"
            :ref="'del_' + scope.$index"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs['del_' + scope.$index].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.$index, scope.row.id)">确定</el-button>
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
import { del, delCache } from '@/api/qsExam'
import { qsExamJnlByQsExam } from '@/api/qsExamJnl'
import { parseTime } from '@/utils/index'
import eHeader from './module/qsexam_header'
import questionEdit from './module/qsexam_question_edit'
import edit from './module/qsexam_edit'
import { dictName } from '@/api/dictDetail'
import { isEmpty, transName } from '@/utils/index'

export default {
  components: { eHeader, edit, questionEdit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this, subTypes: [], expands: [], grades: [], tableData2: [],
      qsTypes: [], tipsCode: []

    }
  },
  created() {
    this.$nextTick(() => {
      this.dictName('subtype_code')
      this.dictName('grade_code')
      this.dictName('qsexam_code')
      this.dictName('qsexam_tips_code')
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/qsExam'
      const sort = 'testSort,ASC'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const subType = query.subType
      if (subType !== '' && subType !== null) { this.params['subType'] = subType }
      const trialGrades = query.trialGrades
      if (trialGrades !== '' && trialGrades !== null) { this.params['trialGrades'] = trialGrades }
      const testName = query.testName
      if (testName !== '' && testName !== null) { this.params['testName'] = testName }

      return true
    },
    dictName(name) {
      dictName(name).then(res => {
        if (name === 'subtype_code') {
          this.subTypes = res
        }
        if (name === 'grade_code') {
          this.grades = res
        }
        if (name === 'qsexam_code') {
          this.qsTypes = res
        }
        if (name === 'qsexam_tips_code') {
          this.tipsCode = res
        }
      })
    },
    isEmpty,
    transName,
    getRowKeys(row) {
      return row.id
    },
    getDetails(id, subType) {
      const params = {
        qsExam: { 'id': id, 'subType': subType }
      }
      this.tableData2 = []
      this.dloading = true
      qsExamJnlByQsExam(params).then(res => {
        this.tableData2 = res.respBody

        console.log(res)
        this.dloading = false
      })
    },
    // 展开父表格数据 并查询该数据下的子数据
    rowExpand(row, expandedRows) {
      // 打印父任务内容

      var that = this
      if (expandedRows.length) {
        that.expands = []
        if (row.id) {
          that.expands.push(row.id)
        }
      } else {
        that.expands = []
      }

      this.getDetails(row.id, row.subType)

      // 如果展开行数大于1
      // if (expandedRows.length > 1) {
      // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
      //  expandedRows.shift()
      // }
    },
    subDelete(index, id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs['del_' + index].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs['del_' + index].doClose()
        console.log(err.response.data.message)
      })
    },

    subDeleteCache(id) {
      this.delLoading = true
      delCache(id).then(res => {
        this.delLoading = false
        this.$notify({
          title: '清除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
