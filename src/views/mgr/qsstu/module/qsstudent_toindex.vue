<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-search" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" />
  </div>
</template>
<script>
import eForm from './qsstudent_index_form'
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
      _this.teachId = this.data.id
      _this.init()
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
