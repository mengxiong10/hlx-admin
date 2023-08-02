<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      -->
    <el-input
      v-model="query.realName"
      clearable
      placeholder="学生姓名"
      style="width: 150px"
      class="filter-item"
      @keyup.enter.native="toQuery"
    />
    <el-input
      v-model="query.phone"
      clearable
      placeholder="手机号"
      style="width: 150px"
      class="filter-item"
      @keyup.enter.native="toQuery"
    />
    <el-input
      v-if="false"
      v-model="query.teachName"
      clearable
      placeholder="老师姓名"
      style="width: 150px"
      class="filter-item"
      @keyup.enter.native="toQuery"
    />
    <el-select
      v-if="user.job !== '老师'"
      v-model="query.teachName"
      clearable
      placeholder="老师姓名"
      class="filter-item"
      style="width: 130px"
    >
      <el-option
        v-for="item in teachinfos"
        :key="item.key"
        :label="item.username"
        :value="item.username"
      />
    </el-select>
    <el-select
      v-model="query.qstbId"
      clearable
      placeholder="课程"
      class="filter-item"
      style="width: 130px"
    >
      <el-option
        v-for="item in textbooks"
        :key="item.key"
        :label="item.qs_name"
        :value="item.id"
      />
    </el-select>
    <el-input
      v-if="false"
      v-model="query.username"
      clearable
      placeholder="用户名"
      style="width: 150px"
      class="filter-item"
      @keyup.enter.native="toQuery"
    />

    <el-button
      class="filter-item"
      size="mini"
      type="success"
      icon="el-icon-search"
      @click="toQuery"
      >搜索</el-button
    >
    <!-- 新增 -->
    <div v-if="false" style="display: inline-block; margin: 0px 2px">
      <el-button
        v-permission="['ADMIN', 'QSSTUDENT_ALL', 'QSSTUDENT_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true"
        >新增</el-button
      >
      <eForm
        ref="form"
        :entrytype="1"
        :is-add="true"
        :sup_this="sup_this"
        :grades="grades"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import eForm from "./qsstudent_form";
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true,
    },
    sup_this: {
      type: Object,
      required: true,
    },
    grades: {
      type: Array,
      required: true,
    },
    textbooks: {
      type: Array,
      required: true,
    },
    teachinfos: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      queryTypeOptions: [
        { key: "nickname", display_name: "昵称" },
        { key: "phone", display_name: "手机号" },
        { key: "realName", display_name: "姓名" },
      ],
    };
  },
  methods: {
    toQuery() {
      this.sup_this.page = 0;
      this.sup_this.init();
    },
  },
};
</script>
