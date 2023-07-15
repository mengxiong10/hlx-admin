<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="关联部门" width="700px">
    <el-form ref="form" :model="form">
      <el-transfer :filter-method="filterMethod" :data="form.dataNo" :props="{key: 'id',label: 'name'}" :titles="['待选部门', '已选部门']" v-model="form.dataYes" filterable filter-placeholder="请输入部门名称"/>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button v-permission="['ADMIN','DEPT_ALL','DEPT_EDIT']" :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addOrUpdateRecharge } from '@/api/qsRechargeAuth'
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
      loading: false,
      dialog: false,
      dept: { id: '' },
      form: {
        deptId: '',
        dataNo: [],
        dataYes: []
      }

    }
  },
  methods: {

    filterMethod(query, item) {
      return item.name.indexOf(query) > -1
    },
    doSubmit() {
      console.log(this.form)
      addOrUpdateRecharge(this.form).then(res => {
        console.log(res)
        this.showmsg(res)
      }).catch(err => {
        this.loading = false
        console.log(err)
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
    cancel() {
      this.resetForm()
    }, resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {

        deptId: '',
        dataNo: [],
        dataYes: []
      }
    }
  }
}
</script>
