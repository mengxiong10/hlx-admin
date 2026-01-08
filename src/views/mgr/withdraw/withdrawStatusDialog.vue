<template>
  <el-dialog
    :append-to-body="true"
    :visible="visible"
    :title="getDialogTitle()"
    width="500px"
    @close="handleCancel"
  >
    <el-form ref="form" :model="form" label-position="right" label-width="100px">
      <el-form-item label="邀请人">
        <el-input :value="withdrawRecord && withdrawRecord.inviterName" disabled />
      </el-form-item>
      <el-form-item label="提现金额">
        <el-input :value="withdrawRecord && withdrawRecord.amount ? withdrawRecord.amount + ' 分' : ''" disabled />
      </el-form-item>
      <el-form-item label="微信号">
        <el-input :value="withdrawRecord && withdrawRecord.wechatAccount ? withdrawRecord.wechatAccount : ''" disabled />
      </el-form-item>
      <el-form-item label="状态">
        <el-input :value="getStatusText(status)" disabled />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          type="textarea"
          :rows="3"
          placeholder="请输入备注信息（可选）"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="handleCancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="handleSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateWithdrawStatus } from '@/api/withdraw'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    withdrawRecord: {
      type: Object,
      default: null,
    },
    status: {
      type: String,
      default: '',
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
        remark: '',
      },
      loading: false,
    }
  },
  watch: {
    visible(value) {
      if (value) {
        this.form.remark = (this.withdrawRecord && this.withdrawRecord.remark) || ''
      }
    },
  },
  methods: {
    getDialogTitle() {
      const titleMap = {
        APPROVED: '通过提现申请',
        REJECTED: '拒绝提现申请',
        COMPLETED: '完成提现',
      }
      return titleMap[this.status] || '修改提现状态'
    },
    getStatusText(status) {
      const statusMap = {
        PENDING: '待审核',
        APPROVED: '已通过',
        REJECTED: '已拒绝',
        COMPLETED: '已完成',
      }
      return statusMap[status] || status
    },
    handleSubmit() {
      if (!this.withdrawRecord || !this.withdrawRecord.id) {
        this.$message.error('提现记录信息不完整')
        return
      }
      this.loading = true
      updateWithdrawStatus({
        id: this.withdrawRecord.id,
        status: this.status,
        remark: this.form.remark,
      })
        .then(() => {
          this.$message.success('操作成功')
          this.loading = false
          this.handleCancel()
          this.onSuccess()
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleCancel() {
      this.form.remark = ''
      this.onClose()
    },
  },
}
</script>
