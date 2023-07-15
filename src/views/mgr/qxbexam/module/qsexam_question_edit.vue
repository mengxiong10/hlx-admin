<template>
  <div>
    <el-button size="mini" type="primary" @click="to">题库</el-button>
    <eForm ref="form" :sup_this="sup_this" :grades="grades" :qs-types="qsTypes" :sub-types="subTypes" :tips-code="tipsCode" />
  </div>
</template>
<script>
import eForm from './qsexam_question_form'
// import { qsExamJnlByQsExam } from '@/api/qsExamJnl'

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
    qsTypes: {
      type: Array,
      required: true
    },
    tipsCode: {
      type: Array,
      required: true
    }
  },

  methods: {
    to() {
      const _this = this.$refs.form
      console.log(this.data)
      _this.qsFlag = true
      _this.qsExamId = this.data.id

      // const params = {
      //   qsExam: { 'id': this.data.id }
      // }

      // qsExamJnlByQsExam(params).then(res => {
      //   var havQss = []
      //   if (res.respCode === '000000') {
      //     res.respBody.forEach(element => {
      //       var qsExamQuestion = element.qsExamQuestion
      //       var qsExam = element.qsExam
      //       var qsinfos = {
      //         id: qsExamQuestion.id,
      //         tsort: element.tsort,
      //         qseqId: element.qseqId,
      //         qseqType: element.qseqType,
      //         enabled: element.enabled,
      //         qsExam: qsExam,
      //         subType: qsExamQuestion.subType,
      //         qsTkQuestion: qsExamQuestion.qsTkQuestion,
      //         qsXzQuestion: qsExamQuestion.qsXzQuestion,
      //         qsExamQuestion: {
      //           id: qsExamQuestion.id,
      //           testName: qsExam.testName,
      //           subType: qsExamQuestion.subType
      //         }
      //       }
      //       havQss.push(qsinfos)
      //     })
      //   }
      //   _this.form = {
      //     id: this.data.id,
      //     subType: this.data.subType,
      //     trialGrades: this.data.trialGrades,
      //     testName: this.data.testName,
      //     qsExam: this.data,
      //     testDesc: this.data.testDesc,
      //     testFocus: this.data.testFocus,
      //     enabled: this.data.enabled,
      //     createBy: this.data.createBy,
      //     createTime: this.data.createTime,
      //     havQs: havQss
      //   }
      _this.init()
      // })

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
