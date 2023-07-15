<template>
  <div class="app-container">
    <eHeader :query="query" />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row>
              <el-col :span="8">
                <el-form-item label="上传文件存放路径">
                  <span>{{ props.row.uploadFilePath }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开始处理时间">
                  <span>{{ parseTime(props.row.startDealTime) }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束处理时间">
                  <span>{{ parseTime(props.row.endDealTime) }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="错误文件名称">
                  <span>{{ props.row.errorFileName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="错误编码">
                  <span>{{ props.row.errorCode }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="错误说明">
                  <span>{{ props.row.errorMsg }}</span>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="id" label="上传文件编号" />
      <el-table-column show-overflow-tooltip prop="uploadFileName" label="上传文件名称" />
      <el-table-column show-overflow-tooltip prop="dealSuccessCount" label="处理成功条数" />
      <el-table-column show-overflow-tooltip prop="dealFailCount" label="处理失败条数" />
      <el-table-column show-overflow-tooltip prop="dealStatus" label="处理状态">
        <template slot-scope="scope">
          <span v-if="scope.row.dealStatus === '0'" style="color:red;">处理中</span>
          <span v-if="scope.row.dealStatus === '1'" style="color:green;">处理完成</span>
          <span v-if="scope.row.dealStatus === '2'" style="color:red;">处理异常</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="errorFilePath" label="错误文件下载地址">
        <template slot-scope="scope">
          <a v-if="scope.row.errorFilePath" :href="scope.row.errorFilePath" :download="scope.row.errorFileName" style="padding-left:1rem;text-decoration:underline">下载错误文件</a>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="errorFilePath" label="创建时间">
        <template slot-scope="scope">
          {{ parseTime(scope.row.createTime) }}
      </template></el-table-column>

      <el-table-column v-if="false" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSUPLOADLOG_ALL','QSUPLOADLOG_EDIT']" :data="scope.row" :sup_this="sup_this" />
          <el-popover v-permission="['ADMIN','QSUPLOADLOG_ALL','QSUPLOADLOG_DELETE']" :ref="scope.row.id" placement="top" width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination :total="total" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/qsUploadLog'
import { parseTime } from '@/utils/index'
import eHeader from './module/qsuploadlog_header'
import edit from './module/qsuploadlog_edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/qsUploadLog'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const uploadFileName = query.uploadFileName
      if (uploadFileName !== '' && uploadFileName !== null) { this.params['uploadFileName'] = uploadFileName }
      const dealStatus = query.dealStatus
      if (dealStatus !== '' && dealStatus !== null) { this.params['dealStatus'] = dealStatus }
      const errorFileName = query.errorFileName
      if (errorFileName !== '' && errorFileName !== null) { this.params['errorFileName'] = errorFileName }
      const errorCode = query.errorCode
      if (errorCode !== '' && errorCode !== null) { this.params['errorCode'] = errorCode }

      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>
</style>
