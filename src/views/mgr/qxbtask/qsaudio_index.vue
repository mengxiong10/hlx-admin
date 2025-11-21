<template>
  <div class="app-container">
    <eHeader :query="query" :sub-types="subTypes" :sup_this="sup_this" />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%">
      <el-table-column prop="word" align="center" label="字词" />
      <el-table-column prop="translation" align="center" label="翻译" />
      <el-table-column prop="audioType" align="center" show-overflow-tooltip label="类型">
        <template slot-scope="scope">
          {{ transName(subTypes, scope.row.audioType) }}
        </template>
      </el-table-column>
      <el-table-column prop="audioUrl" align="center" show-overflow-tooltip label="oss路径" />
      <el-table-column prop="createTime" align="center" show-overflow-tooltip label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" align="center" show-overflow-tooltip label="更新日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="checkPermission(['ADMIN', 'QSAUDIO_ALL', 'QSAUDIO_EDIT', 'QSAUDIO_DELETE'])"
        label="操作"
        width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <edit
            v-permission="['ADMIN', 'QSAUDIO_ALL', 'QSAUDIO_EDIT']"
            :data="scope.row"
            :sub-types="subTypes"
            :sup_this="sup_this"
          />
          <el-popover
            v-permission="['ADMIN', 'QSAUDIO_ALL', 'QSAUDIO_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="180"
          >
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
import { del } from '@/api/qsAudio'
import { parseTime, isEmpty, transName } from '@/utils/index'
import { dictName } from '@/api/dictDetail'

import eHeader from './module/qsaudio_header'
import edit from './module/qsaudio_edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      subTypes: [],
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.dictName('subtype_code')
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
      })
    },
    beforeInit() {
      this.url = 'api/qsAudio'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) {
        this.params[type] = value
      }

      const word = query.word
      if (word !== '' && word !== null) {
        this.params['word'] = word
      }
      const audioType = query.audioType
      if (audioType !== '' && audioType !== null) {
        this.params['audioType'] = audioType
      }

      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id)
        .then((res) => {
          this.delLoading = false
          this.$refs[id].doClose()
          this.init()
          this.$notify({
            title: '删除成功',
            type: 'success',
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
