<template>
  <div class="app-container">
    <div class="head-container">
      <el-input
        v-model="params.userName"
        clearable
        placeholder="输入用户名搜索"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="getData"
      />
      <el-input
        v-model="params.productName"
        clearable
        placeholder="输入商品名称搜索"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="getData"
      />
      <el-input
        v-model="params.orderNo"
        clearable
        placeholder="输入订单号搜索"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="getData"
      />
      <el-select
        v-model="params.orderStatus"
        clearable
        placeholder="选择订单状态"
        style="width: 150px"
        class="filter-item"
      >
        <el-option label="未支付" value="NOTPAY" />
        <el-option label="支付成功" value="SUCCESS" />
        <el-option label="已关闭" value="CLOSED" />
        <el-option label="已取消" value="CANCEL" />
      </el-select>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="getData"
        >搜索</el-button
      >
      <el-button class="filter-item" size="mini" type="warning" icon="el-icon-refresh" @click="resetSearch"
        >重置</el-button
      >
    </div>
    <el-table v-loading="loading" :data="data" border size="small" style="width: 100%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="user_name" label="用户名" />
      <el-table-column prop="product_name" label="商品名称" />
      <el-table-column prop="order_status" label="支付状态" />
      <el-table-column prop="create_time" label="支付时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="total_fee" label="佣金" />
      <el-table-column prop="title" label="描述" />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            :loading="scope.row.refreshing"
            @click="handleRefresh(scope.row)"
          >
            刷新状态
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
  </div>
</template>

<script>
import { getPaymentList, refreshOrderStatus } from '@/api/product'
import { parseTime } from '@/utils/index'

export default {
  data() {
    return {
      params: {
        page: 0,
        size: 10,
        userName: '',
        productName: '',
        orderNo: '',
        orderStatus: '',
      },
      loading: false,
      data: [],
      total: 0,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    parseTime,
    getData() {
      this.loading = true
      getPaymentList(this.params)
        .then((res) => {
          this.loading = false
          this.data = res.content
          this.total = res.totalElements
          // 初始化刷新状态
          this.data.forEach((item) => {
            this.$set(item, 'refreshing', false)
          })
          console.log(res)
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleRefresh(row) {
      // 订单号可能是 order_no 或 orderNo
      const orderNo = row.order_no || row.orderNo
      if (!orderNo) {
        this.$message.error('订单号不存在')
        return
      }
      this.$set(row, 'refreshing', true)
      refreshOrderStatus(orderNo)
        .then((res) => {
          this.$message.success(res || '刷新成功')
          this.$set(row, 'refreshing', false)
          // 刷新列表数据
          this.getData()
        })
        .catch((error) => {
          this.$message.error(error.message || '刷新失败')
          this.$set(row, 'refreshing', false)
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
    resetSearch() {
      this.params.userName = ''
      this.params.productName = ''
      this.params.orderNo = ''
      this.params.orderStatus = ''
      this.params.page = 0
      this.getData()
    },
  },
}
</script>
