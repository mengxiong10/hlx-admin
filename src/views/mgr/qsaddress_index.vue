<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" border size="small" style="width: 100%;">
      <el-table-column align="left" prop="id" label="区域编号"/>
      <el-table-column align="center" prop="province" label="省"/>
      <el-table-column v-if="false" align="center" prop="city" label="市"/>
      <el-table-column v-if="false" align="center" prop="county" label="区/县"/>
      <el-table-column align="center" prop="postcode" label="邮编"/>
      <el-table-column v-if="false && checkPermission(['ADMIN','QSADDRESS_ALL','QSADDRESS_EDIT','QSADDRESS_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','QSADDRESS_ALL','QSADDRESS_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','QSADDRESS_ALL','QSADDRESS_DELETE']"
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
import { del } from '@/api/qsAddress'
import eHeader from './module/qsaddress_header'
import edit from './module/qsaddress_edit'
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
    checkPermission,
    beforeInit() {
      this.url = 'api/qsAddress'
      const sort = 'id,asc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const province = query.province
      if (province !== '' && province !== null) { this.params['province'] = province }
      const city = query.city
      if (city !== '' && city !== null) { this.params['city'] = city }
      const county = query.county
      if (county !== '' && county !== null) { this.params['county'] = county }

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
