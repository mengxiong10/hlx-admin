<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增课程目录' : '编辑课程目录'" width="650px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">

      <el-form-item label="科目" prop="subType">
        <el-select v-model="form.subType" clearable placeholder="科目" style="width: 200px;" class="filter-item">
          <el-option v-for="(item,index) in subTypes" :key="index" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="false" label="适用学段" prop="trialGrades">
        <el-select v-model="form.trialGrades" clearable placeholder="适用学段" style="width: 370px;" class="filter-item">
          <el-option v-for="(item,index) in grades" :key="index" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="课程图标" prop="imageUrl" >
        <el-input v-model="form.imageUrl" style="width: 270px;" />
        <aliOss ref="tkDiag" @fileUploadHook="updateHeadTkUrl" />
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.tkDiag.dialog = true">上传文件</el-button>
      </el-form-item>
      <el-form-item label="课程名称" prop="qsName">
        <el-input v-model="form.qsName" type="textarea" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="课程描述" prop="qsDesc">
        <el-input v-model="form.qsDesc" type="textarea" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="适配终端" prop="authType">
        <el-select v-model="form.authType" clearable placeholder="适配终端" class="filter-item" style="width: 370px">
          <el-option v-for="item in stuauths" :key="item.key" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="有效天数" prop="effectiveDays">
        <el-input v-model="form.effectiveDays" type="number" style="width: 370px;" @keyup.native="eproving" />
      </el-form-item>
      <el-form-item label="扣除点数" prop="deductionPoints">
        <el-input v-model="form.deductionPoints" type="number" style="width: 370px;" @keyup.native="proving" />
      </el-form-item>
      <el-form-item label="科目内序号" prop="torder">
        <el-input v-model="form.torder" type="number" style="width: 370px;" @keyup.native="proving" />
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsTextbook'
import aliOss from '@/components/AlyOss'

export default {
  components: { aliOss },

  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
    subTypes: {
      type: Array,
      required: true
    },
    stuauths: {
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
      loading: false, dialog: false,
      form: {
        id: '',
        subType: '',
        qsName: '',
        deductionPoints: '',
        trialGrades: '',
        createBy: '',
        createTime: '',
        imageUrl: '',
        qsDesc: '',
        authType: '',
        enabled: '',
        effectiveDays: '',
        torder: ''
      },
      rules: {
        subType: [
          { required: true, message: '请选择科目', trigger: 'blur' }
        ],
        trialGrades: [
          { required: true, message: '请选择适用学段', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请选择课程图标', trigger: 'blur' }
        ],
        qsName: [{ required: true, message: '请输入教材', trigger: 'blur' }],
        torder: [{ required: true, message: '请输入排序号', trigger: 'blur' }],
        deductionPoints: [{ required: true, message: '请输入正确的正整数的扣除点数', trigger: 'blur' }],
        effectiveDays: [{ required: true, message: '请输入正确的有效天数', trigger: 'blur' }]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    updateHeadTkUrl(fileUrl) {
      console.info(fileUrl)
      this.form.imageUrl = fileUrl
    },
    proving() {
      this.form.deductionPoints = this.form.deductionPoints.replace(/[^\.\d]/g, '')
      this.form.deductionPoints = this.form.deductionPoints.replace('.', '')
    },
    eproving() {
      this.form.effectiveDays = this.form.effectiveDays.replace(/[^\.\d]/g, '')
      this.form.effectiveDays = this.form.effectiveDays.replace('.', '')
    },
    doSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        }
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
        subType: '',
        qsName: '',
        deductionPoints: '',
        trialGrades: '',
        createBy: '',
        imageUrl: '',
        qsDesc: '',
        authType: '',
        createTime: '',
        enabled: '',
        effectiveDays: '',
        torder: ''
      }
    }
  }
}
</script>

<style scoped>
</style>
