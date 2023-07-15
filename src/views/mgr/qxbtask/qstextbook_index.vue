<template>
  <div class="app-container">
    <el-row :gutter="1">

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>课程列表</span>
            <el-button v-permission="['ADMIN','QSTEXTBOOK_ALL','QSTEXTBOOK_EDIT','QSTEXTBOOK_DELETE']" class="filter-item" size="mini" style="float: right;padding: 4px 10px" type="primary" icon="el-icon-plus" @click="$refs.header.$refs.form.dialog = true">新增课程</el-button>
          </div>
          <eHeader ref="header" :query="query" :sub-types="subTypes" :stuauths="stuauths" :grades="grades" :sup_this="sup_this" />
          <!--表格渲染-->
          <el-table v-loading="loading" :data="data" size="small" style="width: 100%;" border @current-change="handleCurrentChange">
            <el-table-column type="expand" label="其他">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="扣除点数:">
                        <span>{{ isEmpty( props.row.deductionPoints)?'无': props.row.deductionPoints }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="适配类型:">
                        <span>{{ isEmpty( props.row.authType)?'无': transName(stuauths,props.row.authType) }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="创建时间:">
                        <span>{{ isEmpty( props.row.createTime)?'无':parseTime(props.row.createTime) }}</span>
                      </el-form-item>
                    </el-col>
<!--                    <el-col :span="12">-->
<!--                      <el-form-item label="ID:">-->
<!--                        <span>{{ props.row.id }}</span>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
                  </el-row>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="subType" label="科目">
              <template slot-scope="scope">
                {{ transName(subTypes,scope.row.subType) }}
              </template>
            </el-table-column>
            <el-table-column v-if="false" align="center" show-overflow-tooltip prop="trialGrades" label="适用学段">
              <template slot-scope="scope">
                {{ transName(grades,scope.row.trialGrades) }}
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="qsName" label="课程名称" />
            <el-table-column align="center" show-overflow-tooltip prop="effectiveDays" label="有效天数" />
            <el-table-column align="center" show-overflow-tooltip prop="torder" label="科目内序号" />

            <el-table-column v-if="checkPermission(['ADMIN','QSTEXTBOOK_ALL','QSTEXTBOOK_EDIT','QSTEXTBOOK_DELETE'])" label="操作" width="210px" align="center">
              <template slot-scope="scope">
                <edit v-permission="['ADMIN','QSTEXTBOOK_ALL','QSTEXTBOOK_EDIT']" :stuauths="stuauths" :data="scope.row" :sub-types="subTypes" :grades="grades" :sup_this="sup_this" />
                <editstep :data="scope.row" :sub-types="subTypes" :grades="grades" :sup_this="sup_this" />
                <el-popover v-permission="['ADMIN','QSTEXTBOOK_ALL','QSTEXTBOOK_DELETE']" :ref="scope.row.id" placement="top" width="180">
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                    <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                  </div>
                  <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <el-pagination :total="total" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12" :sm="24" :md="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" style="padding: 3px;" class="clearfix">
            <span>单元列表</span>
            <el-button v-if="checkPermission(['ADMIN','QSTEXTBOOKTWO_ALL','QSTEXTBOOKTWO_EDIT','QSTEXTBOOKTWO_DELETE'])&& this.$refs.dictDetail && this.$refs.dictDetail.qsName" class="filter-item" size="mini" style="float: right;padding: 4px 10px" type="primary" icon="el-icon-plus" @click="toAddUnit">新增单元</el-button>
          </div>
          <qstextbooktwo ref="dictDetail" />
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/qsTextbook'
import eHeader from './module/qstextbook_header'
import edit from './module/qstextbook_edit'
import editstep from './module/qstextbookstep_edit'
import { isEmpty, transName, parseTime } from '@/utils/index'
import { dictName } from '@/api/dictDetail'

import qstextbooktwo from './qstextbooktwo_index'

export default {
  components: { eHeader, edit, editstep, qstextbooktwo },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this, subTypes: [], grades: [],
      stuauths: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.dictName('subtype_code')
      this.dictName('grade_code')
      this.dictName('stu_auth')
    })
  },
  methods: {
    parseTime,
    checkPermission,
    handleCurrentChange(val) {
      if (val) {
        this.$refs.dictDetail.qsName = val.qsName
        this.$refs.dictDetail.qstbId = val.id
        this.$refs.dictDetail.qsTextbook = val
        this.$refs.dictDetail.init()
      }
    },
    dictName(name) {
      dictName(name).then(res => {
        if (name === 'subtype_code') {
          this.subTypes = res
        }
        if (name === 'grade_code') {
          this.grades = res
        }
        if (name === 'stu_auth') {
          this.stuauths = res
        }
      })
    },
    toAddUnit() {
      const _this = this.$refs.dictDetail.$refs.eheader
      _this.toAdd()
    },
    beforeInit() {
      this.url = 'api/qsTextbook'
      const sort = 'torder,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }

      const subType = query.subType
      if (subType !== '' && subType !== null) { this.params['subType'] = subType }
      const qsName = query.qsName
      if (qsName !== '' && qsName !== null) { this.params['qsName'] = qsName }

      const trialGrades = query.trialGrades
      if (trialGrades !== '' && trialGrades !== null) { this.params['trialGrades'] = trialGrades }
      const enabled = query.enabled
      if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }

      return true
    },
    isEmpty, transName,
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
