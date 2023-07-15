<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './qsfiletemp_form'
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
        fileType: this.data.fileType,
        fileName: this.data.fileName,
        fileOssName: this.data.fileOssName,
        fileVisitUrl: this.data.fileVisitUrl,
        fileContent: this.data.fileContent,
        zzzName: this.data.zzzName,
        deal: this.data.deal,
        createTime: this.data.createTime
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
