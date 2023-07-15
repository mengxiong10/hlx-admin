<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="试卷题库设置" width="1200px">

    <div class="head-container">
      <el-input v-model="qsTkQuestion" clearable placeholder="填空题目" style="width: 200px;" class="filter-item"/>
      <el-input v-model="qsXzQuestion" clearable placeholder="选择题目" style="width: 200px;" class="filter-item" />

      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="init">搜索</el-button>

    </div>
    <div class="app-container">
      <el-table v-loading="loading" ref="multipleTable" :data="data" size="small" border style="width: 100%;" >

        <el-table-column align="center" prop="subType" label="科目">
          <template slot-scope="scope">
            {{ transName(subTypes,scope.row.qsExamQuestion.subType) }}
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="试卷名称">
          <template slot-scope="scope">
            {{ scope.row.qsExam==null?'':scope.row.qsExam.testName }}
          </template>
        </el-table-column>

        <el-table-column align="center" prop="qseqType" show-overflow-tooltip label="题型">
          <template slot-scope="scope">
            {{ transName(qsTypes,scope.row.qseqType) }}
          </template>

        </el-table-column>
        <el-table-column align="center" prop="qsExamQuestion.unitSort" show-overflow-tooltip label="序号"/>
        <el-table-column align="center" prop="qsExamQuestion.qsTkQuestion" show-overflow-tooltip label="填空题目"/>
        <el-table-column align="center" prop="qsExamQuestion.qsXzQuestion" show-overflow-tooltip label="选择题目"/>
        <el-table-column v-if="checkPermission(['ADMIN','QSEXAMAUTH_ALL','QSEXAMAUTH_EDIT','QSEXAMAUTH_DELETE'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <el-popover
              v-permission="['ADMIN','QSEXAMAUTH_ALL','QSEXAMAUTH_DELETE']"
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

    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { isEmpty, transName, parseTime } from '@/utils/index'
import { del } from '@/api/qsExamJnl'

export default {
  mixins: [initData],
  props: {
    subTypes: {
      type: Array,
      required: true
    },

    qsTypes: {
      type: Array,
      required: true
    },

    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      delLoading: false, dialog: false,
      qsExamId: 0,
      qsXzQuestion: '',
      qsTkQuestion: '',
      qsFlag: false
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
    },
    cancel() {
      this.dialog = false
    },
    doSubmit() {
      this.dialog = false
    },

    beforeInit() {
      this.url = 'api/qsExamJnl'
      const sort = 'id,desc'
      if (this.qsFlag) {
        this.params = { page: this.page, size: this.size, sort: sort, examId: this.qsExamId, qsTkQuestion: this.qsTkQuestion, qsXzQuestion: this.qsXzQuestion }
      }
      return this.qsFlag
    },
    isEmpty, transName

  }
}
</script>

