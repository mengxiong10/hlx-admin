<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="entrytype === 1 ? '学生信息' : '分配教师'"
    width="550px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="form.realName" readonly style="width: 370px" />
      </el-form-item>
      <el-form-item v-if="entrytype === 1" label="手机号码" prop="username">
        <el-input v-model="form.username" readonly style="width: 370px" />
      </el-form-item>
      <el-form-item v-if="entrytype === 1" label="签约邮箱">
        <el-input v-model="form.email" readonly style="width: 370px" />
      </el-form-item>
      <el-form-item v-if="entrytype === 1" label="生源" prop="source">
        <el-select
          v-model="form.source"
          disabled
          placeholder="注册来源"
          class="filter-item"
          style="width: 370px"
        >
          <el-option
            v-for="item in stusources"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学段" prop="grade">
        <el-select
          v-model="form.grade"
          :disabled="entrytype != 1"
          clearable
          placeholder="学段"
          class="filter-item"
          style="width: 370px"
          @change="getDeptInfos"
        >
          <el-option
            v-for="item in grades"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-select
          v-model="form.deptId"
          :disabled="entrytype != 1"
          clearable
          placeholder="服务部门"
          class="filter-item"
          style="width: 370px"
        >
          <el-option
            v-for="item in deptinfos"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!--      <el-form-item v-if="entrytype === 1" label="电话号码" >-->
      <!--      <el-input v-model="form.phone" style="width: 370px;"/>-->
      <!--      </el-form-item>-->

      <el-form-item v-if="entrytype === 2" label="教师" prop="teachId">
        <el-select
          v-model="form.teachId"
          clearable
          placeholder="分配教师"
          class="filter-item"
          style="width: 370px"
        >
          <el-option
            v-for="item in teachinfos"
            :key="item.key"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="entrytype === 1" label="学习端" prop="authType">
        <el-select
          v-model="form.authType"
          clearable
          placeholder="学习端"
          class="filter-item"
          style="width: 370px"
        >
          <el-option
            v-for="item in stuauths"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!--
      <el-form-item label="昵称" >
        <el-input v-model="form.nickname" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="微信开放平台标识编号" >
        <el-input v-model="form.unionid" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="头像地址 头像地址" >
        <el-input v-model="form.avatar" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input v-model="form.pass" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="性别" >
        <el-input v-model="form.gander" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="出生日期" >
        <el-input v-model="form.birthday" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="省" >
        <el-input v-model="form.province" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="市" >
        <el-input v-model="form.city" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="区县" >
        <el-input v-model="form.county" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="详细地址" >
        <el-input v-model="form.address" style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="数据有效状态 1正常 0禁止" >
        <el-input v-model="form.enabled" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="完善注册信息标签 码表 未完成，已完成" >
        <el-input v-model="form.registerFlag" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="完善注册信息时间" >
        <el-input v-model="form.registerTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="注册时间 默认为当前时间" >
        <el-input v-model="form.createTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="更新时间 默认为当前时间" >
        <el-input v-model="form.updateTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="更新人编号 关联用户编号" >
        <el-input v-model="form.updateBy" style="width: 370px;"/>
      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsStudent'
import { getTeachInfos } from '@/api/user'
import { getAllDept } from '@/api/dept'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
    sup_this: {
      type: Object,
      default: null,
    },
    grades: {
      type: Array,
      required: true,
    },
    stuauths: {
      type: Array,
      required: true,
    },
    stusources: {
      type: Array,
      required: true,
    },
    entrytype: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      teachinfos: [],
      deptinfos: [],
      form: {
        id: '',
        nickname: '',
        unionid: '',
        phone: '',
        avatar: '',
        realName: '',
        pass: '',
        username: '',
        gander: '',
        birthday: '',
        grade: '',
        province: '',
        city: '',
        county: '',
        address: '',
        parentName: '',
        parentPhone: '',
        enabled: '',
        registerFlag: '',
        registerTime: '',
        createTime: '',
        updateTime: '',
        updateBy: '',
        teachId: '',
        onlineScore: '',
        offlineScore: '',
        deptName: '',
        teachName: '',
        loginTime: '',
        appVersion: '',
        deviceModel: '',
        deviceBrand: '',
        deviceSystem: '',
        devicePlatform: '',
        pushEnabled: '',
        pushId: '',
        source: '',
        authType: '',
        deptId: '',
      },
      rules: {
        teachId: [{ required: true, message: '请选择老师', trigger: 'blur' }],
        grade: [{ required: true, message: '请选择学段', trigger: 'blur' }],
        deptId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
        authType: [{ required: true, message: '请选择学习端', trigger: 'blur' }],
      },
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    getTeachInfos(deptId) {
      var params = { deptId }
      getTeachInfos(params).then((res) => {
        // console.log(res)
        this.teachinfos = res
      })
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else {
            this.doEdit()
          }
        }
      })
    },
    doAdd() {
      add(this.form)
        .then((res) => {
          this.resetForm()
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 2500,
          })
          this.loading = false
          this.$parent.$parent.init()
        })
        .catch((err) => {
          this.loading = false
          console.log(err.response.data.message)
        })
    },
    doEdit() {
      edit(this.form)
        .then((res) => {
          this.showmsg(res)
        })
        .catch((err) => {
          this.loading = false
          console.log(err.response.data.message)
        })
    },
    showmsg(res) {
      var info = 'error'
      var msg = res.respMsg
      this.loading = false
      if (res.respCode === '000000') {
        msg = res.respBody
        info = 'success'
        this.resetForm()
        this.sup_this.init()
      }

      this.$notify({
        title: msg,
        type: info,
        duration: 2500,
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        nickname: '',
        unionid: '',
        phone: '',
        avatar: '',
        realName: '',
        pass: '',
        username: '',
        gander: '',
        birthday: '',
        grade: '',
        province: '',
        city: '',
        county: '',
        address: '',
        parentName: '',
        parentPhone: '',
        enabled: '',
        registerFlag: '',
        registerTime: '',
        createTime: '',
        updateTime: '',
        updateBy: '',
        teachId: '',
        onlineScore: '',
        offlineScore: '',
        deptName: '',
        teachName: '',
        loginTime: '',
        appVersion: '',
        deviceModel: '',
        deviceBrand: '',
        deviceSystem: '',
        devicePlatform: '',
        pushEnabled: '',
        pushId: '',
        source: '',
        authType: '',
        deptId: '',
      }
    },
    getDeptInfos(val) {
      const params = { grade: val }
      const _this = this
      getAllDept(params).then((res) => {
        // console.log(res)
        _this.deptinfos = res
        const oldDeptId = _this.form.deptId
        _this.form.deptId = ''
        _this.deptinfos.forEach((item) => {
          if (item.id === oldDeptId) {
            _this.form.deptId = item.id
            return
          }
        })
      })
    },
  },
}
</script>

<style scoped></style>
