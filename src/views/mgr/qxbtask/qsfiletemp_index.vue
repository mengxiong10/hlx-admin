<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="id" label="编号"/>
      <el-table-column prop="fileType" label="文件类型 文件类型 码表"/>
      <el-table-column prop="fileName" label="文件名称"/>
      <el-table-column prop="fileOssName" label="文件oss名称"/>
      <el-table-column prop="fileVisitUrl" label="文件oss访问路经"/>
      <el-table-column prop="fileContent" label="文件上传路经"/>
      <el-table-column prop="zzzName" label="后缀名"/>
      <el-table-column prop="deal" label="处理状态 1已处理 0 待处理"/>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['ADMIN','QSFILETEMP_ALL','QSFILETEMP_EDIT','QSFILETEMP_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSFILETEMP_ALL','QSFILETEMP_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','QSFILETEMP_ALL','QSFILETEMP_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/qsFileTemp'
import { parseTime } from '@/utils/index'
import eHeader from './module/qsfiletemp_header'
import edit from './module/qsfiletemp_edit'
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
      this.url = 'api/qsFileTemp'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const fileType = query.fileType
      if (fileType !== '' && fileType !== null) { this.params['fileType'] = fileType }
      const fileName = query.fileName
      if (fileName !== '' && fileName !== null) { this.params['fileName'] = fileName }

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
