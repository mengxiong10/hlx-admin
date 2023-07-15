<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to">回复</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './qsfeedback_form'
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
        recontent: this.data.recontent,
        deptId: this.data.deptId,
        response: this.data.response,
        enabled: this.data.enabled,
        createTime: this.data.createTime,
        createBy: this.data.createBy,
        updateTime: this.data.updateTime,
        updateBy: this.data.updateBy
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
