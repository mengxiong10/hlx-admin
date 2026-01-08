<template>
  <div class="app-container">
    <div class="head-container">
      <el-button size="mini" type="primary" @click="handleAdd">新增邀请关系</el-button>
    </div>
    <el-table v-loading="loading" :data="data" border size="small" style="width: 100%">
      <el-table-column prop="inviteeName" label="被邀请人" />
      <el-table-column prop="inviterName" label="邀请人" />
      <el-table-column prop="invite_code" label="邀请码" />
      <el-table-column prop="create_time" label="创建时间">
        <template slot-scope="scope">
          {{ formatTime(scope.row.create_time) }}
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间">
        <template slot-scope="scope">
          {{ formatTime(scope.row.update_time) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-popconfirm title="确定删除本条邀请关系吗？" @confirm="handleDel(scope.row.id)">
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      style="margin-top: 8px"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
    <invite-relation-form
      :visible="formVisible"
      :on-close="handleFormClose"
      :on-success="getData"
    />
  </div>
</template>

<script>
import { getInviteRelations, deleteInviteRelation } from '@/api/invite'
import InviteRelationForm from './inviteRelationForm.vue'
import { parseTime } from '@/utils'

export default {
  components: { InviteRelationForm },
  data() {
    return {
      params: {
        page: 0,
        size: 10,
      },
      loading: false,
      data: [],
      total: 0,
      formVisible: false,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    formatTime(time) {
      if (!time) return ''
      // 如果已经是时间戳格式（数字），直接使用
      // 如果是字符串格式的时间，需要转换
      const timestamp = typeof time === 'number' ? time : new Date(time).getTime()
      return parseTime(timestamp)
    },
    handleFormClose() {
      this.formVisible = false
    },
    handleDel(id) {
      deleteInviteRelation(id)
        .then(() => {
          this.$message.success('删除成功')
          this.getData()
        })
        .catch(() => {})
    },
    handleAdd() {
      this.formVisible = true
    },
    getData() {
      this.loading = true
      getInviteRelations(this.params)
        .then((res) => {
          this.loading = false
          this.data = res.content
          this.total = res.totalElements
        })
        .catch(() => {
          this.loading = false
        })
    },
    pageChange(e) {
      this.params.page = e - 1
      this.getData()
    },
    sizeChange(e) {
      this.params.page = 0
      this.params.size = e
      this.getData()
    },
  },
}
</script>
