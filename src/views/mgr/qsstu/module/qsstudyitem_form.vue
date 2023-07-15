<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="学习记录编号" >
        <el-input v-model="form.studyId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="单元编号" >
        <el-input v-model="form.qstextbooktwoId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="学习步骤顺序" >
        <el-input v-model="form.stepNum" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="学习步骤值" >
        <el-input v-model="form.stepValue" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="分数" >
        <el-input v-model="form.score" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="用时,分钟" >
        <el-input v-model="form.studyTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="开始时间" >
        <el-input v-model="form.startTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="完成时间" >
        <el-input v-model="form.finishTime" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsStudyItem'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_thiss: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        studyId: '',
        qstextbooktwoId: '',
        stepNum: '',
        stepValue: '',
        score: '',
        studyTime: '',
        startTime: '',
        finishTime: ''
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
        this.sup_thiss.init()
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
        studyId: '',
        qstextbooktwoId: '',
        stepNum: '',
        stepValue: '',
        score: '',
        studyTime: '',
        startTime: '',
        finishTime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
