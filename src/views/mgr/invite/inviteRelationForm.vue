<template>
  <el-dialog
    :append-to-body="true"
    :visible="visible"
    title="新增邀请关系"
    width="600px"
    @close="handleCancel"
  >
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="100px">
      <el-form-item label="邀请人" prop="inviterId">
        <el-select
          v-model="form.inviterId"
          :remote-method="searchInviter"
          :loading="loadingInviter"
          filterable
          remote
          reserve-keyword
          placeholder="请输入姓名或手机号搜索邀请人"
          style="width: 100%"
        >
          <el-option
            v-for="item in inviterOptions"
            :key="item.id"
            :label="`${item.real_name || ''} (${item.username || ''})`"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="被邀请人" prop="inviteeId">
        <el-select
          v-model="form.inviteeId"
          :remote-method="searchInvitee"
          :loading="loadingInvitee"
          filterable
          remote
          reserve-keyword
          placeholder="请输入姓名或手机号搜索被邀请人"
          style="width: 100%"
        >
          <el-option
            v-for="item in inviteeOptions"
            :key="item.id"
            :label="`${item.real_name || ''} (${item.username || ''})`"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="handleCancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="handleSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createInviteRelation, searchStudent } from '@/api/invite'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    onSuccess: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        inviterId: '',
        inviteeId: '',
      },
      rules: {
        inviterId: [{ required: true, message: '请选择邀请人', trigger: 'blur' }],
        inviteeId: [{ required: true, message: '请选择被邀请人', trigger: 'blur' }],
      },
      loading: false,
      loadingInviter: false,
      loadingInvitee: false,
      inviterOptions: [],
      inviteeOptions: [],
    }
  },
  watch: {
    visible(value) {
      if (value) {
        // 重置表单
        this.form.inviterId = ''
        this.form.inviteeId = ''
        this.inviterOptions = []
        this.inviteeOptions = []
      }
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 检查邀请人和被邀请人不能是同一人
          if (this.form.inviterId === this.form.inviteeId) {
            this.$message.error('邀请人和被邀请人不能是同一人')
            return false
          }
          this.submit()
        } else {
          return false
        }
      })
    },
    searchInviter(name) {
      if (!name) {
        this.inviterOptions = []
        return
      }
      this.loadingInviter = true
      searchStudent(name)
        .then((res) => {
          this.inviterOptions = res.content || []
          this.loadingInviter = false
        })
        .catch(() => {
          this.loadingInviter = false
        })
    },
    searchInvitee(name) {
      if (!name) {
        this.inviteeOptions = []
        return
      }
      this.loadingInvitee = true
      searchStudent(name)
        .then((res) => {
          this.inviteeOptions = res.content || []
          this.loadingInvitee = false
        })
        .catch(() => {
          this.loadingInvitee = false
        })
    },
    async submit() {
      try {
        this.loading = true
        await createInviteRelation({
          inviterId: this.form.inviterId,
          inviteeId: this.form.inviteeId,
        })
        this.$message.success('新增邀请关系成功')
        this.loading = false
        this.handleCancel()
        this.onSuccess()
      } catch (error) {
        this.loading = false
      }
    },
    handleCancel() {
      this.$refs['form'].resetFields()
      this.onClose()
    },
  },
}
</script>
