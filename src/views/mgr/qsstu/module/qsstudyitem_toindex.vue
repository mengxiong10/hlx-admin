<template>
  <div>
    <el-button size="mini" type="primary" @click="to">步骤记录</el-button>
    <eForm ref="form" :sup_this="sup_this" />
  </div>
</template>
<script>
import eForm from '../qsstudyitem_index'
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
      _this.query.studyId = this.data.id
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
