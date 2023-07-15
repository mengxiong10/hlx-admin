<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" border size="small" style="width: 100%;">
      <el-table-column align="center" show-overflow-tooltip prop="deptName" label="来信部门"/>
      <el-table-column align="center" show-overflow-tooltip prop="createByName" label="来信人"/>
      <el-table-column align="center" show-overflow-tooltip prop="recontent" label="来信内容"/>
      <el-table-column align="center" show-overflow-tooltip prop="updateByName" label="回复人"/>
      <el-table-column align="center" show-overflow-tooltip prop="response" label="回复内容"/>
      <el-table-column prop="enabled" align="center" label="回复状态"><template slot-scope="scope">
        <span v-if="scope.row.enabled === 0" style="color:red;">未回复</span>
        <span v-if="scope.row.enabled === 1" style="color:green;">已回复</span>
      </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="createTime" label="来信时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" show-overflow-tooltip prop="updateTime" label="回复时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="checkPermission(['ADMIN','QSFEEDBACK_ALL','QSFEEDBACK_EDIT','QSFEEDBACK_DELETE'])" label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSFEEDBACK_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','QSFEEDBACK_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
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
import { del } from '@/api/qsFeedback'
import { parseTime, isEmpty } from '@/utils/index'
import eHeader from './module/qsfeedback_header'
import edit from './module/qsfeedback_edit'
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
    isEmpty,
    checkPermission,
    beforeInit() {
      this.url = 'api/qsFeedback'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const recontent = query.recontent
      if (recontent !== '' && recontent !== null) { this.params['recontent'] = recontent }
      const response = query.response
      if (response !== '' && response !== null) { this.params['response'] = response }
      const enabled = query.enabled
      if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }

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
