<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_thiss="sup_thiss" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './qsstudyitem_form'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_thiss: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        studyId: this.data.studyId,
        qstextbooktwoId: this.data.qstextbooktwoId,
        stepNum: this.data.stepNum,
        stepValue: this.data.stepValue,
        score: this.data.score,
        studyTime: this.data.studyTime,
        startTime: this.data.startTime,
        finishTime: this.data.finishTime
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
