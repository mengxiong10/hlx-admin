<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="试卷题库设置" width="1200px">

    <div class="head-container">
      <el-input v-model="qsTkQuestion" clearable placeholder="填空题目" style="width: 200px;" class="filter-item"/>
      <el-input v-model="qsXzQuestion" clearable placeholder="选择题目" style="width: 200px;" class="filter-item" />

      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="init">搜索</el-button>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="batchAddToQs">批量加入试卷</el-button>

    </div>
    <div class="app-container">
      <el-table v-loading="loading" ref="multipleTable" :data="data" size="small" border style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" width="55"/>
        <el-table-column type="expand" label="其他">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row >
                <el-col :span="8">
                  <el-form-item label="填空题题目:">
                    <span>{{ isEmpty(props.row.qsTkQuestion)?'无':props.row.qsTkQuestion }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="填空文件类型:">
                    <span>{{ isEmpty(props.row.qsTkFileType)?'无':props.row.qsTkFileType }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="选择题文件名:">
                    <span>{{ isEmpty(props.row.qsTkFileName)?'无':props.row.qsTkFileName }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row >
                <el-col :span="8">
                  <el-form-item label="选择题题目:">
                    <span>{{ isEmpty(props.row.qsXzQuestion)?'无':props.row.qsXzQuestion }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="选择题文件类型:">
                    <span>{{ isEmpty(props.row.qsXzFileType)?'无':props.row.qsXzFileType }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="选择题文件名:">
                    <span>{{ isEmpty(props.row.qsXzFileName)?'无':props.row.qsXzFileName }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="subType" label="科目">
          <template slot-scope="scope">
            {{ transName(subTypes,scope.row.subType) }}
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="试卷名称">
          <template slot-scope="scope">
            {{ scope.row.qsExam==null?'':scope.row.qsExam.testName }}
          </template>
        </el-table-column>

        <el-table-column align="center" prop="qsTkQuestion" show-overflow-tooltip label="填空题目"/>
        <el-table-column align="center" prop="qsTkAnswer" show-overflow-tooltip label="填空答案"/>
        <el-table-column align="center" prop="qsXzQuestion" show-overflow-tooltip label="选择题目"/>
        <el-table-column align="center" prop="qsXzAnswer" show-overflow-tooltip label="选择题答案"/>
        <el-table-column align="center" prop="createTime" show-overflow-tooltip label="创建时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
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
    <el-row><el-col :span="24">已选试卷题目</el-col></el-row>
    <el-form ref="form" size="small" label-width="120px">
      <el-row :gutter="3" class="form_add_top_title">

        <el-col :span="2">
          <div class="grid-content bg-purple-light add_btn_add">操作</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-light">科目</div>
        </el-col>

        <el-col :span="3">
          <div class="grid-content bg-purple-light">课程名称</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">填空题目</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">选择题目</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">题型</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-light">排序号</div>
        </el-col>

      </el-row>

      <el-row v-for="(sub,index) in form.havQs" :key="sub.key" :gutter="5" class="item_boder">
        <el-col :span="2" style="text-align: center;">
          <div class="grid-content bg-purple-light add_btn_add add_btn_add_line">
            <i class="el-icon-remove-outline" @click="deleteSubItem(sub, index)" />
            <el-input v-show="false" v-model="sub.id"/>
          </div>
        </el-col>

        <el-col :span="2">
          <div class="grid-content bg-purple-light">
            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              {{ transName(subTypes,sub.subType) }}
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              {{ sub.qsExam===null?'无': sub.qsExam.testName }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              {{ sub.qsTkQuestion == null?'无':sub.qsTkQuestion }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              {{ sub.qsXzQuestion == null?'无':sub.qsXzQuestion }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              <el-select v-model="sub.qseqType" clearable placeholder="题目类型" style="width: 130px;" class="filter-item">
                <el-option v-for="(item,index) in qsTypes" :key="index" :value="item.value" :label="item.label" />
              </el-select>

            </el-form-item>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-light">
            <el-form-item class="llll grid-content bg-purple rules add_top-f">
              <el-input v-model="sub.tsort" style="width: 100px;" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { isEmpty, transName, parseTime } from '@/utils/index'
import { add } from '@/api/qsExamJnl'

export default {
  mixins: [initData],
  props: {
    subTypes: {
      type: Array,
      required: true
    },
    grades: {
      type: Array,
      required: true
    },
    qsTypes: {
      type: Array,
      required: true
    },
    tipsCode: {
      type: Array,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      delLoading: false, dialog: false,

      trialGrades: '',
      testName: '',
      qsXzQuestion: '',
      qsTkQuestion: '',
      qsFlag: false,
      form: {
        id: '',
        qsExam: {},
        subType: '',
        havQs: [{
          id: '',
          tsort: '',
          qseqId: '',
          qseqType: '',
          enabled: '',
          qsExam: {},
          createBy: '',
          createTime: ''
        }]
      },
      multipleSelection: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    deleteSubItem(item, index) {
      this.index = this.form.havQs.indexOf(item)
      if (index !== -1) {
        this.form.havQs.splice(index, 1)
        this.$refs.multipleTable.toggleRowSelection(item)
      }
    },
    afterInit() {
      const _this = this
      _this.form.havQs.forEach(item => {
        _this.data.forEach(res => {
          // console.log(item.id + ' ' + res.id + ' ' + (parseInt(item.id) === parseInt(res.id)))
          if (parseInt(item.id) === parseInt(res.id)) {
            this.$refs.multipleTable.toggleRowSelection(res, true)
          }
        })
      })
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.doAdd()
    },
    doAdd() {
      if (this.form.havQs.length <= 0) {
        this.$notify({
          title: '试卷还未添加题目信息,请先选择题目',
          type: 'error',
          duration: 2500
        })
        return
      }
      var flag = false
      this.form.havQs.forEach(item => {
        if (item.qsXzQuestion === null && item.qseqType === '003002') {
          this.$notify({
            title: '排序号:' + item.tsort + ' 选择题目为空,不能设置为选择题',
            type: 'error',
            duration: 2500
          })
          flag = true
          return
        }
        if (item.qsTkQuestion === null && item.qseqType === '003001') {
          this.$notify({
            title: '排序号:' + item.tsort + '填空题目为空,不能设置为填空题',
            type: 'error',
            duration: 2500
          })
          flag = true
          return
        }
      })
      if (flag) {
        return
      }
      add(this.form).then(res => {
        this.showmsg(res)
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },

    showmsg(res) {
      var info = 'error'
      var msg = res.respMsg
      this.loading = false
      if (res.respCode === '000000') {
        // msg = res.respBody
        info = 'success'
        this.resetForm()
        this.sup_this.init()
      }

      this.$notify({
        title: msg,
        type: info,
        duration: 2500
      })
    },
    beforeInit() {
      this.url = 'api/qsExamQuestion'
      const sort = 'id,desc'
      if (this.qsFlag) {
        this.params = { page: this.page, size: this.size, sort: sort, subType: this.form.subType, qsexamId: this.form.qsExam.id, qsTkQuestion: this.qsTkQuestion, qsXzQuestion: this.qsXzQuestion }
      }
      return this.qsFlag
    },
    isEmpty, transName,
    batchAddToQs() {
      const _this = this

      _this.multipleSelection.forEach(res => {
        if (res.qsXzQuestion === null && res.qsTkQuestion === null) {
          this.$notify({
            title: '该题的题目为空,不能加入试卷',
            type: 'error',
            duration: 2500
          })
          return
        }
        res.tsort = res.unitSort
        _this.form.havQs.push(res)

        // this.data.forEach((m2, i2, arr) => {
        //   if (m2.id === res.id) {
        //     arr.splice(i2, 1)
        //   }
        // })
        // this.$refs.multipleTable.toggleRowSelection(res)
      })
      var result = []
      var obj = {}
      if (_this.form.havQs.length > 0) {
        for (var i = 0; i < _this.form.havQs.length; i++) {
          if (!obj[_this.form.havQs[i].id]) {
            var it = _this.form.havQs[i]
            result.push(it)
            obj[_this.form.havQs[i].id] = true
          }
        }
      }

      _this.form.havQs = result
      _this.form.havQs.sort(function(a, b) {
        if (a.unitSort < b.unitSort) {
          return -1
        } else if (a.unitSort === b.unitSort) {
          return 0
        } else {
          return 1
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        qsExam: {},
        havQs: [{
          id: '',
          tsort: '',
          qsExam: {},
          qseqType: '',
          enabled: '',
          createBy: '',
          createTime: ''
        }]

      }
    }
  }
}
</script>

<style scoped>
.item_boder {
  border: 1px solid rgb(234, 234, 221);
  padding: 1px 0;
  margin-bottom: -1px;
}
.add_btn_add {
  color: #409eff;
  font-weight: bold;
  cursor: pointer;
}
.form_add_top_title {
  background: #f1f1f1 !important;
  padding: 5px 0;
  text-align: center;
}
.add_btn_add_line {
  height: 34px;
  line-height: 34px;
}
.item_boder .el-form-item {
  margin-bottom: 0px;
}
.add_top-f {
  margin-top: 0px;
  padding: 0px;
}
.add_top-f .el-form-item__error {
  padding-top: 0px !important;
}
</style>
<style lang="scss">
.llll.el-form-item--small .el-form-item__content {
  margin-left: 0 !important;
  text-align: center !important;
}
</style>
