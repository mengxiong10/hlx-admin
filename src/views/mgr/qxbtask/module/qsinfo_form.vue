<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增内容' : '编辑内容'" fullscreen width="1200px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="130px">
      <el-row :span="24">
        <el-col :span="8">
          <el-form-item label="科目" prop="subType" >
            <el-select v-model="form.subType" readonly clearable placeholder="科目" style="width: 200px;" class="filter-item">
              <el-option v-for="(item,index) in subTypes" :key="index" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="课程名称" prop="qsName">
            <el-input v-model="form.qsName" readonly style="width: 200px;" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单元名" prop="qsUnit">
            <el-select v-model="form.qsUnit" readonly clearable placeholder="单元名" style="width: 200px;" class="filter-item" @change="ch">
              <el-option v-for="(item,index) in qsUnits" :key="index" :value="item.qsUnit" :label="item.qsUnit" />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :span="24">
        <el-col :span="8">
          <el-form-item label="单元内序号" prop="qsUnitSort" >
            <el-input v-model="form.qsUnitSort" style="width: 200px;" type="textarea"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色" >
            <el-input v-model="form.qsCharacter" style="width: 200px;" type="textarea"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="原文" prop="qsContent">
            <el-input v-model="form.qsContent" style="width: 200px;" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="音频文件路径" >
            <el-input v-model="form.qsAudioUrl" style="width: 200px;" placeholder="请上传mp3格式文件" />
            <aliOss ref="audioDiag" @fileUploadHook="updateAudioHeadUrl" />
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.audioDiag.dialog = true">上传文件</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="视频文件路径">
            <el-input v-model="form.qsVideoUrl" style="width: 200px;" placeholder="请上传mp4格式或wmv格式文件"/>
            <aliOss ref="videoDiag" @fileUploadHook="updateVideoHeadUrl" />
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.videoDiag.dialog = true">上传文件</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="图片文件路径" >
            <el-input v-model="form.qsImgUrl" style="width: 200px;" placeholder="请上传图片格式" />
            <aliOss ref="imgDiag" @fileUploadHook="updateImgHeadUrl" />
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.imgDiag.dialog = true">上传文件</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="8">
          <el-form-item label="译文" >
            <el-input v-model="form.qsTranslation" style="width: 200px;" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="解析" >
            <el-input v-model="form.qsAnalysis" style="width:640px;" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="8">
          <el-form-item label="填空题目文字" >
            <el-input v-model="form.qsTkQuestion" style="width: 200px;" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="填空题目文件路径" >
            <el-input v-model="form.qsTkFileUrl" style="width: 200px;" />
            <aliOss ref="tkDiag" @fileUploadHook="updateHeadTkUrl" />
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.tkDiag.dialog = true">上传文件</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="填空题答案" >
            <el-input v-model="form.qsTkAnswer" style="width: 200px;" placeholder="用|割开" type="textarea" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :span="24">
        <el-col :span="16">
          <el-form-item label="填空题提示文字" >
            <el-input v-model="form.qsTkTips" style="width: 640px;" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="填空题提示文件路径">
            <el-input v-model="form.qsTkTipsUrl" style="width: 200px;" />
            <aliOss ref="tkTipsDiag" @fileUploadHook="updateHeadTkTipsUrl" />
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.tkTipsDiag.dialog = true">上传文件</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="8">
          <el-form-item label="选择题目文字" >
            <el-input v-model="form.qsXzQuestion" style="width: 200px;" type="textarea" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="选择题目文件路径" >
            <el-input v-model="form.qsXzFileUrl" style="width: 200px;" />
            <aliOss ref="xzDiag" @fileUploadHook="updateXzHeadUrl" />
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.xzDiag.dialog = true">上传文件</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择题答案" >
            <el-input v-model="form.qsXzAnswer" style="width: 200px;" placeholder="用|割开" type="textarea" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="选择题提示文字" >
            <el-input v-model="form.qsXzTips" style="width: 640px;" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择题提示文件路径">
            <el-input v-model="form.qsXzTipsUrl" style="width: 200px;"/>
            <aliOss ref="xzTipsDiag" @fileUploadHook="updateHeadXzTipsUrl" />
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.xzTipsDiag.dialog = true">上传文件</el-button>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="3" class="form_add_top_title">

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
      <el-row v-for="(sub,index) in form.qsInfoJnls" :key="sub.key" :gutter="5" class="item_boder">

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
      <aliOss ref="jnlDiag" @fileUploadHook="updateHeadUrlJnl" />
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsInfo'
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
      default: null
    },
    subTypes: {
      type: Array,
      required: true
    },

    uploadFileType: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      nowitem: '',
      nowindex: '',
      qsUnits: [],
      form: {
        id: '',
        subType: '',
        qsName: '',
        qsUnit: '',
        qstbsId: '',
        qsUnitSort: '',
        qsCharacter: '',
        qsContent: '',
        qsTranslation: '',
        qsAnalysis: '',
        qsTkQuestion: '',
        qsTipsType: '',
        qsTkTips: '',
        qsTkAnswer: '',
        qsXzQuestion: '',
        qsXzTips: '',
        qsXzAnswer: '',
        createBy: '',
        createTime: '',
        qsXzFileUrl: '',
        qsXzFileType: '',
        qsXzFileName: '',
        qsTkFileName: '',
        qsTkFileType: '',
        qsTkFileUrl: '',
        qsImgUrl: '',
        qsImgName: '',
        qsVideoUrl: '',
        qsVideoName: '',
        qsAudioUrl: '',
        qsAudioName: '',
        enabled: '',
        qsInfoJnls: [{
          id: '',
          qsinfoId: '',
          jnlName: '',
          jnlTips: '',
          jnlContent: '',
          jnlTranslation: '',
          jnlType: '',
          jnlUrl: '',
          createBy: ''
        }]
      },
      rules: {
        subType: [
          { required: true, message: '请选择科目', trigger: 'blur' }
        ],
        qsName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        qsUnit: [{ required: true, message: '请输入单元名', trigger: 'blur' }],
        qsUnitSort: [{ required: true, message: '请输入单元内序号', trigger: 'blur' }]
        // qsContent: [{ required: true, message: '请输入内容', trigger: 'blur' }],

      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    ch() {
      this.qsUnits.forEach(res => {
        if (res.qsUnit === this.form.qsUnit) {
          this.form.qstbsId = res.id
        }
      })
    },
    addSubItem() {
      this.form.qsInfoJnls.push({
        jnlId: '',
        jnlName: '',
        jnlTips: '',
        jnlContent: '',
        jnlTranslation: '',
        jnlType: '',
        jnlUrl: ''
      })
    },
    deleteSubItem(item, index) {
      this.index = this.form.qsInfoJnls.indexOf(item)
      if (index !== -1) {
        this.form.qsInfoJnls.splice(index, 1)
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
    updateAudioHeadUrl(fileUrl) {
      console.info(fileUrl)
      this.form.qsAudioUrl = fileUrl
      this.form.qsAudioName = this.getFileName(fileUrl)
    },
    updateVideoHeadUrl(fileUrl) {
      console.info(fileUrl)
      this.form.qsVideoUrl = fileUrl
      this.form.qsVideoName = this.getFileName(fileUrl)
    },
    updateHeadTkTipsUrl(fileUrl) {
      console.info(fileUrl)
      this.form.qsTkTipsUrl = fileUrl
      this.form.qsTkTipsName = this.getFileName(fileUrl)
    },
    updateHeadXzTipsUrl(fileUrl) {
      console.info(fileUrl)
      this.form.qsXzTipsUrl = fileUrl
      this.form.qsXzTipsName = this.getFileName(fileUrl)
    },
    updateImgHeadUrl(fileUrl) {
      console.info(fileUrl)
      this.form.qsImgUrl = fileUrl
      this.form.qsImgName = this.getFileName(fileUrl)
    },
    uploads(item, index) {
      this.nowitem = item
      this.nowindex = index
      this.$refs.jnlDiag.dialog = true
    },
    updateHeadUrlJnl(fileUrl) {
      console.log(fileUrl)
      var index = this.form.qsInfoJnls.indexOf(this.nowitem)
      if (index !== -1) {
        this.form.qsInfoJnls[index].jnlUrl = fileUrl
      }
    },
    getFileName(o) {
      var pos = o.lastIndexOf('/')
      var name = o.substring(pos + 1).split('_')
      var namezz = name[1].split('.')[1]
      return name[0] + '.' + namezz
    },
    doSubmit() {
      console.log(this.form)
      this.ch()
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
        subType: '',
        qsName: '',
        qsUnit: '',
        qstbsId: '',
        qsUnitSort: '',
        qsCharacter: '',
        qsContent: '',
        qsTranslation: '',
        qsAnalysis: '',
        qsTkQuestion: '',
        qsTipsType: '',
        qsTkTips: '',
        qsTkAnswer: '',
        qsXzQuestion: '',
        qsXzTips: '',
        qsXzAnswer: '',
        createBy: '',
        createTime: '',
        qsXzFileUrl: '',
        qsXzFileType: '',
        qsXzFileName: '',
        qsTkFileName: '',
        qsTkFileType: '',
        qsTkFileUrl: '',
        qsImgUrl: '',
        qsImgName: '',
        qsVideoUrl: '',
        qsVideoName: '',
        qsAudioUrl: '',
        qsAudioName: '',
        enabled: '',
        qsInfoJnls: [{
          id: '',
          qsinfoId: '',
          jnlName: '',
          jnlTips: '',
          jnlContent: '',
          jnlTranslation: '',
          jnlType: '',
          jnlUrl: '',
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

