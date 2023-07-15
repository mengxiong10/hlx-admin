<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './qswrongrecord_form'
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
        qsinfoId: this.data.qsinfoId,
        trialQsType: this.data.trialQsType,
        reslut: this.data.reslut,
        resultFlag: this.data.resultFlag,
        resultNum: this.data.resultNum,
        enabled: this.data.enabled,
        createBy: this.data.createBy,
        createTime: this.data.createTime
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
