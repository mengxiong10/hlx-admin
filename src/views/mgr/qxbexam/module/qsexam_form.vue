<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增试卷' : '编辑试卷'" width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="90px">

      <el-row>

        <el-col :span="12">
          <el-form-item label="科目" prop="subType">
            <el-select v-model="form.subType" clearable placeholder="科目" class="filter-item">
              <el-option v-for="(item,index) in subTypes" :key="index" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="适用学段" prop="trialGrades">
            <el-select v-model="form.trialGrades" clearable placeholder="适用学段" class="filter-item">
              <el-option v-for="(item,index) in grades" :key="index" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="false" label="所属课程" prop="qstbId">
            <el-select v-model="form.qsTextbook.id" :disabled="loading" clearable filterable placeholder="所属课程" style="width: 200px;" class="filter-item">
              <el-option v-for="(item,index) in qsNames" :key="index" :value="item.id" :label="item.qsName" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="false" :span="12">
          <el-form-item label="条件搜索教材">
            <el-input v-model="qsName" placeholder="条件搜索教材" maxlength="11" style="width: 170px;" class="input-with-select" @keyup.enter.native="getQsTextBook">

              <el-button slot="append" icon="el-icon-search" @click="getQsTextBook" />
            </el-input>

          </el-form-item>
        </el-col>
        <el-col :span="12" />
      </el-row>
      <el-form-item label="图标" prop="imageUrl" >
        <el-input v-model="form.imageUrl" style="width: 300px;" />
        <aliOss ref="tkDiag" @fileUploadHook="updateHeadTkUrl" />
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.tkDiag.dialog = true">上传文件</el-button>
      </el-form-item>
      <el-form-item label="试卷名称" prop="testName">
        <el-input v-model="form.testName" type="textarea" style="width: 400px;" />
      </el-form-item>
      <el-form-item label="序号" prop="testSort">
        <el-input v-model="form.testSort" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="测试描述">
        <el-input v-model="form.testDesc" type="textarea" style="width: 400px;" />
      </el-form-item>
      <el-form-item v-if="false" label="考察侧重点">
        <el-input v-model="form.testFocus" type="textarea" style="width: 400px;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsExam'
import { getByUrlParams } from '@/api/qsTextbook'
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
    grades: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      qsNames: [],
      form: {
        id: '',
        subType: '',
        trialGrades: '',
        testName: '',
        testDesc: '',
        imageUrl: '',
        testFocus: '',
        enabled: '',
        createBy: '',
        testSort: '',
        createTime: ''
      },
      rules: {
        subType: [
          { required: true, message: '请选择科目', trigger: 'blur' }
        ],
        testDesc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        testName: [
          { required: true, message: '请输入试卷名称', trigger: 'blur' }
        ],
        testSort: [{ required: true, message: '请输入试卷序号', trigger: 'blur' }]
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
    getQsTextBook() {
      const sort = 'qsName,asc'
      var params = { page: 0, size: 9999, sort: sort, 'subType': this.form.subType, 'trialGrades': this.form.trialGrades }

      if (this.sup_this.isEmpty(this.form.subType)) {
        return
      }
      // if (this.sup_this.isEmpty(this.form.trialGrades)) {
      // return
      // }
      if (this.isAdd) {
        this.form.qsTextbook.id = null
      }
      this.loading = true
      getByUrlParams('api/qsTextbook', params).then(res => {
        this.loading = false
        this.qsNames = res.content
      })
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
        trialGrades: '',
        testName: '',
        testDesc: '',
        testFocus: '',
        enabled: '',
        imageUrl: '',
        createBy: '',
        createTime: ''
      }
    }
  }
}
</script>

<style scoped>
</style>
