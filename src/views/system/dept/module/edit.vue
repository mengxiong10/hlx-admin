<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :grades="grades" :is-add="false" :dicts="dicts"/>
  </div>
</template>
<script>
import eForm from './form'
import { TextToCode } from 'element-china-area-data'

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
    dicts: {
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
      _this.getDepts()
      var selectedOptions = []
      console.log(this.data.province)
      if (this.data.province !== '' && this.data.city !== '' && this.data.county !== '') {
        selectedOptions.push(TextToCode[this.data.province][this.data.city][this.data.county].code)
      }
      _this.selectedOptions = selectedOptions

      _this.form = {
        id: this.data.id,
        name: this.data.name,
        grade: this.data.grade,
        descInfo: this.data.descInfo,
        address: this.data.address,
        county: this.data.county,
        city: this.data.city,
        province: this.data.province,
        telphone: this.data.telphone,
        cellphone: this.data.cellphone,
        contact: this.data.contact,
        pid: this.data.pid,
        createTime: this.data.createTime,
        total: this.data.total,
        enabled: this.data.enabled.toString()
      }
      _this.searchAddress()
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
