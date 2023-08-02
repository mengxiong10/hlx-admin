<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="100px"
    >
      <el-form-item label="标题:" prop="title">
        <el-input v-model="form.title" style="width: 370px" />
      </el-form-item>
      <el-form-item label="描述:" prop="des">
        <el-input v-model="form.des" type="textarea" style="width: 370px" />
      </el-form-item>
      <el-form-item label="图片:" prop="imgUrl">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :action="alyOssUploadApi"
          :headers="headers"
          accept="image/*"
          class="wx-avatar-uploader"
        >
          <img v-if="form.imgUrl" :src="form.imgUrl" class="wx-avatar" />
          <i v-else class="el-icon-plus wx-avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button :loading="submitLoading" type="primary" @click="onSubmit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import { getWxInfo, updateWxInfo } from "@/api/qsWx";

export default {
  data() {
    return {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      form: {
        title: "",
        des: "",
        imgUrl: "",
      },
      rules: {
        title: [{ required: true, message: "必填", trigger: "blur" }],
      },
      submitLoading: false,
    };
  },
  mounted() {
    getWxInfo().then((res) => {
      this.form = res.respBody;
    });
  },
  computed: {
    ...mapGetters(["alyOssUploadApi"]),
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          updateWxInfo(this.form).then(() => {
            this.submitLoading = false;
            this.$notify({
              title: "保存成功",
              type: "success",
              duration: 1000,
            });
          });
        }
      });
    },
    handleAvatarSuccess(response, file, fileList) {
      this.form.imgUrl = response.fileUrl;
    },
  },
};
</script>

<style>
.wx-avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.wx-avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.wx-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.wx-avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
