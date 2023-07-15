<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="学生编号" >
        <el-input v-model="form.stuId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="试卷ID" >
        <el-input v-model="form.examId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="测试结果正确的个数" >
        <el-input v-model="form.examYesNum" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="测试结果错误的个数" >
        <el-input v-model="form.examNoNum" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="测试时长 以分钟为单位" >
        <el-input v-model="form.examTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="数据状态 1有效 0 无效" >
        <el-input v-model="form.enabled" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建人编号" >
        <el-input v-model="form.createBy" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建时间" >
        <el-input v-model="form.createTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="部门ID" >
        <el-input v-model="form.deptId" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsExamResult'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        stuId: '',
        examId: '',
        examYesNum: '',
        examNoNum: '',
        examTime: '',
        enabled: '',
        createBy: '',
        createTime: '',
        deptId: ''
      },
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        stuId: '',
        examId: '',
        examYesNum: '',
        examNoNum: '',
        examTime: '',
        enabled: '',
        createBy: '',
        createTime: '',
        deptId: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
