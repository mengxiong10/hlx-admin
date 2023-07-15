<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="老师管理的学生" width="1080px">
    <div>
      <eHeader :query="query" :sup_this="sup_thiss" :grades="grades" :textbooks="textbooks"/>
      <!--表格渲染-->
      <el-table v-loading="loading" :data="data" border size="small" style="width: 100%;">
        <el-table-column type="expand" label="其他" >
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row >
                <el-col :span="8" >
                  <el-form-item label="部门:">

                    <span>{{ isEmpty(props.row.deptName)?'无':props.row.deptName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">

                  <el-form-item label="老师:">
                    <span>{{ isEmpty(props.row.teachName)?'无':props.row.teachName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">

                  <el-form-item label="登录账号:">
                    <span>{{ isEmpty(props.row.username)?'无':props.row.username }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="false">
                <el-col :span="8" >
                  <el-form-item label="完善信息状态:">
                    <span>{{ props.row.register_flag === 1?'已完善':'未完善' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="昵称:">
                    <span>{{ isEmpty(props.row.nickname)?'无':props.row.nickname }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="微信开放平台标识编号:">
                    <span>{{ isEmpty(props.row.unionid)?'无':props.row.unionid }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="false">
                <el-col :span="8">
                  <el-form-item label="家长姓名:">
                    <span>{{ isEmpty(props.row.parent_name)?'无':props.row.parent_name }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="家长联系方式:">
                    <span>{{ isEmpty(props.row.parent_phone)?'无':props.row.parent_phone }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="详细地址:">
                    <span>{{ isEmpty(props.row.address)?'无':props.row.address }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="false">
                <el-col :span="8" >
                  <el-form-item label="省:">
                    <span>{{ isEmpty(props.row.province)?'无':props.row.province }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="市:">
                    <span>{{ isEmpty(props.row.city)?'无':props.row.city }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="区县:">
                    <span>{{ isEmpty(props.row.county)?'无':props.row.county }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="生源:">
                    <span>{{ isEmpty(props.row.source)?'无':transName(stusources, props.row.source) }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="注册时间:">
                    <span>{{ isEmpty(props.row.create_time)?'无':parseTime(props.row.create_time) }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最近登录时间:">
                    <span>{{ isEmpty(props.row.login_time)?'无':parseTime(props.row.login_time) }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="real_name" label="姓名"/>
        <el-table-column align="center" prop="teachName" label="老师"/>
        <el-table-column align="center" prop="gander" label="性别">
          <template slot-scope="scope">
            {{ transName(ganders,scope.row.gander) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="gander" label="生日">
          <template slot-scope="scope">
            <span>{{ isEmpty(scope.row.birthday)?'无':scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="phone" label="手机号"/>
        <el-table-column align="center" prop="grade" label="年级">
          <template slot-scope="scope">
            {{ transName(grades,scope.row.grade) }}
          </template>
        </el-table-column>

        <el-table-column align="center" prop="online_score" label="线上积分"/>
        <el-table-column align="center" prop="offline_score" label="线下积分"/>

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
import { qsStuQstextbook } from '@/api/qsStudent'
import eHeader from './qsstudent_header'
import { isEmpty, transName, parseTime } from '@/utils/index'
import { dictName } from '@/api/dictDetail'

export default {
  components: { eHeader },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_thiss: this,
      ganders: [],
      grades: [],
      stusources: [],
      textbooks: [],
      dialog: false,
      teachId: ''

    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.dictName('gender_code')
      this.dictName('grade_code')
      this.dictName('stu_source')
      this.qsStuQstextbook()
    })
  },
  methods: {
    parseTime,
    transName,
    isEmpty,
    checkPermission,
    dictName(name) {
      dictName(name).then(res => {
        if (name === 'gender_code') {
          this.ganders = res
        }
        if (name === 'grade_code') {
          this.grades = res
        }
        if (name === 'stu_source') {
          this.stusources = res
        }
      })
    },
    qsStuQstextbook() {
      var params = {}
      qsStuQstextbook(params).then(res => {
        this.textbooks = res
      })
    },
    cancel() {
      this.dialog = false
    },
    beforeInit() {
      this.url = 'api/qsStudentByTeach'
      const sort = 'id,asc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const username = query.username
      if (username !== '' && username !== null) { this.params['username'] = username }
      const phone = query.phone
      if (phone !== '' && phone !== null) { this.params['phone'] = phone }
      const realName = query.realName
      if (realName !== '' && realName !== null) { this.params['realName'] = realName }
      const teachName = query.teachName
      if (teachName !== '' && teachName !== null) { this.params['teachName'] = teachName }
      const teachId = this.teachId
      if (teachId !== '' && teachId !== null) { this.params['teachId'] = teachId }
      const grade = query.grade
      if (grade !== '' && grade !== null) { this.params['grade'] = grade }
      const qstbId = query.qstbId
      if (qstbId !== '' && qstbId !== null) { this.params['qstbId'] = qstbId }

      return true
    }
  }
}
</script>

<style scoped>

</style>
