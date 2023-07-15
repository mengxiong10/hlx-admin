<template>
  <div class="app-container">
    <eHeader :query="query" :teachinfos="teachinfos" :grades="grades" :textbooks="textbooks" :sup_this="sup_this" />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" border size="small" style="width: 100%;">
      <el-table-column type="expand" label="其他">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row>
              <el-col :span="8">
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
                <el-form-item label="邮箱:">
                  <span>{{ isEmpty(props.row.email)?'无':props.row.email }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="false">
              <el-col :span="8">
                <el-form-item label="完善信息状态:">
                  <span>{{ props.row.register_flag === '1'?'已完善':'未完善' }}</span>
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
              <el-col :span="8">
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
            <el-row v-if="false">
              <el-col :span="8">
                <el-form-item label="推送识别号:">
                  <span>{{ isEmpty(props.row.push_id)?'无':props.row.push_id }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否开启推送:">
                  <span>{{ isEmpty(props.row.push_enabled)?'无':props.row.push_enabled===true?'是':'否' }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="更新时间:">
                  <span>{{ isEmpty(props.row.update_time)?'无':parseTime(props.row.update_time) }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="false">
              <el-col :span="8">
                <el-form-item label="完善信息时间:">
                  <span>{{ isEmpty(props.row.register_time)?'无':parseTime(props.row.register_time) }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="APP版本号:">
                  <span>{{ isEmpty(props.row.app_version)?'无':props.row.app_version }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备平台:">
                  <span>{{ isEmpty(props.row.device_platform)?'无':transName(deviceplatforms, props.row.device_platform) }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="false">
              <el-col :span="8">
                <el-form-item label="设备系统:">
                  <span>{{ isEmpty(props.row.device_system )?'无':props.row.device_system }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备型号:">
                  <span>{{ isEmpty(props.row.device_model)?'无':props.row.device_model }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备厂商:">
                  <span>{{ isEmpty(props.row.device_brand)?'无':props.row.device_brand }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="real_name" label="姓名" />
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
      <el-table-column align="center" prop="username" label="手机号码" />
      <el-table-column align="center" prop="teachName" label="老师" />
      <el-table-column align="center" prop="grade" label="年级">
        <template slot-scope="scope">
          {{ transName(grades,scope.row.grade) }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="online_score" label="线上积分" />
      <el-table-column align="center" prop="offline_score" label="线下积分" />
      <el-table-column align="center" prop="auth_type" label="学习端" >
        <template slot-scope="scope">
          {{ transName(stuauths,scope.row.auth_type) }}
        </template>
      </el-table-column>

      <el-table-column v-if="checkPermission(['ADMIN','QSSTUDENT_ALL','QSSTUDENT_EDIT','QSSTUDENT_DELETE'])" fixed="right" label="操作" width="420px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSSTUDENT_ALL','QSSTUDENT_EDIT']" :stuauths="stuauths" :stusources="stusources" :entrytype="entrytype1" :grades="grades" :data="scope.row" :sup_this="sup_this" />
          <edit v-permission="['ADMIN','QSSTUDENT_ALL','QSSTUDENT_EDIT']" :stuauths="stuauths" :stusources="stusources" :entrytype="entrytype2" :grades="grades" :data="scope.row" :sup_this="sup_this" />
          <editStuQs v-permission="['ADMIN','QSSTUDENT_ALL','QSSTUDENT_EDIT']" :data="scope.row" :sup_this="sup_this" />
          <el-button v-permission="['ADMIN','QSSTUDENT_ALL','QSSTUDENT_EDIT']" type="primary" size="mini" @click="toCp(scope.row.id,scope.row.real_name)">测评记录</el-button>
          <el-button v-permission="['ADMIN','QSSTUDENT_ALL','QSSTUDENT_EDIT']" type="primary" size="mini" @click="toQs(scope.row.id)">已学课程</el-button>
          <el-popover v-permission="['ADMIN','QSSTUDENT_ALL','QSSTUDENT_DELETE']" :ref="scope.row.id" placement="top" width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button v-if="false" slot="reference" type="danger" icon="el-icon-delete" size="mini" />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination :total="total" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />

    <qsStuAuth ref="qsStuAuth" :sup_this="sup_this" />

  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del, qsStuQstextbook } from '@/api/qsStudent'
import eHeader from './module/qsstudent_header'
import edit from './module/qsstudent_edit'
import { isEmpty, transName, parseTime } from '@/utils/index'
import { dictName } from '@/api/dictDetail'
import editStuQs from './module/qsstudent_auth_editQs'
import qsStuAuth from './module/qsstu_auth'
import { getTeachInfos } from '@/api/user'

export default {
  components: { eHeader, edit, editStuQs, qsStuAuth },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this, ganders: [], grades: [],
      stuauths: [],
      stusources: [],
      deviceplatforms: [],
      textbooks: [],
      entrytype1: 1,
      entrytype2: 2,
      teachinfos: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.dictName('gender_code')
      this.dictName('grade_code')
      this.dictName('stu_auth')
      this.dictName('device_platform')
      this.dictName('stu_source')
      this.qsStuQstextbook()
      this.getTeachInfos()
    })
  },
  methods: {
    parseTime,
    transName,
    isEmpty,
    checkPermission,
    getTeachInfos() {
      var params = {}
      getTeachInfos(params).then(res => {
        // console.log(res)
        this.teachinfos = res
      })
    },
    dictName(name) {
      dictName(name).then(res => {
        if (name === 'gender_code') {
          this.ganders = res
        }
        if (name === 'grade_code') {
          this.grades = res
        }
        if (name === 'stu_auth') {
          this.stuauths = res
        }
        if (name === 'device_platform') {
          this.deviceplatforms = res
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
    toCp(stuId, real_name) {
      // 带参数跳转 qsinfo_index/qsexam/qsresults
      this.$router.push({ name: '测评成绩', params: { stuId: stuId, realName: real_name }})
    },
    toQs(stuId) {
      const _this = this.$refs.qsStuAuth
      _this.stuId = stuId
      _this.inits()
      _this.dialog = true
    },
    beforeInit() {
      this.url = 'api/qsStudent'
      const sort = 'id,desc'
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
      const grade = query.grade
      if (grade !== '' && grade !== null) { this.params['grade'] = grade }
      const qstbId = query.qstbId
      if (qstbId !== '' && qstbId !== null) { this.params['qstbId'] = qstbId }

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
