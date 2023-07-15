<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="充值" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item v-if="!isAdds" label="充值部门">
        {{ form.deptName }}
      </el-form-item>
      <el-form-item v-if="isAdds" label="充值部门">

        <el-select v-model="form.deptId" clearable filterable placeholder="充值部门" style="width: 150px;" class="filter-item">
          <el-option v-for="(item,index) in depts" :key="index" :value="item.id" :label="item.name" />
        </el-select>

      </el-form-item>
      <el-form-item label="充值点数">
        <el-input v-model="form.tnumber" type="number" style="width: 370px;" @keyup.native="proving"/>
      </el-form-item>
      <el-form-item label="充值备注">
        <el-input v-model="form.remark" type="textarea" style="width: 370px;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsRecharge'
import { getAllDept } from '@/api/dept'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    isAdds: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      depts: [],
      form: {
        id: '',
        deptId: '',
        tnumber: '',
        currTotal: '',
        remark: '',
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
    proving() {
      this.form.tnumber = this.form.tnumber.replace(/[^\.\d]/g, '')
      this.form.tnumber = this.form.tnumber.replace('.', '')
    },
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
    getAllDept() {
      var params = { 'enabled': 'true' }
      getAllDept(params).then(res => {
        console.log(res)
        var depts = []
        res.forEach(item => {
          if (item.pid !== 0) {
            depts.push(item)
          }
        })
        this.depts = depts
      })
    },
    showmsg(res) {
      var info = 'error'
      var msg = res.respMsg
      this.loading = false
      if (res.respCode === '000000') {
        // msg = res.respBody
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
        deptId: '',
        tnumber: '',
        currTotal: '',
        remark: '',
        enabled: '',
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
