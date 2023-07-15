<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-input v-model="query.stuName" clearable placeholder="学生姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.examName" clearable placeholder="试卷名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.deptName" clearable placeholder="部门名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div v-if="false" style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','QSEXAMRESULT_ALL','QSEXAMRESULT_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true" :sup_this="sup_this"/>
    </div>
  </div>
</template>

<script>
import eForm from './qsexamresult_form'
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'stuId', display_name: '学生编号' },
        { key: 'examId', display_name: '试卷ID' },
        { key: 'deptId', display_name: '部门ID' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    }, beforeAvatarUpload(file) {
      this.loading_u = true
      console.log(file.type)
      // const isXsl = file.type === 'application/x-zip-compressed'
      const isLt10M = file.size / 1024 / 1024 < 50

      /*
      if ((isXsl.toString()).indexOf('zip') === -1) {
        this.$notify({
          title: '上传文件只能是 zip 格式!', //
          type: 'error',
          duration: 2500
        })
        this.loading_u = false
      }*/
      if (!isLt10M) {
        this.$notify({
          title: '上传文件大小不能超过 50MB!', //
          type: 'error',
          duration: 2500
        })
        this.loading_u = false
      }
      console.log('验证通过----')
      return isLt10M
    },
    handleSuccess(response, file, fileList) {
      this.loading_u = false
      console.log(response)
      //   this.$refs.upload.clearFiles()
      var msg = response.respMsg
      var info = 'error'
      if (response.respCode === '000000') {
        info = 'success'
        msg = response.respBody
      }
      this.$notify({
        title: msg, //
        type: info,
        duration: 2500
      })
      this.toQuery()
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      this.loading_u = false
      //   this.$refs.upload.clearFiles()
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.resMsg,
        type: 'error',
        duration: 2500
      })
      console.log('上传失败----')
    },
    handleExceed(files, fileList) {
      this.$notify({
        title: '当前限制上传3个文件，若要继续上传文件，请删除之前文件或刷新当前页面！', //
        type: 'error',
        duration: 2500
      })
    }
  }
}
</script>
