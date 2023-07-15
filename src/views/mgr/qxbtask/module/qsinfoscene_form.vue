<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="关联单元ID" >
        <el-input v-model="form.qstbsId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="关联题库ID" >
        <el-input v-model="form.qsinfoId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="适用题型 码表 看和听" >
        <el-input v-model="form.trialQsType" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建人编号" >
        <el-input v-model="form.createBy" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建时间" >
        <el-input v-model="form.createTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="数据状态 1正常 0无效" >
        <el-input v-model="form.enabled" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsInfoScene'
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
        qstbsId: '',
        qsinfoId: '',
        trialQsType: '',
        createBy: '',
        createTime: '',
        enabled: ''
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
        qstbsId: '',
        qsinfoId: '',
        trialQsType: '',
        createBy: '',
        createTime: '',
        enabled: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
