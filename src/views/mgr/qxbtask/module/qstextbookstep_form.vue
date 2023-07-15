<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="设置学习步骤" width="900px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="课程名称：">
        {{ form.qsTextbook!=null?form.qsTextbook.qsName:'' }}
      </el-form-item>

      <el-row :gutter="3" class="form_add_top_title">

        <el-col :span="2">
          <div class="grid-content bg-purple-light add_btn_add"><span @click="addSubItem">增加 <i class="el-icon-circle-plus-outline" /></span></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">步骤顺序</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">显示步骤名称</div>
        </el-col>
        <el-col v-if="false" :span="6">
          <div class="grid-content bg-purple-light">对内显示名称</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">实际步骤名称</div>
        </el-col>

      </el-row>
      <el-row v-for="(sub,index) in form.setps" :key="sub.key" :gutter="5" class="item_boder">

        <el-col :span="2" style="text-align: center;">
          <div class="grid-content bg-purple-light add_btn_add add_btn_add_line">
            <i class="el-icon-circle-plus-outline" @click="addSubItem" />
            <i class="el-icon-remove-outline" @click="deleteSubItem(sub, index)" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              <el-input v-model="sub.stepNum" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              <el-input v-model="sub.outName" type="textarea" />
            </el-form-item>
          </div>
        </el-col>
        <el-col v-if="false" :span="6">
          <div class="grid-content bg-purple-light">

            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              <el-input v-model="sub.inName" type="textarea" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">

            <el-form-item class="llll grid-content bg-purple rules add_top-f">

              <el-select v-model="sub.stepValue" clearable placeholder="实际步骤名称" style="width: 200px;" class="filter-item" >
                <el-option v-for="(item,index) in qsInfoType" :key="index" :value="item.value" :label="item.label" />
              </el-select>

            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsTextbookStep'
import { dictName } from '@/api/dictDetail'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      qsInfoType: [],
      form: {
        id: '',
        qstbId: '',
        outName: '',
        inName: '',
        stepNum: '',
        stepValue: '',
        setps: [{
          id: '',
          qsTextbook: {},
          outName: '',
          inName: '',
          stepNum: '',
          stepValue: ''
        }]
      },

      rules: {
      }
    }
  },
  methods: {
    addSubItem() {
      console.log(this.form.setps)
      this.form.setps.push({
        id: '',
        qsTextbook: this.data,
        outName: '',
        inName: '',
        stepNum: this.form.setps.length + 1,
        stepValue: ''
      })
    },
    deleteSubItem(item, index) {
      this.index = this.form.setps.indexOf(item)
      if (index !== -1) {
        this.form.setps.splice(index, 1)
      }
    },
    dictName(name) {
      dictName(name).then(res => {
        if (name === 'qsinfo_type_code') {
          this.qsInfoType = res
        }
      })
    },

    cancel() {
      this.resetForm()
    },
    doSubmit() {
      /* const ary = []
      this.form.setps.forEach(item => {
        ary.push(item.stepValue)
      })
      const nary = ary.slice().sort()
      for (let i = 0; i < ary.length; i++) {
        if (nary[i] === nary[i + 1]) {
          var n = nary[i]
          var ca = ''
          this.qsInfoType.forEach(res => {
            if (res.value === n) {
              ca = res.label
            }
          })
          var msg = '步骤被重复安排：' + ca + '(' + n + ')'
          this.showinfo(msg)
          return
        }
      }*/
      this.loading = true
      console.log(this.form)
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    showinfo(msg) {
      this.$notify({
        title: msg,
        type: 'error',
        duration: 2500
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.showmsg(res)
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.showmsg(res)
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    showmsg(res) {
      var info = 'error'
      var msg = res.respMsg
      this.loading = false
      if (res.respCode === '000000') {
        msg = res.respBody
        info = 'success'
        this.resetForm()

        this.sup_this.init()
      }

      this.$notify({
        title: msg,
        type: info,
        duration: 2500
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        qsTextbook: '',
        outName: '',
        inName: '',
        stepNum: '',
        stepValue: '',
        setps: []
      }
    }
  }
}
</script>

<style scoped>
.item_boder {
  border: 1px solid rgb(234, 234, 221);
  padding: 1px 0;
  margin-bottom: -1px;
}
.add_btn_add {
  color: #409eff;
  font-weight: bold;
  cursor: pointer;
}
.form_add_top_title {
  background: #f1f1f1 !important;
  padding: 5px 0;
  text-align: center;
}
.add_btn_add_line {
  height: 34px;
  line-height: 34px;
}
.item_boder .el-form-item {
  margin-bottom: 0px;
}
.add_top-f {
  margin-top: 0px;
  padding: 0px;
}
.add_top-f .el-form-item__error {
  padding-top: 0px !important;
}
</style>
<style lang="scss">
.llll.el-form-item--small .el-form-item__content {
  margin-left: 0 !important;
  text-align: center !important;
}
</style>
