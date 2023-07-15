<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to" />
    <eForm ref="form" :sub-types="subTypes" :stuauths="stuauths" :grades="grades" :sup_this="sup_this" :is-add="false" />
  </div>
</template>
<script>
import eForm from './qstextbook_form'
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
    },
    stuauths: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        subType: this.data.subType,
        qsName: this.data.qsName,
        deductionPoints: this.data.deductionPoints,
        trialGrades: this.data.trialGrades,
        createBy: this.data.createBy,
        createTime: this.data.createTime,
        effectiveDays: this.data.effectiveDays,
        torder: this.data.torder,
        imageUrl: this.data.imageUrl,
        qsDesc: this.data.qsDesc,
        authType: this.data.authType,
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
