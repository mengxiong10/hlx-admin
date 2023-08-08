<template>
  <div>
    <el-button v-if="entrytype === 1" size="mini" icon="el-icon-edit" type="primary" @click="to" />
    <el-button v-if="entrytype === 2" size="mini" type="primary" @click="to">分配教师</el-button>
    <eForm
      ref="form"
      :sup_this="sup_this"
      :stuauths="stuauths"
      :stusources="stusources"
      :entrytype="entrytype"
      :is-add="false"
      :grades="grades"
    />
  </div>
</template>
<script>
import eForm from './qsstudent_form'
export default {
  components: { eForm },
  props: {
    data: {
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
    stuauths: {
      type: Array,
      required: true,
    },
    stusources: {
      type: Array,
      required: true,
    },
    entrytype: {
      type: Number,
      required: true,
    },
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        nickname: this.data.nickname,
        unionid: this.data.unionid,
        phone: this.data.phone,
        avatar: this.data.avatar,
        realName: this.data.real_name,
        pass: this.data.pass,
        username: this.data.username,
        gander: this.data.gander,
        birthday: this.data.birthday,
        grade: this.data.grade,
        province: this.data.province,
        city: this.data.city,
        county: this.data.county,
        address: this.data.address,
        parentName: this.data.parent_name,
        parentPhone: this.data.parent_phone,
        enabled: this.data.enabled,
        registerFlag: this.data.register_flag,
        registerTime: this.data.register_time,
        createTime: this.data.create_time,
        updateTime: this.data.update_time,
        updateBy: this.data.update_by,
        teachId: this.data.teach_id,
        onlineScore: this.data.online_score,
        offlineScore: this.data.offline_score,
        deptName: this.data.deptName,
        teachName: this.data.teachName,
        deptId: this.data.dept_id,
        loginTime: this.data.login_time,
        appVersion: this.data.app_version,
        deviceModel: this.data.device_model,
        deviceBrand: this.data.device_brand,
        deviceSystem: this.data.device_system,
        devicePlatform: this.data.device_platform,
        pushEnabled: this.data.push_enabled,
        pushId: this.data.push_id,
        source: this.data.source,
        authType: this.data.auth_type,
      }
      console.log(this.data)
      _this.getTeachInfos(this.data.dept_id)
      _this.getDeptInfos(this.data.grade)
      _this.dialog = true
    },
  },
}
</script>

<style scoped>
div {
  display: inline-block;
  margin-right: 3px;
}
</style>
