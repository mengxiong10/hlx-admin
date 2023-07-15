<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="字词" prop="word">
        <el-input v-model="form.word" type="textarea" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="翻译" prop="translation">
        <el-input v-model="form.translation" type="textarea" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="类型" >

        <el-select v-model="form.audioType" clearable placeholder="类型" class="filter-item" style="width: 200px">
          <el-option v-for="(item,index) in subTypes" :key="index" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="音频文件" >
        <el-input v-model="form.audioUrl" style="width: 300px;" placeholder="请上传mp3格式文件" />
        <aliOss ref="audioDiag" @fileUploadHook="updateAudioHeadUrl" />
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="$refs.audioDiag.dialog = true">上传文件</el-button>

      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/qsAudio'
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
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        word: '',
        audioType: '',
        audioUrl: '',
        translation: '',
        transFlag: '',
        audioFilePath: '',
        enabled: '',
        createTime: ''
      },
      rules: {
        word: [
          { required: true, message: 'please enter', trigger: 'blur' }
        ]
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
    }, updateAudioHeadUrl(fileUrl) {
      console.info(fileUrl)
      this.form.audioUrl = fileUrl
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
        word: '',
        audioType: '',
        translation: '',
        audioUrl: '',
        enabled: '',
        transFlag: '',
        audioFilePath: '',
        createTime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
