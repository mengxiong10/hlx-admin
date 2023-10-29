<template>
  <div class="app-container">
    <div class="head-container">
      <el-button size="mini" type="primary" @click="handleAdd">新增</el-button>
    </div>
    <el-table v-loading="loading" :data="data" border size="small" style="width: 100%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="qs_name" label="课程名" />
      <el-table-column prop="title" label="描述" />
      <el-table-column prop="price" label="价格" />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除本条数据吗？" @confirm="handleDel(scope.row.id)">
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
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
    <produce-form
      :visible="formVisible"
      :on-close="handleFormClose"
      :on-success="getData"
      :initial-data="initialData"
    />
  </div>
</template>

<script>
import { getProductList, del } from '@/api/product'
import ProduceForm from './productForm.vue'

export default {
  components: { ProduceForm },
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
      initialData: null,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleFormClose() {
      this.formVisible = false
    },
    handleDel(id) {
      del(id).then(() => {
        this.getData()
      })
    },
    handleAdd() {
      this.initialData = null
      this.formVisible = true
    },
    handleEdit(row) {
      this.initialData = row
      this.formVisible = true
    },
    getData() {
      this.loading = true
      getProductList(this.params)
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
