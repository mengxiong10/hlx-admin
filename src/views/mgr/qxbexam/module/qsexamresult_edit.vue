<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './qsexamresult_form'
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
      _this.form = {
        id: this.data.id,
        stuId: this.data.stuId,
        examId: this.data.examId,
        examYesNum: this.data.examYesNum,
        examNoNum: this.data.examNoNum,
        examTime: this.data.examTime,
        enabled: this.data.enabled,
        createBy: this.data.createBy,
        createTime: this.data.createTime,
        deptId: this.data.deptId
      }
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
