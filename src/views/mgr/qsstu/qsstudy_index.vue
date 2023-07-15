<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" border size="small" style="width: 100%;">
      <el-table-column type="expand" label="其他">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row >
              <el-col v-if="false" :span="8">
                <el-form-item label="学习进度:">
                  <span>{{ isEmpty(props.row.studyRate)?'无':props.row.studyRate }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="实际学习（秒）:">
                  <span>{{ isEmpty(props.row.studyTime)?'无':props.row.studyTime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="课程线上总得分:">
                  <span>{{ isEmpty(props.row.onlineAllScore)?'0':props.row.onlineAllScore }}</span>
                </el-form-item>
              </el-col>
              <el-col v-if="false" :span="8">
                <el-form-item label="学生年级:">
                  <span>  {{ transName(grades,props.row.stuGrade) }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="课程线下总得分:">
                  <span>{{ isEmpty(props.row.lineAllScore)?'0':props.row.lineAllScore }}</span>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="8" >
                <el-form-item label="老师姓名:">
                  {{ isEmpty(props.row.teachName)?'无':props.row.teachName }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门名称:">
                  <span>{{ isEmpty(props.row.deptName)?'无':props.row.deptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="记录时间:">
                  <span>{{ isEmpty(props.row.updateTime)?'无':parseTime(props.row.updateTime) }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="stuName" label="学生姓名"/>
      <el-table-column v-if="false" align="center" show-overflow-tooltip prop="stuPhone" label="联系电话"/>

      <el-table-column align="center" show-overflow-tooltip prop="qstextbookName" label="课程名称"/>
      <el-table-column align="center" show-overflow-tooltip prop="qstextbooktwoName" label="单元名称"/>
      <el-table-column align="center" show-overflow-tooltip prop="startDoTime" label="首次开始时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDoTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="startDoTime" label="末次结束时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lastDoTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="studyRate" label="本单元学完">
        <template slot-scope="scope">
          {{ scope.row.studyRate }}%
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="onlineScore" label="线上得分"/>
      <el-table-column v-if="false" align="center" show-overflow-tooltip prop="repetDoNums" label="完成遍数"/>
      <el-table-column align="center" show-overflow-tooltip prop="lineScore" label="线下加分">
        <template slot-scope="scope">
          {{ (isEmpty(scope.row.lineScore)?0:scope.row.lineScore) }}
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="totalScore" label="合计得分" />
      <el-table-column align="center" show-overflow-tooltip prop="noStudyUnitNum" label="待学单元数"/>

      <el-table-column v-if="checkPermission(['ADMIN','QSSTUDY_ALL','QSSTUDY_EDIT','QSSTUDY_DELETE'])" label="操作" width="240px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSSTUDY_ALL','QSSTUDY_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <studyitem v-permission="['ADMIN','QSSTUDY_ALL','QSSTUDY_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','QSSTUDY_ALL','QSSTUDY_DELETE']"
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
import { del } from '@/api/qsStudy'
import { parseTime, transName, isEmpty } from '@/utils/index'
import { dictName } from '@/api/dictDetail'
import eHeader from './module/qsstudy_header'
import edit from './module/qsstudy_edit'
import studyitem from './module/qsstudyitem_toindex'
export default {
  components: { eHeader, edit, studyitem },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this, grades: []
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
    checkPermission,
    isEmpty,
    transName,
    beforeInit() {
      this.url = 'api/qsStudy'
      const sort = 'lastDoTime,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const stuId = query.stuName
      if (stuId !== '' && stuId !== null) { this.params['stuName'] = stuId }
      const qstextbookId = query.qstextbookName
      if (qstextbookId !== '' && qstextbookId !== null) { this.params['textbookName'] = qstextbookId }
      const qsTextbookTwoName = query.qsTextbookTwoName
      if (qsTextbookTwoName !== '' && qsTextbookTwoName !== null) { this.params['unitName'] = qsTextbookTwoName }
      const deptId = query.deptName
      if (deptId !== '' && deptId !== null) { this.params['deptName'] = deptId }
      const teachId = query.teachName
      if (teachId !== '' && teachId !== null) { this.params['teachName'] = teachId }

      return true
    },
    dictName(name) {
      dictName(name).then(res => {
        if (name === 'grade_code') {
          this.grades = res
        }
      })
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
