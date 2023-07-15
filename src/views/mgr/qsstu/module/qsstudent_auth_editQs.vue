<template>
  <div>
    <el-button size="mini" type="primary" @click="to">分配课程</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" />
  </div>
</template>
<script>
import eForm from './qsstudent_auth_formQs'
import { transferInfoQsToStu } from '@/api/qsStudentAuth'

export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      var params = { 'stuId': this.data.id, 'deptId': this.data.dept_id }

      transferInfoQsToStu(params).then(res => {
        if (res.respCode === '000000') {
          console.log(res.respBody.dataNo)
          _this.form.dataYes = res.respBody.dataYes
          _this.form.dataNo = res.respBody.dataNo
          _this.qsStudent = this.data
          _this.form.stuId = this.data.id
          _this.form.deptId = this.data.dept_id
          _this.dialog = true
        } else {
          this.$notify({
            title: res.respMsg,
            type: 'error',
            duration: 2500
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
