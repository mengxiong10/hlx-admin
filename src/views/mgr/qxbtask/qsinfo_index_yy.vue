<template>
  <div class="app-container">
    <eHeader
      :query="query"
      :sup_this="sup_this"
      :grades="grades"
      :sub-types="subTypes"
      :upload-file-type="uploadFileType"
      :sub-type="subType"
    />
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      border
      size="small"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="expand" label="其他">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row>
              <el-col :span="8">
                <el-form-item label="音频文件名:">
                  <span>{{ isEmpty(props.row.qsAudioName) ? '无' : props.row.qsAudioName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="视频文件名:">
                  <span>{{ isEmpty(props.row.qsVideoName) ? '无' : props.row.qsVideoName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="图片文件名:">
                  <span>{{ isEmpty(props.row.qsImgName) ? '无' : props.row.qsImgName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="解析:">
                  <span>{{ isEmpty(props.row.qsAnalysis) ? '无' : props.row.qsAnalysis }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="填空题题目文字:">
                  <span>{{ isEmpty(props.row.qsTkQuestion) ? '无' : props.row.qsTkQuestion }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="填空题文件名:">
                  <span>{{ isEmpty(props.row.qsTkFileName) ? '无' : props.row.qsTkFileName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="填空题答案:">
                  <span>{{ isEmpty(props.row.qsTkAnswer) ? '无' : props.row.qsTkAnswer }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="填空题提示文字:">
                  <span>{{ isEmpty(props.row.qsTkTips) ? '无' : props.row.qsTkTips }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="填空题提示文件名:">
                  <span>{{ isEmpty(props.row.qsTkTipsName) ? '无' : props.row.qsTkTipsName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="选择题目文字:">
                  <span>{{ isEmpty(props.row.qsXzQuestion) ? '无' : props.row.qsXzQuestion }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="选择题目文件名:">
                  <span>{{ isEmpty(props.row.qsXzFileName) ? '无' : props.row.qsXzFileName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="选择题答案:">
                  <span>{{ isEmpty(props.row.qsXzAnswer) ? '无' : props.row.qsXzAnswer }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="选择题文字提示:">
                  <span>{{ isEmpty(props.row.qsXzTips) ? '无' : props.row.qsXzTips }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="选择题提示文件名:">
                  <span>{{ isEmpty(props.row.qsXzTipsName) ? '无' : props.row.qsXzTipsName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="选择题提示文件类型:">
                  <span>{{ isEmpty(props.row.qsXzFileType) ? '无' : props.row.qsXzFileType }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="选择题文件名:">
                  <span>{{ isEmpty(props.row.qsXzFileName) ? '无' : props.row.qsXzFileName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="id" label="编号" />
      <el-table-column align="center" prop="subType" label="科目">
        <template slot-scope="scope">
          {{ transName(subTypes, scope.row.subType) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="qsTextbookTwo.qsTextbook.qsName" label="课程名称" />
      <el-table-column align="center" prop="qsTextbookTwo.qsUnit" label="单元名称" />
      <el-table-column align="center" prop="qsUnitSort" label="单元内序号" />
      <el-table-column align="center" prop="qsCharacter" label="角色" />
      <el-table-column align="center" prop="qsContent" show-overflow-tooltip label="原文" />
      <el-table-column align="center" prop="qsTranslation" show-overflow-tooltip label="译文" />
      <el-table-column align="center" prop="createTime" show-overflow-tooltip label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateTime" show-overflow-tooltip label="更新时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px" align="center">
        <template slot-scope="scope">
          <edit
            :data="scope.row"
            :sup_this="sup_this"
            :sub-types="subTypes"
            :upload-file-type="uploadFileType"
          />
          <editScene
            v-permission="['ADMIN', 'QSINFOYY_ALL', 'QSINFOYY_EDIT']"
            :data="scope.row"
            :sup_this="sup_this"
          />

          <el-popover :ref="scope.row.id" placement="top" width="180">
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
import { del, deleteBatch } from '@/api/qsInfo'
import { dictName } from '@/api/dictDetail'
import { parseTime } from '@/utils/index'
import eHeader from './module/qsinfo_header'
import edit from './module/qsinfo_edit'
import { isEmpty, transName } from '@/utils/index'
import editScene from './module/qsinfoscene_look'

export default {
  components: { eHeader, edit, editScene },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      uploadFileType: [],
      subTypes: [],
      grades: [],
      subType: '001002',
      multipleSelection: [],
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.dictName('subtype_code')
      this.dictName('uploadfile_code')
      this.dictName('grade_code')
    })
  },
  methods: {
    parseTime,
    isEmpty,
    transName,
    checkPermission,
    dictName(name) {
      dictName(name).then((res) => {
        if (name === 'subtype_code') {
          this.subTypes = res
        }
        if (name === 'uploadfile_code') {
          this.uploadFileType = res
        }
        if (name === 'grade_code') {
          this.grades = res
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delBatch() {
      this.$confirm('此操作将永久删除选中文件, 是否继续?', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          if (this.multipleSelection.length <= 0) {
            this.$notify({
              title: '请选择要删除的课程',
              type: 'info',
              duration: 2500,
            })
            return
          }
          var ids = []
          this.multipleSelection.forEach((res) => {
            ids.push(res.id)
          })
          this.delLoading = true
          deleteBatch({ ids: ids }).then((res) => {
            if (res.respCode === '000000') {
              this.delLoading = false
              this.$notify.success('操作成功')
              this.init()
            } else {
              this.$notify.error('操作失败')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    beforeInit() {
      this.url = 'api/qsInfo'
      // const sort = ['qsTextbookTwo.qstbId,asc', 'qsTextbookTwo.tsort,asc', 'qsUnitSort,asc']
      this.params = { page: this.page, size: this.size }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) {
        this.params[type] = value
      }

      const subType = query.subType
      if (subType !== '' && subType !== null) {
        this.params['subType'] = '001002'
      }
      const trialGrades = query.trialGrades
      if (trialGrades !== '' && trialGrades !== null) {
        this.params['trialGrades'] = trialGrades
      }
      const qsName = query.qsName
      if (qsName !== '' && qsName !== null) {
        this.params['qsName'] = qsName
      }
      const qsUnit = query.qsUnit
      if (qsUnit !== '' && qsUnit !== null) {
        this.params['qsUnit'] = qsUnit
      }
      const qsUnitSort = query.qsUnitSort
      if (qsUnitSort !== '' && qsUnitSort !== null) {
        this.params['qsUnitSort'] = qsUnitSort
      }

      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id)
        .then((res) => {
          var msg = res.respMsg
          var info = 'error'
          if (res.respCode === '000000') {
            this.delLoading = false
            this.$refs[id].doClose()
            this.init()
            info = 'success'
            msg = res.respBody
          }
          this.$notify({
            title: msg,
            type: info,
            duration: 2500,
          })
        })
        .catch((err) => {
          this.delLoading = false
          this.$refs[id].doClose()
          console.log(err.response.data.message)
        })
    },
  },
}
</script>

<style scoped></style>
