<template>
  <div class="app-container" style="padding: 1px">
    <eHeader ref="eheader" :query="query" :qs-textbook="qsTextbook" :sup_this="sup_this" />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" border size="small" style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="qsTextbook.qsName"
        label="课程名称"
      />
      <el-table-column show-overflow-tooltip align="center" prop="qsUnit" label="单元名称" />
      <el-table-column show-overflow-tooltip align="center" prop="tsort" label="单元序号" />
      <el-table-column show-overflow-tooltip align=" center" prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          checkPermission([
            'ADMIN',
            'QSTEXTBOOKTWO_ALL',
            'QSTEXTBOOKTWO_EDIT',
            'QSTEXTBOOKTWO_DELETE',
          ])
        "
        label="操作"
        width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <edit
            v-permission="['ADMIN', 'QSTEXTBOOKTWO_ALL', 'QSTEXTBOOKTWO_EDIT']"
            :qs-textbook="qsTextbook"
            :data="scope.row"
            :sup_this="sup_this"
          />
          <el-popover
            v-permission="['ADMIN', 'QSTEXTBOOKTWO_ALL', 'QSTEXTBOOKTWO_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="180"
          >
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()"
                >取消</el-button
              >
              <el-button
                :loading="delLoading"
                type="primary"
                size="mini"
                @click="subDelete(scope.row.id)"
                >确定</el-button
              >
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del, delCache } from '@/api/qsTextbookTwo'
import { parseTime } from '@/utils/index'
import eHeader from './module/qstextbooktwo_header'
import edit from './module/qstextbooktwo_edit'
import { isEmpty } from '@/utils/index'

export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      qsName: '',
      qstbId: 0,
      qsTextbook: { qsName: '', id: '' },
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
      this.url = 'api/qsTextbookTwo'
      const sort = 'tsort'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) {
        this.params[type] = value
      }

      this.params['qstbId'] = this.qstbId
      const qsUnit = query.qsUnit
      if (qsUnit !== '' && qsUnit !== null) {
        this.params['qsUnit'] = qsUnit
      }

      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id)
        .then((res) => {
          this.delLoading = false
          this.$refs[id].doClose()
          this.init()
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2500,
          })
        })
        .catch((err) => {
          this.delLoading = false
          this.$refs[id].doClose()
          console.log(err.response.data.message)
        })
    },
    deleteCache() {
      if (isEmpty(this.qsTextbook.id)) {
        this.$notify({
          title: '请先选择课程',
          type: 'warning',
          duration: 2500,
        })
        return
      }
      delCache(this.qsTextbook.id)
        .then((res) => {
          this.$notify({
            title: '清除成功',
            type: 'success',
            duration: 2500,
          })
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    },
  },
}
</script>

<style scoped></style>
