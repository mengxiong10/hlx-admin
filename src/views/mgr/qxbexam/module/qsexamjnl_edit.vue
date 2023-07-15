<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './qsexamjnl_form'
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
        qsexamId: this.data.qsexamId,
        tsort: this.data.tsort,
        qsinfoId: this.data.qsinfoId,
        qsinfoType: this.data.qsinfoType,
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
