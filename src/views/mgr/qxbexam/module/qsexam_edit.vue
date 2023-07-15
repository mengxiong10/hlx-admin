<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to" />
    <eForm ref="form" :sup_this="sup_this" :is-add="false" :sub-types="subTypes" :grades="grades" />
  </div>
</template>
<script>
import eForm from './qsexam_form'
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
    subTypes: {
      type: Array,
      required: true
    },
    grades: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      console.log(this.data)
      _this.form = {
        id: this.data.id,
        subType: this.data.subType,
        trialGrades: this.data.trialGrades,
        testName: this.data.testName,
        testDesc: this.data.testDesc,
        testFocus: this.data.testFocus,
        enabled: this.data.enabled,
        imageUrl: this.data.imageUrl,
        testSort: this.data.testSort,
        createBy: this.data.createBy,
        createTime: this.data.createTime
      }
      _this.getQsTextBook()
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
