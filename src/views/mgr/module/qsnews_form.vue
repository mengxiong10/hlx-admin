<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增新闻' : '编辑新闻'" width="800px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="标题:" prop="title" >
        <el-input v-model="form.title" type="textarea" style="width: 370px;"/>
      </el-form-item>
      <el-row>
        <el-col :span="8"> <el-form-item label="序号:" prop="tsort" >
          <el-input v-model="form.tsort" style="width: 170px;"/>
        </el-form-item></el-col>
        <el-col :span="8"><el-form-item label="" >
          <el-checkbox v-model="form.hides">是否隐藏</el-checkbox>
        </el-form-item></el-col>

      </el-row>
      <el-form-item label="作者或编者:" prop="synopsis" >
        <el-input v-model="form.synopsis" type="textarea" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="封面图:" prop="imageUrl" >
        <el-row>
          <el-col :span="20">
            <el-input v-model="form.imageUrl" placeholder="尺寸为(180px X 135px)" style="width: 380px;" readonly="readonly" />
            <aliOss ref="imgDiag" :file_control="file_control" @fileUploadHook="updateImgHeadUrl" />
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.imgDiag.dialog = true">上传文件</el-button>
            <br><span style="color:red;">尺寸为(180px X 135px)</span>
          </el-col>
          <el-col :span="4">
            <el-image :src="form.imageUrl" style="width: 100px; height: 100px;" fit="scale-down" lazy />
          </el-col>
        </el-row>

      </el-form-item>

      <el-form-item label="正文:" prop="zw" >
        <editor ref="editor" style="text-align:left;margin: 5px"/>
      </el-form-item>
      <el-form-item label="轮播文章" >
        <el-checkbox v-model="form.banners" @change="ch" >是否轮播 </el-checkbox><span v-if="form.banners" style="color:red;">要求必须至少上传一张轮播图并提示尺寸为（686px X 250px）</span>
      </el-form-item>
      <el-form-item v-if="form.banners" label="轮播图集" >
        <aliOss ref="photosDiag" :file_control="file_control" @fileUploadHook="updateHeadUrlPhotos" />
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.photosDiag.dialog = true">上传文件</el-button>
      </el-form-item>

      <template v-if="srcList.length>0">
        <el-alert :closable="false" title="点击图片放大" type="success" />
        <br>
        <el-row :gutter="20">
          <el-col v-for="(item,index) in srcList" :key="index" :span="6" style="border:1px solid #dcdfe6 ;border-radius: 4px;position: inherit;">
            <el-image :src="item" :preview-src-list="srcList" style="width: 100px; height: 100px;" fit="scale-down" lazy />
            <el-button type="danger" icon="el-icon-delete" circle style="position: absolute;right: 0;" round @click="del(item,index)" />
          </el-col>
        </el-row>
      </template>
      <template v-if="srcList.length<=0">暂无图片</template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsNews'
import aliOss from '@/components/AlyOss'
import editor from '@/components/WangEditor'

export default {
  components: { aliOss, editor },
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
      srcList: [],
      file_control: {

        isLimitType: false,
        limitType: 'image/jpeg',
        isAccept: true,
        accept: '.jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF,.PNG',
        isLimistSize: false,
        limitSize: 15

      },
      form: {
        id: '',
        title: '',
        imageUrl: '',
        synopsis: '',
        tcontent: '',
        tsort: '',
        visit: '',
        enabled: '',
        hides: false,
        hide: '',
        createTime: '',
        createBy: '',
        updateTime: '',
        likes: '',
        banners: false,
        banner: '',
        bannerUrl: '',
        updateBy: ''
      },
      rules: {
        imageUrl: [
          { required: true, message: '封面图为必传', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        tsort: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        synopsis: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    updateHeadUrlPhotos(fileUrls) {
      var fileUrl = fileUrls.replace(/\\/g, '/')
      this.srcList = []
      this.srcList.push(fileUrl)
    },
    del(item, index) {
      this.index = this.srcList.indexOf(item)
      if (index !== -1) {
        this.srcList.splice(index, 1)
      }
    },
    ch() {
      this.form.banner = this.form.banners ? 1 : 0
      if (!this.form.banner) {
        this.srcList = []
        this.bannerUrl = ''
      }
    },
    beforeUpload(file) {
      let result = true
      console.log(file.type)
      if (this.file_control) {
        const _fc = this.file_control
        // const isType = file.type === 'image/jpeg'
        if (_fc.isLimitType) {
          const isType = file.type === _fc.limitType
          if (!isType) {
            result = false
            this.$message.error('传输格式只能为' + _fc.limitType)
          }
        }
        if (_fc.isLimitType) {
          const isLt = file.size / 1024 / 1024 < _fc.limitSize
          if (!isLt) {
            result = false
            this.$message.error('文件大于' + _fc.limitSize + 'M')
          }
        }
      }
      // return isType && isLt
      return result
    },
    updateImgHeadUrl(fileUrl) {
      this.form.imageUrl = fileUrl
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.ch()
      this.form.hide = this.form.hides ? 1 : 0
      this.form.banner = this.form.banners ? 1 : 0
      if (this.form.banner) {
        if (this.srcList.length < 1) {
          this.$notify({
            title: '请必传一张轮播图片',
            type: 'info',
            duration: 2500
          })
          return
        }
        if (this.srcList.length > 1) {
          this.$notify({
            title: '只能传一张轮播图片',
            type: 'info',
            duration: 2500
          })
          return
        }
        this.form.bannerUrl = this.srcList[0]
      }
      this.form.tcontent = this.$refs.editor.getHtml()

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
        msg = res.respMsg
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
        title: '',
        imageUrl: '',
        synopsis: '',
        tcontent: '',
        tsort: '',
        visit: '',
        enabled: '',
        hides: false,
        banners: false,
        hide: '',
        createTime: '',
        createBy: '',
        likes: '',
        banner: '',
        bannerUrl: '',
        updateTime: '',
        updateBy: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
