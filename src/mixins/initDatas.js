import { initData } from '@/api/data'

export default {
  data() {
    return {
      loadings: true, datas: [], pages: 0, sizes: 10, totals: 0, urls: '', paramss: {}, querys: {}, times: 170
    }
  },
  methods: {
    async inits() {
      if (!await this.beforeInits()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loadings = true
        initData(this.urls, this.paramss).then(res => {
          this.totals = res.totalElements
          this.datas = res.content
          setTimeout(() => {
            this.loadings = false
          }, this.times)
          resolve(res)
        }).catch(err => {
          this.loadings = false
          reject(err)
        })
      })
    },
    beforeInits() {
      return true
    },
    pageChanges(e) {
      this.pages = e - 1
      this.inits()
    },
    sizeChanges(e) {
      this.pages = 0
      this.sizes = e
      this.inits()
    }
  }
}
