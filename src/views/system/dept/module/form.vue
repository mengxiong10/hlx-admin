<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增部门' : '设置部门'" width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="form.contact" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="联系电话" prop="cellphone">
        <el-input v-model="form.cellphone" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-select v-model="form.grade" clearable placeholder="年级" class="filter-item" style="width: 370px">
          <el-option v-for="item in grades" :key="item.key" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="false" label="部门电话" prop="telphone">
        <el-input v-model="form.telphone" style="width: 370px;" />
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-form-item label="省/市/县" prop="province">
            <el-cascader :options="options" v-model="selectedOptions" style="width: 370px;" placeholder="请选择所在省/市/县" @change="handleChange"/>

          </el-form-item>
        </el-col>

      </el-row>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="form.address" type="textarea" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="部门简介" prop="descInfo">
        <el-input v-model="form.descInfo" type="textarea" style="width: 370px;" />
      </el-form-item>

      <el-form-item v-if="form.pid !== 0" label="状态" prop="enabled">
        <el-radio v-for="item in dicts" :key="item.id" v-model="form.enabled" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item v-if="form.pid !== 0" style="margin-bottom: 0px;" label="上级部门">
        <treeselect v-model="form.pid" :options="depts" style="width: 370px;" placeholder="选择上级类目" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, getDepts, searchAddress } from '@/api/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { regionData, CodeToText } from 'element-china-area-data'

export default {
  components: { Treeselect },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
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
  data() {
    return {
      loading: false, dialog: false, depts: [],
      countys: [],
      citys: [],
      provinces: [],
      options: regionData,
      selectedOptions: [],
      form: {
        id: '',
        name: '',
        descInfo: '',
        address: '',
        county: '',
        city: '',
        province: '',
        telphone: '',
        cellphone: '',
        contact: '',
        createTime: '',
        total: '',
        pid: 1,
        enabled: 'true',
        grade: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        cellphone: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        descInfo: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    handleChange(value) {
      this.form.province = CodeToText[value[0]]
      this.form.city = CodeToText[value[1]]
      this.form.county = CodeToText[value[2]]
    },
    searchAddress() {
      // 获取第一级
      var params = { 'province': '', 'city': '' }
      searchAddress(params).then(res => {
        this.provinces = res.respBody
        console.log(res)
      })
      // 获取第二级
      var params1 = { 'province': this.form.province, 'city': '' }
      searchAddress(params1).then(res => {
        this.citys = res.respBody
      })
      // 获取第三级
      var params2 = { 'province': this.form.province, 'city': this.form.city }
      searchAddress(params2).then(res => {
        this.countys = res.respBody
      })
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.pid !== undefined) {
            this.loading = true
            if (this.isAdd) {
              this.doAdd()
            } else this.doEdit()
          } else {
            this.$message({
              message: '上级部门不能为空',
              type: 'warning'
            })
          }
        }
      })
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
        name: '',
        descInfo: '',
        address: '',
        county: '',
        city: '',
        province: '',
        telphone: '',
        total: '',
        cellphone: '',
        contact: '',
        createTime: '',
        pid: 1,
        enabled: 'true'
      }
    },
    getDepts() {
      getDepts({ enabled: true }).then(res => {
        res.content.forEach(item => {
          item.children = []
        })
        this.depts = res.content
      })
    }
  }
}
</script>

<style scoped>
</style>
