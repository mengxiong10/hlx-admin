<template>
  <div class="dashboard-editor-container">
    <panel-group/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">

        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'

import BarChart from './components/BarChart'
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,

    BarChart
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 18px 22px 22px 22px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
