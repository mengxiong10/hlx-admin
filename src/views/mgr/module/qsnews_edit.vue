<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './qsnews_form'
import { findById } from '@/api/qsNews'

export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      var hides = this.data.hide === 1
      var banner = this.data.banner === 1
      var params = { 'id': this.data.id }
      findById(params).then(res => {
        _this.form = {
          id: this.data.id,
          title: this.data.title,
          imageUrl: this.data.imageUrl,
          synopsis: this.data.synopsis,
          tcontent: res.tcontent,
          tsort: this.data.tsort,
          visit: this.data.visit,
          enabled: this.data.enabled,
          hides: hides,
          hide: this.data.hide,
          createTime: this.data.createTime,
          createBy: this.data.createBy,
          likes: this.data.likes,
          banners: banner,
          banner: this.data.banner,
          bannerUrl: res.bannerUrl,
          updateTime: this.data.updateTime,
          updateBy: this.data.updateBy
        }
        if (this.data.banner) {
          _this.srcList = []
          res.bannerUrl.split(',').forEach((element) => {
            if (element !== '') {
              this.url = element
              _this.srcList.push(element)
            }
          })
        }
        _this.$refs.editor.setHtml(res.tcontent)
      })

      //
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
