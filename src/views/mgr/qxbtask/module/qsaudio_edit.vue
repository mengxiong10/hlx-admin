<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :sub-types="subTypes" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './qsaudio_form'
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
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        word: this.data.word,
        audioType: this.data.audioType,
        audioUrl: this.data.audioUrl,
        enabled: this.data.enabled,
        translation: this.data.translation,
        transFlag: this.transFlag,
        audioFilePath: this.audioFilePath,
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
