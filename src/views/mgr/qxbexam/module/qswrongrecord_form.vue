<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="学生ID" >
        <el-input v-model="form.stuId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="题库ID" >
        <el-input v-model="form.qsinfoId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="试用题型 码表" >
        <el-input v-model="form.trialQsType" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="答题结果" >
        <el-input v-model="form.reslut" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="答题结果标志 1正确，0错误" >
        <el-input v-model="form.resultFlag" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="答题次数" >
        <el-input v-model="form.resultNum" style="width: 370px;"/>
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsWrongRecord'
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
        qsinfoId: '',
        trialQsType: '',
        reslut: '',
        resultFlag: '',
        resultNum: '',
        enabled: '',
        createBy: '',
        createTime: ''
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
        qsinfoId: '',
        trialQsType: '',
        reslut: '',
        resultFlag: '',
        resultNum: '',
        enabled: '',
        createBy: '',
        createTime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
