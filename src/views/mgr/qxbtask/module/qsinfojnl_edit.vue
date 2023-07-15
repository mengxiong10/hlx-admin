<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './qsinfojnl_form'
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
        qsinfoId: this.data.qsinfoId,
        jnlName: this.data.jnlName,
        jnlTips: this.data.jnlTips,
        jnlContent: this.data.jnlContent,
        jnlTranslation: this.data.jnlTranslation,
        jnlType: this.data.jnlType,
        jnlUrl: this.data.jnlUrl,
        createBy: this.data.createBy
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
