<template>
  <div>
    <el-button size="mini" type="primary" @click="to">线下加分</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './qsstudy_form'
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
        qstextbookId: this.data.qstextbookId,
        qstextbooktwoId: this.data.qstextbooktwoId,
        repetDoNums: this.data.repetDoNums,
        onlineScore: this.data.onlineScore,
        onlineAllScore: this.data.onlineAllScore,
        lineScore: this.data.lineScore,
        lineAllScore: this.data.lineAllScore,
        studyRate: this.data.studyRate,
        lastDoSetp: this.data.lastDoSetp,
        deptId: this.data.deptId,
        teachId: this.data.teachId,
        studyTime: this.data.studyTime,
        startDoTime: this.data.startDoTime,
        lastDoTime: this.data.lastDoTime,
        createTime: this.data.createTime,
        updateTime: this.data.updateTime,
        stuName: this.data.stuName,
        qstextbookName: this.data.qstextbookName,
        qstextbooktwoName: this.data.qstextbooktwoName,
        deptName: this.data.deptName,
        noStudyUnitNum: this.data.noStudyUnitNum,
        teachName: this.data.teachName
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
