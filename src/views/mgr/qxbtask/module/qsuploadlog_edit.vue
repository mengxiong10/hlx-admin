<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './qsuploadlog_form'
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
        uploadFileName: this.data.uploadFileName,
        uploadFilePath: this.data.uploadFilePath,
        dealSuccessCount: this.data.dealSuccessCount,
        dealFailCount: this.data.dealFailCount,
        startDealTime: this.data.startDealTime,
        endDealTime: this.data.endDealTime,
        dealStatus: this.data.dealStatus,
        errorFilePath: this.data.errorFilePath,
        errorFileName: this.data.errorFileName,
        errorCode: this.data.errorCode,
        errorMsg: this.data.errorMsg,
        createTime: this.data.createTime,
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
