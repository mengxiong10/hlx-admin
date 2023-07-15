<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" :sub-types="subTypes" :upload-file-type="uploadFileType"/>
  </div>
</template>
<script>
import eForm from './qsinfo_form'
import { qsInfoJnlByQinfoId } from '@/api/qsInfoJnl'
import { qsInfoUnits } from '@/api/qsTextbookTwo'
import { isEmpty } from '@/utils/index'

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
    uploadFileType: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form

      var params = { 'qsinfoId': this.data.id }
      qsInfoUnits({ 'qstbId': this.data.qsTextbookTwo.qstbId }).then(res => {
        _this.qsUnits = res
      })

      qsInfoJnlByQinfoId(params).then(res => {
        _this.form = {
          id: this.data.id,
          subType: this.data.subType,
          qsName: this.data.qsTextbookTwo.qsTextbook.qsName,
          qsUnit: this.data.qsTextbookTwo.qsUnit,
          qstbsId: this.data.qstbsId,
          qsUnitSort: this.data.qsUnitSort,
          qsCharacter: isEmpty(this.data.qsCharacter) ? '' : this.data.qsCharacter,
          qsContent: isEmpty(this.data.qsContent) ? '' : this.data.qsContent,
          qsXzFileUrl: isEmpty(this.data.qsXzFileUrl) ? '' : this.data.qsXzFileUrl,
          qsXzFileType: isEmpty(this.data.qsXzFileType) ? '' : this.data.qsXzFileType,
          qsXzFileName: isEmpty(this.data.qsXzFileName) ? '' : this.data.qsXzFileName,
          qsTkFileName: isEmpty(this.data.qsTkFileName) ? '' : this.data.qsTkFileName,
          qsTkFileType: isEmpty(this.data.qsTkFileType) ? '' : this.data.qsTkFileType,
          qsTkFileUrl: isEmpty(this.data.qsTkFileUrl) ? '' : this.data.qsTkFileUrl,
          qsImgUrl: isEmpty(this.data.qsImgUrl) ? '' : this.data.qsImgUrl,
          qsImgName: isEmpty(this.data.qsImgName) ? '' : this.data.qsImgName,
          qsVideoUrl: isEmpty(this.data.qsVideoUrl) ? '' : this.data.qsVideoUrl,
          qsVideoName: isEmpty(this.data.qsVideoName) ? '' : this.data.qsVideoName,
          qsAudioUrl: isEmpty(this.data.qsAudioUrl) ? '' : this.data.qsAudioUrl,
          qsAudioName: isEmpty(this.data.qsAudioName) ? '' : this.data.qsAudioName,
          qsTranslation: isEmpty(this.data.qsTranslation) ? '' : this.data.qsTranslation,
          qsAnalysis: isEmpty(this.data.qsAnalysis) ? '' : this.data.qsAnalysis,
          qsTkQuestion: isEmpty(this.data.qsTkQuestion) ? '' : this.data.qsTkQuestion,
          qsTkTipsType: isEmpty(this.data.qsTkTipsType) ? '' : this.data.qsTkTipsType,
          qsTkTipsName: isEmpty(this.data.qsTkTipsName) ? '' : this.data.qsTkTipsName,
          qsTkTipsFileType: isEmpty(this.data.qsTkTipsFileType) ? '' : this.data.qsTkTipsFileType,
          qsTkTipsUrl: isEmpty(this.data.qsTkTipsUrl) ? '' : this.data.qsTkTipsUrl,
          qsTkTips: isEmpty(this.data.qsTkTips) ? '' : this.data.qsTkTips,
          qsTkAnswer: isEmpty(this.data.qsTkAnswer) ? '' : this.data.qsTkAnswer,
          qsXzQuestion: isEmpty(this.data.qsXzQuestion) ? '' : this.data.qsXzQuestion,
          qsXzTips: isEmpty(this.data.qsXzTips) ? '' : this.data.qsXzTips,
          qsXzTipsType: isEmpty(this.data.qsXzTipsType) ? '' : this.data.qsXzTipsType,
          qsXzTipsName: isEmpty(this.data.qsXzTipsName) ? '' : this.data.qsXzTipsName,
          qsXzTipsFileType: isEmpty(this.data.qsXzTipsFileType) ? '' : this.data.qsXzTipsFileType,
          qsXzTipsUrl: isEmpty(this.data.qsXzTipsUrl) ? '' : this.data.qsXzTipsUrl,
          qsXzAnswer: isEmpty(this.data.qsXzAnswer) ? '' : this.data.qsXzAnswer,
          createBy: this.data.createBy,
          createTime: this.data.createTime,
          enabled: this.data.enabled,
          qsInfoJnls: res
        }
      })

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
