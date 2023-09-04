<template>
  <el-dialog
    :append-to-body="true"
    :visible="visible"
    :title="initialData ? '编辑消息' : '新增消息'"
    width="600px"
    @close="handleCancel"
  >
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容" prop="newsContent">
        <el-input v-model="form.newsContent" :rows="2" type="textarea" />
      </el-form-item>
      <el-form-item label="接收人" prop="receiver">
        <el-select
          v-model="form.receiver"
          :remote-method="getOptions"
          :loading="loadingData"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.real_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="handleCancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="handleSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, searchUser } from '@/api/qsMessage'

export default {
  props: {
    initialData: {
      type: Object,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    onSuccess: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        receiver: '',
        title: '',
        newsContent: '',
      },
      rules: {
        receiver: [{ required: true, message: '请选择课程', trigger: 'blur' }],
        newsContent: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        title: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
      },
      loading: false,
      loadingData: false,
      options: [],
    }
  },
  watch: {
    visible(value) {
      if (value) {
        if (this.initialData) {
          Object.keys(this.form).forEach((key) => {
            this.form[key] = this.initialData[key]
          })
        }
      }
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          return false
        }
      })
    },
    getOptions(name) {
      this.loadingData = true
      searchUser(name)
        .then((res) => {
          this.options = res.content
          this.loadingData = false
        })
        .catch(() => {
          this.loadingData = false
        })
    },
    async submit() {
      try {
        this.loading = true
        if (this.initialData) {
          await edit({ id: this.initialData.id, ...this.form })
        } else {
          await add(this.form)
        }
        this.$message.success('保持成功')
        this.loading = false
        this.handleCancel()
        this.onSuccess()
      } catch (error) {
        this.loading = false
      }
    },
    handleCancel() {
      this.$refs['form'].resetFields()
      this.onClose()
    },
  },
}
</script>
