<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增试卷题目' : '编辑试卷题目'" width="730px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">

      <el-row>
        <el-col :span="12">
          <el-form-item label="科目" >
            <el-select v-model="form.subType" :disabled="!isAdd" clearable placeholder="科目" style="width: 200px;" class="filter-item">
              <el-option v-for="(item,index) in subTypes" :key="index" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="12">
          <el-form-item label="序号" >
            <el-input v-model="form.unitSort" style="width: 200px;"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item v-if="form.qsTkQuestion" label="填空题目">
        <el-input v-model="form.qsTkQuestion" type="textarea" style="width: 460px;"/>
      </el-form-item>
      <el-row v-if="form.qsTkQuestion">
        <el-col :span="9">
          <el-form-item label="填空题文件名" >
            <el-input v-model="form.qsTkFileName" style="width: 120px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="填空题文件路径" >
            <el-input v-model="form.qsTkFileUrl" style="width: 200px;" />
            <aliOss ref="tkDiag" @fileUploadHook="updateHeadTkUrl" />
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.tkDiag.dialog = true">上传文件</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item v-if="form.qsTkQuestion" label="填空题答案">
        <el-input v-model="form.qsTkAnswer" type="textarea" style="width: 460px;"/>
      </el-form-item>

      <el-form-item v-if="form.qsXzQuestion" label="选择题目" >
        <el-input v-model="form.qsXzQuestion" type="textarea" style="width: 460px;"/>
      </el-form-item>
      <el-row v-if="form.qsXzQuestion" >
        <el-col :span="9">
          <el-form-item label="选择题文件名" >
            <el-input v-model="form.qsXzFileName" style="width: 120px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="选择题文件路径" >
            <el-input v-model="form.qsXzFileUrl" style="width: 200px;"/>
            <aliOss ref="xzDiag" @fileUploadHook="updateXzHeadUrl" />
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.xzDiag.dialog = true">上传文件</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="form.qsXzQuestion" label="选择题答案" >
        <el-input v-model="form.qsXzAnswer" type="textarea" style="width: 460px;"/>
      </el-form-item>
      <el-row v-if="form.qsXzQuestion" :gutter="3" class="form_add_top_title" >

        <el-col :span="2">
          <div class="grid-content bg-purple-light add_btn_add"><span @click="addSubItem">增加 <i class="el-icon-circle-plus-outline" /></span></div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-light">选项序号</div>
        </el-col>
        <el-col v-if="false" :span="1">
          <div class="grid-content bg-purple-light">提示</div>
        </el-col>
        <el-col :span="17">
          <div class="grid-content bg-purple-light">选项</div>
        </el-col>
        <el-col v-if="false" :span="1">
          <div class="grid-content bg-purple-light">翻译</div>
        </el-col>
        <el-col v-if="false" :span="1">
          <div class="grid-content bg-purple-light">附件</div>
        </el-col>

      </el-row>
      <el-row v-for="(sub,index) in form.qsExamQuestionJnls" :key="sub.key" :gutter="5" class="item_boder">

        <el-col :span="2" style="text-align: center;">
          <div class="grid-content bg-purple-light add_btn_add add_btn_add_line">
            <i class="el-icon-circle-plus-outline" @click="addSubItem" />
            <i class="el-icon-remove-outline" @click="deleteSubItem(sub, index)" />
          </div>
        </el-col>

        <el-col :span="2">
          <div class="grid-content bg-purple-light">
            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              <el-input v-model="sub.jnlName" type="textarea" />
            </el-form-item>
          </div>
        </el-col>
        <el-col v-if="false" :span="1">
          <div class="grid-content bg-purple-light">

            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              <el-input v-model="sub.jnlTips" type="textarea" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="17">
          <div class="grid-content bg-purple-light">

            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              <el-input v-model="sub.jnlContent" type="textarea" />
            </el-form-item>
          </div>
        </el-col>
        <el-col v-if="false" :span="1">
          <div class="grid-content bg-purple-light">
            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              <el-input v-model="sub.jnlTranslation" type="textarea" />
            </el-form-item>
          </div>
        </el-col>
        <el-col v-if="false" :span="1">
          <div class="grid-content bg-purple-light">
            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              <el-input v-model="sub.jnlUrl" style="width: 100px;" />

              <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="uploads(sub,index)">上传文件</el-button>
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
import aliOss from '@/components/AlyOss'
import { add, edit } from '@/api/qsExamQuestion'
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
    },

    tipsCode: {
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
        qsExam: {},

        unitSort: '',
        qsTkQuestion: '',
        qsTkFileName: '',
        qsTkFileUrl: '',
        qsTkFileType: '',
        qsTkAnswer: '',

        qsXzQuestion: '',
        qsXzFileName: '',
        qsXzFileUrl: '',
        qsXzFileType: '',
        qsXzAnswer: '',

        createBy: '',
        createTime: '',
        enabled: '',
        qsExamQuestionJnls: [{
          id: '',
          qseqId: '',
          jnlName: '',
          jnlTips: '',
          jnlContent: '',
          jnlTranslation: '',
          jnlType: '',
          jnlUrl: '',
          tsort: '',
          createBy: ''
        }]
      },
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    addSubItem() {
      this.form.qsExamQuestionJnls.push({
        jnlId: '',
        jnlName: '',
        jnlTips: '',
        jnlContent: '',
        jnlTranslation: '',
        jnlType: '',
        tsort: '',
        jnlUrl: ''
      })
    },
    deleteSubItem(item, index) {
      this.index = this.form.qsExamQuestionJnls.indexOf(item)
      if (index !== -1) {
        this.form.qsExamQuestionJnls.splice(index, 1)
      }
    },
    updateHeadTkUrl(fileUrl) {
      console.info(fileUrl)
      this.form.qsTkFileUrl = fileUrl
      this.form.qsTkFileName = this.getFileName(fileUrl)
    },
    updateXzHeadUrl(fileUrl) {
      console.info(fileUrl)
      this.form.qsXzFileUrl = fileUrl
      this.form.qsXzFileName = this.getFileName(fileUrl)
    },
    getFileName(o) {
      var pos = o.lastIndexOf('/')
      var name = o.substring(pos + 1).split('_')
      var namezz = name[1].split('.')[1]
      return name[0] + '.' + namezz
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
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
        qsExam: {},
        unitSort: '',
        qsTkQuestion: '',
        qsTkFileName: '',
        qsTkFileUrl: '',
        qsTkFileType: '',
        qsTkAnswer: '',

        qsXzQuestion: '',
        qsXzFileName: '',
        qsXzFileUrl: '',
        qsXzFileType: '',
        qsXzAnswer: '',

        createBy: '',
        createTime: '',
        enabled: '',
        qsExamQuestionJnls: [{
          id: '',
          qseqId: '',
          jnlName: '',
          jnlTips: '',
          jnlContent: '',
          jnlTranslation: '',
          jnlType: '',
          jnlUrl: '',
          tsort: '',
          createBy: ''
        }]
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
