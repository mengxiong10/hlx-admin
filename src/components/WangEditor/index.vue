<template>
  <div>
    <div ref="editor" style="text-align:left;margin: 5px"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import E from 'wangeditor'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      editor: ''
    }
  },
  computed: {
    ...mapGetters([
      'alyOssUploadApi'
    ])
  },
  mounted() {
    this.$nextTick(function() {
      this.init()
    })
  },
  methods: {
    init() {
      const _this = this

      this.editor = new E(this.$refs.editor)
      _this.setMenus() // 设置菜单
      this.editor.create()
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
    },
    setMenus() {
      this.editor.customConfig.uploadImgShowBase64 = false // 使用 base64 保存图片
      this.editor.customConfig.debug = true // 使用 base64 保存图片
      // 不可修改
      this.editor.customConfig.uploadImgHeaders = this.headers
      // 自定义文件名，不可修改，修改后会上传失败
      this.editor.customConfig.uploadFileName = 'file'
      this.editor.customConfig.uploadImgServer = this.alyOssUploadApi // 上传图片到服务器

      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'image', // 插入图片
        'table', // 表格
        'undo', // 撤销
        'redo' // 重复
      ]
    },
    getHtml() {
      return this.editor.txt.html()
    },
    setHtml(txt) {
      this.editor.txt.html(txt)
    }

  }
}
</script>

<style scoped>
  .editor-content{
    padding-left: 5px;
  }
</style>
