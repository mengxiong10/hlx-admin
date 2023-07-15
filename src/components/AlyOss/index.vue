<template>
  <el-dialog :visible.sync="dialog" append-to-body width="500px" @close="doClose">
    <!-- eslint-disable  -->
    <el-upload ref="eupload" :before-remove="handleBeforeRemove" :accept="file_control.accept" :on-progress="handProgress" :on-success="handleSuccess" :on-error="handleError" :file-list="fileList" :headers="headers" :action="(uploadUrl===''?alyOssUploadApi:uploadUrl)" :before-upload="beforeUpload" :multiple="multiple" class="upload-demo">
      <!-- eslint-enable -->
      <el-button size="small" type="primary">点击上传</el-button>
      <div v-show="file_control.isLimitType" slot="tip" style="display: block;" class="el-upload__tip">
        限制类型：{{ file_control.limitType }}
      </div>
      <div v-show="file_control.isAccept" slot="tip" style="display: block;" class="el-upload__tip">
        限制类型：{{ file_control.accept }}
      </div>
      <div v-show="file_control.isLimistSize" slot="tip" style="display: block;" class="el-upload__tip">
        限制大小：{{ file_control.limitSize }}M
      </div>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loadingUpload" :v-show="btvshow" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  props: {
    file_control: {
      type: Object,
      default: () => {
        return {
          isLimitType: false,
          limitType: 'image/jpeg',
          isAccept: false,
          accept: '.',
          isLimistSize: false,
          limitSize: 15
        }
      }
    },
    uploadUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      dialog: false,
      btvshow: false,
      multiple: false,
      loadingUpload: false,
      fileRef: '',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      files: []

    }
  },
  computed: {
    ...mapGetters([
      'alyOssUploadApi'
    ])

  },
  methods: {
    beforeUpload(file) {
      let result = true
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
    handProgress(event, file, fileList) {
      console.info(event)
      this.btvshow = true
      this.loadingUpload = true
    },
    handleSuccess(response, file, fileList) {
      const uid = file.uid
      const id = response.id
      const fileUrl = response.fileUrl
      this.fileRef = fileUrl
      this.dialogImageUrl = fileUrl
      this.files.push({ uid, id })
      console.log(uid + '  ' + id + ' this.fileRef ===' + this.fileRef)
      this.loadingUpload = false
    },
    handleBeforeRemove(file, fileList) {
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].uid === file.uid) {
          // del(this.files[i].id).then(res => { })
          return true
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
      this.loadingUpload = false
    },
    // 刷新列表数据
    doSubmit() {
      this.$emit('fileUploadHook', this.dialogImageUrl)
      this.dialog = false
    },
    doClose() {
      this.fileList = []
      this.dialogVisible = false
      this.dialogImageUrl = ''
      this.dialog = false
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
    }
  }
}
</script>

<style scoped>
</style>
