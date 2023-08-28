<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="data" border size="small" style="width: 100%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="user_name" label="用户名" />
      <el-table-column prop="product_name" label="商品名称" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="title" label="描述" />
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
import { getPaymentList } from '@/api/product'

export default {
  data() {
    return {
      params: {
        page: 0,
        size: 10,
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
    getData() {
      this.loading = true
      getPaymentList(this.params)
        .then((res) => {
          this.loading = false
          this.data = res.content
          this.total = res.totalElements
          console.log(res)
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
