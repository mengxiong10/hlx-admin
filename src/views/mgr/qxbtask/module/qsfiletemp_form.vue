<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="文件类型 文件类型 码表" >
        <el-input v-model="form.fileType" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="文件名称" >
        <el-input v-model="form.fileName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="文件oss名称" >
        <el-input v-model="form.fileOssName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="文件oss访问路经" >
        <el-input v-model="form.fileVisitUrl" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="文件上传路经" >
        <el-input v-model="form.fileContent" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="后缀名" >
        <el-input v-model="form.zzzName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="处理状态 1已处理 0 待处理" >
        <el-input v-model="form.deal" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建时间" >
        <el-input v-model="form.createTime" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsFileTemp'
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
        fileType: '',
        fileName: '',
        fileOssName: '',
        fileVisitUrl: '',
        fileContent: '',
        zzzName: '',
        deal: '',
        createTime: ''
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
        fileType: '',
        fileName: '',
        fileOssName: '',
        fileVisitUrl: '',
        fileContent: '',
        zzzName: '',
        deal: '',
        createTime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
