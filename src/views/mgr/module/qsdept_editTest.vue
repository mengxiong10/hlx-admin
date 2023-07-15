<template>
  <div>
    <el-button size="mini" type="primary" @click="to">关联试卷</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" :dicts="dicts"/>
  </div>
</template>
<script>
import eForm from './qsdept_formTest'
import { transferInfoTest } from '@/api/qsExamAuth'

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
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      var params = { 'deptId': this.data.id }

      transferInfoTest(params).then(res => {
        if (res.respCode === '000000') {
          console.log(res.respBody.dataNo)
          _this.form.dataYes = res.respBody.dataYes
          _this.form.dataNo = res.respBody.dataNo
          _this.dept = this.data
          _this.form.deptId = this.data.id
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
