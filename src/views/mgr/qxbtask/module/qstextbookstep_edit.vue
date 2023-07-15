<template>
  <div>
    <el-button size="mini" type="primary" @click="to">学习步骤</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './qstextbookstep_form'
import { qsTextbookStepByqsTbid } from '@/api/qsTextbookStep'
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

      var param = { 'qstbId': this.data.id }
      qsTextbookStepByqsTbid(param).then(res => {
        _this.form = {
          qstbId: this.data.id,
          qsTextbook: this.data,
          outName: '',
          inName: '',
          stepNum: '',
          stepValue: '',
          setps: res
        }
        console.log(_this.form.steps)
      })

      _this.dictName('qsinfo_type_code')
      _this.dialog = true
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
