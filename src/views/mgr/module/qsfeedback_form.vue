<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '回复'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="来信内容" >
        <el-input v-model="form.recontent" :rows="nu" type="textarea" readonly style="width: 370px;"/>
      </el-form-item>

      <el-form-item label="回复内容" >
        <el-input v-model="form.response" :rows="nu" type="textarea" style="width: 370px;"/>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsFeedback'
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
      nu: 5,
      form: {
        id: '',
        recontent: '',
        response: '',
        deptId: '',
        enabled: '',
        createTime: '',
        createBy: '',
        updateTime: '',
        updateBy: ''
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
      this.form.enabled = false
      if (!this.sup_this.isEmpty(this.form.response)) {
        this.form.enabled = true
      }
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.showmsg(res)
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.showmsg(res)
      }).catch(err => {
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
        duration: 2500
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        recontent: '',
        response: '',
        enabled: '',
        deptId: '',
        createTime: '',
        createBy: '',
        updateTime: '',
        updateBy: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
