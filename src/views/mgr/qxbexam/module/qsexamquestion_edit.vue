<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" :grades="grades" :sub-types="subTypes" :tips-code="tipsCode"/>
  </div>
</template>
<script>
import eForm from './qsexamquestion_form'
import { getByQseqId } from '@/api/qsExamQuestionJnl'
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

    tipsCode: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      getByQseqId({ qseqId: this.data.id }).then(res => {
        const _this = this.$refs.form
        _this.form = {
          id: this.data.id,
          subType: this.data.subType,
          qsTextbook: this.data.qsTextbook,

          unitSort: this.data.unitSort,
          qsTkQuestion: this.data.qsTkQuestion,
          qsTkFileName: this.data.qsTkFileName,
          qsTkFileUrl: this.data.qsTkFileUrl,
          qsTkFileType: this.data.qsTkFileType,
          qsTkAnswer: this.data.qsTkAnswer,

          qsXzQuestion: this.data.qsXzQuestion,
          qsXzFileName: this.data.qsXzFileName,
          qsXzFileUrl: this.data.qsXzFileUrl,
          qsXzFileType: this.data.qsXzFileType,
          qsXzAnswer: this.data.qsXzAnswer,

          createBy: this.data.createBy,
          createTime: this.data.createTime,
          enabled: this.data.enabled,
          qsExamQuestionJnls: res
        }
        _this.dialog = true
      })
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
