<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this" :grades="grades" :sub-types="subTypes" :tips-code="tipsCode"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column label="其他" algin="center" type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row >
              <el-col :span="8">
                <el-form-item label="填空题题目:">
                  <span>{{ isEmpty(props.row.qsTkQuestion)?'无':props.row.qsTkQuestion }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="填空文件类型:">
                  <span>{{ isEmpty(props.row.qsTkFileType)?'无':transName(uploadsCode,props.row.qsTkFileType) }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="选择题文件名:">
                  <span>{{ isEmpty(props.row.qsTkFileName)?'无':props.row.qsTkFileName }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="8">
                <el-form-item label="选择题题目:">
                  <span>{{ isEmpty(props.row.qsXzQuestion)?'无':props.row.qsXzQuestion }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="选择题文件类型:">
                  <span>{{ isEmpty(props.row.qsXzFileType)?'无':transName(uploadsCode,props.row.qsXzFileType) }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="选择题文件名:">
                  <span>{{ isEmpty(props.row.qsXzFileName)?'无':props.row.qsXzFileName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="subType" label="科目">
        <template slot-scope="scope">
          {{ transName(subTypes,scope.row.subType) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="qsExam.testName" label="试卷名称"/>
      <el-table-column align="center" prop="unitSort" label="序号"/>
      <el-table-column align="center" show-overflow-tooltip prop="qsTkQuestion" label="填空题目"/>

      <el-table-column align="center" show-overflow-tooltip prop="qsTkAnswer" label="填空题答案"/>

      <el-table-column align="center" show-overflow-tooltip prop="qsXzQuestion" label="选择题题目"/>

      <el-table-column align="center" show-overflow-tooltip prop="qsXzAnswer" label="选择题答案"/>

      <el-table-column align="center" show-overflow-tooltip prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['ADMIN','QSEXAMQUESTION_ALL','QSEXAMQUESTION_EDIT','QSEXAMQUESTION_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSEXAMQUESTION_ALL','QSEXAMQUESTION_EDIT']" :data="scope.row" :grades="grades" :sub-types="subTypes" :tips-code="tipsCode" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','QSEXAMQUESTION_ALL','QSEXAMQUESTION_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button v-if="false" slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
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
import { del } from '@/api/qsExamQuestion'
import { parseTime, transName, isEmpty } from '@/utils/index'
import eHeader from './module/qsexamquestion_header'
import { dictName } from '@/api/dictDetail'
import edit from './module/qsexamquestion_edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this,
      grades: [], subTypes: [], uploadsCode: [],
      tipsCode: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.dictName('subtype_code')
      this.dictName('grade_code')
      this.dictName('subtype_code')
      this.dictName('uploadfile_code')
      this.dictName('qsexam_tips_code')
      this.init()
    })
  },
  methods: {
    parseTime,
    isEmpty,
    checkPermission,
    transName,
    dictName(name) {
      dictName(name).then(res => {
        if (name === 'subtype_code') {
          this.subTypes = res
        }
        if (name === 'grade_code') {
          this.grades = res
        }
        if (name === 'subtype_code') {
          this.subTypes = res
        }
        if (name === 'uploadfile_code') {
          this.uploadsCode = res
          console.log(res)
        }
        if (name === 'qsexam_tips_code') {
          this.tipsCode = res
        }
      })
    },
    beforeInit() {
      this.url = 'api/qsExamQuestion'
      const sort = 'unitSort,asc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const subType = query.subType
      if (subType !== '' && subType !== null) { this.params['subType'] = subType }
      const qsTextbookId = query.qsTextbookId
      if (qsTextbookId !== '' && qsTextbookId !== null) { this.params['qsName'] = qsTextbookId }
      const qsTkQuestion = query.qsTkQuestion
      if (qsTkQuestion !== '' && qsTkQuestion !== null) { this.params['qsTkQuestion'] = qsTkQuestion }
      const qsXzQuestion = query.qsXzQuestion
      if (qsXzQuestion !== '' && qsXzQuestion !== null) { this.params['qsXzQuestion'] = qsXzQuestion }

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
