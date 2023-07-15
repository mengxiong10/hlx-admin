<template>
  <div>
    <el-button v-if="isAdd" size="mini" type="primary" @click="to">充值</el-button>
    <el-button v-if="!isAdd && false" size="mini" type="primary" @click="to">修改</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="isAdd" :is-adds="isAdds"/>
  </div>
</template>
<script>
import eForm from './qsrecharge_form'
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
    }, isAdd: {
      type: Boolean,
      required: true
    },
    isAdds: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      if (this.isAdd) {
        _this.form = {
          id: '',
          deptId: this.data.id,
          deptName: this.data.name,
          ttype: '007001',
          tnumber: '',
          total: '',
          remark: '',
          enabled: '',
          createTime: '',
          createBy: '',
          updateTime: '',
          updateBy: ''
        }
      } else {
        _this.form = {
          id: this.data.id,
          deptId: this.data.deptId,
          deptName: this.data.name,
          tnumber: this.data.tnumber,
          ttype: this.data.ttype,
          currTotal: this.data.currTotal,
          remark: this.data.remark,
          enabled: this.data.enabled,
          createTime: this.data.createTime,
          createBy: this.data.createBy,
          updateTime: this.data.updateTime,
          updateBy: this.data.updateBy
        }
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
