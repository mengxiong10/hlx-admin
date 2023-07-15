<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">

      <el-table-column align="center" prop="realName" label="学生姓名"/>
      <el-table-column align="center" prop="grade" label="年级">
        <template slot-scope="scope">
          {{ transName(grades,scope.row.grade) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="examName" label="试卷名称"/>
      <el-table-column align="center" prop="examYesNum" label="正确的个数"/>
      <el-table-column align="center" prop="examNoNum" label="错误的个数"/>
      <el-table-column align="center" prop="examTime" label="测试时长(分钟)"/>
      <el-table-column align="center" prop="createTime" label="创建时间"/>
      <el-table-column align="center" prop="deptName" label="部门"/>
      <el-table-column v-if="false && checkPermission(['ADMIN','QSEXAMRESULT_ALL','QSEXAMRESULT_EDIT','QSEXAMRESULT_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSEXAMRESULT_ALL','QSEXAMRESULT_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','QSEXAMRESULT_ALL','QSEXAMRESULT_DELETE']"
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
import { del } from '@/api/qsExamResult'
import { parseTime, isEmpty, transName } from '@/utils/index'
import eHeader from './module/qsexamresult_header'
import edit from './module/qsexamresult_edit'
import { dictName } from '@/api/dictDetail'

export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this,
      grades: [],
      query: {
        stuName: this.$route.params.realName,
        examName: '',
        deptName: ''
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.dictName('grade_code')
    })
  },
  methods: {
    parseTime,
    transName,
    isEmpty,
    checkPermission,
    dictName(name) {
      dictName(name).then(res => {
        if (name === 'grade_code') {
          this.grades = res
        }
      })
    },
    beforeInit() {
      this.url = 'api/qsExamResult'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const stuName = query.stuName
      if (stuName !== '' && stuName !== null) { this.params['stuName'] = stuName }
      const examName = query.examName
      if (examName !== '' && examName !== null) { this.params['examName'] = examName }
      const deptName = query.deptName
      if (deptName !== '' && deptName !== null) { this.params['deptName'] = deptName }
      const stuId = this.$route.params.stuId
      if (stuId !== '' && stuId !== null) { this.params['stuId'] = stuId }

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
