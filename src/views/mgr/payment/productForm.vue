<template>
  <el-dialog
    :append-to-body="true"
    :visible="visible"
    :title="initialData ? '编辑商品' : '新增商品'"
    width="600px"
    @close="handleCancel"
  >
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="80px">
      <el-form-item label="课程" prop="qstb_id">
        <el-select
          :disabled="!!initialData"
          v-model="form.qstb_id"
          :remote-method="getTextbook"
          :loading="loadingData"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词搜索"
        >
          <el-option v-for="item in options" :key="item.id" :label="item.qsName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="title">
        <el-input v-model="form.title" :rows="2" type="textarea" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number v-model="form.price" :min="1" controls-position="right" />
      </el-form-item>
      <el-form-item label="佣金" prop="rebate">
        <el-input-number v-model="form.rebate" :min="0" controls-position="right" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="handleCancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="handleSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, searchTextbook } from '@/api/product'

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
        qstb_id: '',
        title: '',
        price: 1,
        rebate: 0,
      },
      rules: {
        qstb_id: [{ required: true, message: '请选择课程', trigger: 'blur' }],
        title: [{ required: true, message: '无能为空', trigger: 'blur' }],
        price: [
          { required: true, message: '价格不能为空', trigger: 'blur' },
          { type: 'number', message: '价格必须为数字值' },
        ],
        rebate: [
          { required: true, message: '佣金不能为空', trigger: 'blur' },
          { type: 'number', message: '佣金必须为数字值' },
        ],
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
    getTextbook(name) {
      this.loadingData = true
      searchTextbook(name)
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
