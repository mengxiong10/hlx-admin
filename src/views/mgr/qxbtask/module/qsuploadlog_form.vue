<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="上传文件名称" >
        <el-input v-model="form.uploadFileName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="上传文件存放路径" >
        <el-input v-model="form.uploadFilePath" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="处理成功条数" >
        <el-input v-model="form.dealSuccessCount" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="处理失败条数" >
        <el-input v-model="form.dealFailCount" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="开始处理时间" >
        <el-input v-model="form.startDealTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="结束处理时间" >
        <el-input v-model="form.endDealTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="处理状态：处理中，处理完成" >
        <el-input v-model="form.dealStatus" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="错误文件下载地址" >
        <el-input v-model="form.errorFilePath" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="错误文件名称" >
        <el-input v-model="form.errorFileName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="错误编码" >
        <el-input v-model="form.errorCode" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="错误说明" >
        <el-input v-model="form.errorMsg" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建时间" >
        <el-input v-model="form.createTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建人ID" >
        <el-input v-model="form.createBy" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsUploadLog'
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
      form: {
        id: '',
        uploadFileName: '',
        uploadFilePath: '',
        dealSuccessCount: '',
        dealFailCount: '',
        startDealTime: '',
        endDealTime: '',
        dealStatus: '',
        errorFilePath: '',
        errorFileName: '',
        errorCode: '',
        errorMsg: '',
        createTime: '',
        createBy: ''
      },
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        uploadFileName: '',
        uploadFilePath: '',
        dealSuccessCount: '',
        dealFailCount: '',
        startDealTime: '',
        endDealTime: '',
        dealStatus: '',
        errorFilePath: '',
        errorFileName: '',
        errorCode: '',
        errorMsg: '',
        createTime: '',
        createBy: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
