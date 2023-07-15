<template>
  <div class="app-container">
    <eHeader :query="query" :dicts="dicts"/>
    <!--表格渲染-->
    <tree-table v-loading="loading" :expand-all="expand" :data="data" :columns="columns" border size="small">
      <el-table-column label="剩余点数" prop="total" show-overflow-tooltip align="center"/>
      <el-table-column label="联系人" prop="contact" show-overflow-tooltip align="center"/>
      <el-table-column label="联系电话" prop="cellphone" show-overflow-tooltip align="center"/>

      <el-table-column label="所在地区" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          {{ scope.row.province+"-"+scope.row.city+"-"+scope.row.county }}
        </template>
      </el-table-column>
      <el-table-column label="详细地址" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div v-for="item in dicts" :key="item.id">
            <el-tag v-if="scope.row.enabled.toString() === item.value" :type="scope.row.enabled ? '' : 'info'">{{ item.label }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" show-overflow-tooltip label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['ADMIN','DEPT_ALL','DEPT_EDIT','DEPT_DELETE','DEPT_SELECT'])" label="操作" width="280px" align="center">
        <template slot-scope="scope">
          <!--
          <edit v-if="false" v-permission="['ADMIN','DEPT_ALL','DEPT_EDIT']" :dicts="dicts" :data="scope.row" :sup_this="sup_this"/>
          -->
          <editDept v-permission="['ADMIN','DEPT_TO']" :dicts="dicts" :data="scope.row" :sup_this="sup_this"/>
          <editQs v-permission="['ADMIN','DEPT_ALL','DEPT_EDIT','DEPT_SELECT']" :dicts="dicts" :data="scope.row" :sup_this="sup_this"/>
          <editTest v-permission="['ADMIN','DEPT_ALL','DEPT_EDIT','DEPT_SELECT']" :dicts="dicts" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','DEPT_ALL','DEPT_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button v-if="false" slot="reference" :disabled="scope.row.id === 1" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'
import { del } from '@/api/dept'
import { parseTime } from '@/utils/index'
import eHeader from './module/qsdept_header'
import edit from './module/qsdept_edit'
import editTest from './module/qsdept_editTest'
import editQs from './module/qsdept_editQs'
import editDept from './module/qsdept_editDept'
export default {
  components: { eHeader, edit, treeTable, editTest, editQs, editDept },
  mixins: [initData, initDict],
  data() {
    return {
      columns: [
        {
          text: '部门名称',
          value: 'name',
          width: 180
        }
      ],
      delLoading: false, sup_this: this, expand: true

    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      // 加载数据字典
      this.getDict('dept_status')
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/dept'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const value = query.value
      const enabled = query.enabled
      const province = query.province
      if (value) { this.params['name'] = value }
      if (province) { this.params['province'] = province }
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
html,body{ overflow-y:scroll;}
html,body{ overflow:scroll; min-height:101%;}
html{ overflow:-moz-scrollbars-vertical;}
</style>
