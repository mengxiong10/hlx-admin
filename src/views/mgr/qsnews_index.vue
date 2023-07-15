<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this" />
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      border
      size="small"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="title"
        show-overflow-tooltip
        label="标题"
      />
      <el-table-column align="center" prop="tsort" label="序号" />
      <el-table-column align="center" prop="hide" label="是否隐藏">
        <template slot-scope="scope">
          <span v-if="scope.row.hide === 1">是</span>
          <span v-if="scope.row.hide === 0">否</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="synopsis"
        show-overflow-tooltip
        label="作者或编者"
      />
      <el-table-column
        align="center"
        prop="imageUrl"
        show-overflow-tooltip
        label="图片或视频"
      />
      <el-table-column
        align="center"
        prop="createTime"
        show-overflow-tooltip
        label="创建日期"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createUserBy" label="创建人" />
      <el-table-column align="center" prop="visit" label="浏览次数" />
      <el-table-column align="center" prop="likes" label="点赞数" />
      <el-table-column align="center" prop="banner" label="是否轮播">
        <template slot-scope="scope">
          {{ scope.row.banner === 1 ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          checkPermission([
            'ADMIN',
            'QSNEWS_ALL',
            'QSNEWS_EDIT',
            'QSNEWS_DELETE',
          ])
        "
        label="操作"
        width="200px"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="toComment(scope.row.id)"
          >
            查看评论
          </el-button>
          <edit
            v-permission="['ADMIN', 'QSNEWS_ALL', 'QSNEWS_EDIT']"
            :data="scope.row"
            :sup_this="sup_this"
          />
          <el-popover
            v-permission="['ADMIN', 'QSNEWS_ALL', 'QSNEWS_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="180"
          >
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="$refs[scope.row.id].doClose()"
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
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            />
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

    <el-drawer
      :visible.sync="drawer"
      :append-to-body="true"
      class="mydraw"
      direction="rtl"
      title="评论列表"
    >
      <div class="block" style="bottom: 20px">
        <el-timeline class="infinite-list-item" style="bottom: 20px">
          <el-timeline-item
            v-for="(item, index) in datas"
            :key="index"
            :timestamp="timeFor(item)"
            color="#0bbd87"
            placement="top"
          >
            <el-card shadow="hover">
              {{ item.content }}
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>

      <div style="position: fixed; bottom: 10px">
        <el-pagination
          :total="totals"
          style="margin-top: 8px"
          layout="total, prev, pager, next, sizes"
          @size-change="sizeChanges"
          @current-change="pageChanges"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import initDatas from "@/mixins/initDatas";
import { del } from "@/api/qsNews";
import { parseTime } from "@/utils/index";
import eHeader from "./module/qsnews_header";
import edit from "./module/qsnews_edit";

export default {
  components: { eHeader, edit },
  mixins: [initData, initDatas],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      drawer: false,
      comments: [],
      newsId: "",
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    parseTime,
    checkPermission,
    timeFor(item) {
      return (
        this.parseTime(item.create_time) +
        "  " +
        item.username +
        "(" +
        item.real_name +
        ")"
      );
    },
    handleSizeChange(val) {
      this.pagesSize = val;
    },
    handleCurrentChange(val) {
      this.pages = val;
    },
    toComment(newId) {
      this.newsId = newId;
      this.drawer = true;
      this.inits();
    },

    beforeInits() {
      this.urls = "api/qsNewsCommentPage";

      this.paramss = { page: this.pages, size: this.sizes, id: this.newsId };

      return true;
    },
    beforeInit() {
      this.url = "api/qsNews";
      const sort = "tsort,asc";
      this.params = { page: this.page, size: this.size, sort: sort };
      const query = this.query;
      const type = query.type;
      const value = query.value;
      if (type && value) {
        this.params[type] = value;
      }

      const title = query.title;
      if (title !== "" && title !== null) {
        this.params["title"] = title;
      }
      const synopsis = query.synopsis;
      if (synopsis !== "" && synopsis !== null) {
        this.params["synopsis"] = synopsis;
      }

      return true;
    },
    subDelete(id) {
      this.delLoading = true;
      del(id)
        .then((res) => {
          this.delLoading = false;
          this.$refs[id].doClose();
          this.init();
          this.$notify({
            title: "删除成功",
            type: "success",
            duration: 2500,
          });
        })
        .catch((err) => {
          this.delLoading = false;
          this.$refs[id].doClose();
          console.log(err.response.data.message);
        });
    },
  },
};
</script>

<style >
.el-drawer.rtl {
  overflow: auto !important;
}
</style>
