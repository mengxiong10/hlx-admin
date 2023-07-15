<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="已学课程" width="600px">

    <div class="app-container">
      <!--表格渲染-->
      <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
        <el-table-column align="center" prop="qsTextbook.qsName" label="课程名称"/>
        <el-table-column show-overflow-tooltip align="center" prop="createTime" label="购买时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import checkPermission from '@/utils/permission'
import { stuAuths } from '@/api/qsStudentAuth'
import { parseTime } from '@/utils/index'
export default {
  props: {
    sup_this: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      loading: false,
      dialog: false,
      stuId: '',
      data: []
    }
  },

  methods: {
    parseTime,
    checkPermission,
    inits() {
      this.loading = true
      var params = { 'stuId': this.stuId }
      stuAuths(params).then(res => {
        console.log(res)
        this.data = res
        this.loading = false
      })
    },
    cancel() {
      this.dialog = false
    }

  }
}
</script>

<style scoped>

</style>
