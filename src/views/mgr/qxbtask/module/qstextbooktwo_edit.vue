<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to" />
    <eForm ref="form" :sup_this="sup_this" :is-add="false" />
  </div>
</template>
<script>
import eForm from './qstextbooktwo_form'
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
        qsTextbook: this.data.qsTextbook,
        qsUnit: this.data.qsUnit,
        tsort: this.data.tsort,
        createBy: this.data.createBy,
        createTime: this.data.createTime,
        enabled: this.data.enabled
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
div {
  display: inline-block;
  margin-right: 3px;
}
</style>
