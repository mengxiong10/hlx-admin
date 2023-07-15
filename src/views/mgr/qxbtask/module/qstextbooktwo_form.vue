<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增单元目录' : '编辑单元目录'" width="550px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item label="课程名称">
        {{ form.qsTextbook.qsName }}
      </el-form-item>
      <el-form-item label="单元名称" prop="qsUnit">
        <el-input v-model="form.qsUnit" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="单元序号" prop="tsort">
        <el-input v-model="form.tsort" type="number" style="width: 370px;" />
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsTextbookTwo'
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
        qsTextbook: { id: '' },
        qsUnit: '',
        createBy: '',
        createTime: '',
        tsort: '',
        enabled: ''
      },
      rules: {
        qsUnit: [{ required: true, message: '请输入课程单元名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      console.log(this.form)
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        }
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
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',

        qsUnit: '',
        qsTextbook: { id: '' },
        createBy: '',
        createTime: '',
        tsort: '',
        enabled: ''
      }
    }
  }
}
</script>

<style scoped>
</style>
