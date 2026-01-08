<template>
  <div class="app-container">
    <div class="head-container">
      <el-input
        v-model="params.inviterName"
        clearable
        placeholder="输入邀请人姓名搜索"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="getData"
      />
      <el-select
        v-model="params.status"
        clearable
        placeholder="选择状态"
        style="width: 120px"
        class="filter-item"
        @change="getData"
      >
        <el-option label="待审核" value="PENDING" />
        <el-option label="已通过" value="APPROVED" />
        <el-option label="已拒绝" value="REJECTED" />
        <el-option label="已完成" value="COMPLETED" />
      </el-select>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="getData"
        >搜索</el-button
      >
    </div>
    <el-table v-loading="loading" :data="data" border size="small" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="inviterName" label="邀请人" />
      <el-table-column prop="amount" label="提现金额（分）" />
      <el-table-column prop="wechatAccount" label="微信号" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="getStatusType(scope.row.status)">{{ getStatusText(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="create_time" label="申请时间">
        <template slot-scope="scope">
          {{ formatTime(scope.row.create_time) }}
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间">
        <template slot-scope="scope">
          {{ formatTime(scope.row.update_time) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 'PENDING'"
            type="success"
            size="mini"
            @click="handleUpdateStatus(scope.row, 'APPROVED')"
          >
            通过
          </el-button>
          <el-button
            v-if="scope.row.status === 'PENDING'"
            type="danger"
            size="mini"
            @click="handleUpdateStatus(scope.row, 'REJECTED')"
          >
            拒绝
          </el-button>
          <el-button
            v-if="scope.row.status === 'APPROVED'"
            type="primary"
            size="mini"
            @click="handleUpdateStatus(scope.row, 'COMPLETED')"
          >
            完成
          </el-button>
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
    <withdraw-status-dialog
      :visible="dialogVisible"
      :withdraw-record="currentRecord"
      :status="currentStatus"
      :on-close="handleDialogClose"
      :on-success="getData"
    />
  </div>
</template>

<script>
import { getAllWithdrawRecords } from '@/api/withdraw'
import WithdrawStatusDialog from './withdrawStatusDialog.vue'
import { parseTime } from '@/utils'

export default {
  components: { WithdrawStatusDialog },
  data() {
    return {
      params: {
        page: 0,
        size: 10,
        inviterName: '',
        status: '',
      },
      loading: false,
      data: [],
      total: 0,
      dialogVisible: false,
      currentRecord: null,
      currentStatus: '',
    }
  },
  created() {
    this.getData()
  },
  methods: {
    formatTime(time) {
      if (!time) return ''
      const timestamp = typeof time === 'number' ? time : new Date(time).getTime()
      return parseTime(timestamp)
    },
    getStatusText(status) {
      const statusMap = {
        PENDING: '待审核',
        APPROVED: '已通过',
        REJECTED: '已拒绝',
        COMPLETED: '已完成',
      }
      return statusMap[status] || status
    },
    getStatusType(status) {
      const typeMap = {
        PENDING: 'warning',
        APPROVED: 'success',
        REJECTED: 'danger',
        COMPLETED: 'info',
      }
      return typeMap[status] || ''
    },
    handleUpdateStatus(record, status) {
      this.currentRecord = record
      this.currentStatus = status
      this.dialogVisible = true
    },
    handleDialogClose() {
      this.dialogVisible = false
      this.currentRecord = null
      this.currentStatus = ''
    },
    getData() {
      this.loading = true
      getAllWithdrawRecords(this.params)
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
