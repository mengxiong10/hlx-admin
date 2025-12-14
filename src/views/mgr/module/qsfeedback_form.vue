<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '回复'"
    width="500px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item v-if="!isAdd" label="来信内容">
        <el-input
          v-model="form.recontent"
          :rows="nu"
          type="textarea"
          readonly
          style="width: 370px"
        />
      </el-form-item>

      <el-form-item v-if="isAdd" label="选择学生" prop="createBy">
        <el-select
          v-model="form.createBy"
          :remote-method="getStudentOptions"
          :loading="studentLoading"
          filterable
          remote
          reserve-keyword
          placeholder="请输入学生姓名搜索"
          style="width: 370px"
          @change="handleStudentChange"
          @focus="handleSelectFocus"
        >
          <el-option
            v-for="item in studentOptions"
            :key="item.id"
            :label="item.real_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="回复内容">
        <el-input v-model="form.response" :rows="nu" type="textarea" style="width: 370px" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, searchStudent } from '@/api/qsFeedback'
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
  },
  data() {
    return {
      loading: false,
      dialog: false,
      nu: 5,
      studentLoading: false,
      studentOptions: [],
      form: {
        recontent: '',
        response: '',
        enabled: '',
        deptId: '',
        createBy: '',
      },
      rules: {},
    }
  },
  methods: {
    handleSelectFocus() {
      // 当输入框获得焦点且没有选项时，自动搜索所有学生
      if (this.studentOptions.length === 0) {
        this.getStudentOptions('')
      }
    },
    getStudentOptions(name) {
      // 如果 name 为空，搜索所有学生（传空字符串给 API）
      this.studentLoading = true
      searchStudent(name || '')
        .then((res) => {
          this.studentOptions = res.content || []
          this.studentLoading = false
        })
        .catch(() => {
          this.studentLoading = false
        })
    },
    handleStudentChange(studentId) {
      if (studentId) {
        // 从学生选项中找到对应的学生信息
        const selectedStudent = this.studentOptions.find((item) => item.id === studentId)
        if (selectedStudent) {
          this.form.deptId = selectedStudent.dept_id
        }
      } else {
        this.form.deptId = ''
      }
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      this.form.enabled = false
      if (!this.sup_this.isEmpty(this.form.response)) {
        this.form.enabled = true
      }
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add({ ...this.form, createTime: Date.now() })
        .then((res) => {
          this.showmsg(res)
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
      if (res.respCode === '000000' || this.isAdd) {
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
      this.studentOptions = []
      this.form = {
        recontent: '',
        response: '',
        enabled: '',
        deptId: '',
        createBy: '',
      }
    },
  },
}
</script>

<style scoped></style>
