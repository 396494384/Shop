<template>
  <div class="order content">
    <div class="screen">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-select v-model="value" placeholder="请选择订单状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <div>
            <el-input placeholder="请输入订单号" v-model="input3">
              <template slot="prepend">订单号</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <el-input placeholder="请输入名称" v-model="input3">
              <template slot="prepend">商品名称</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <el-select v-model="value" placeholder="请选择商品类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row2">
        <el-col :span="21">
          <span class="date_label">选择下单时间</span>
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
          ></el-date-picker>
        </el-col>
        <el-col :span="3" class="search_btn">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="订单号"></el-table-column>
      <el-table-column prop="price" label="下单时间" width="180"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="type" label="商品类型" width="180"></el-table-column>
      <el-table-column prop="price" label="下单价格" width="180"></el-table-column>
      <el-table-column prop="count" label="下单数量" width="100"></el-table-column>
      <el-table-column prop="price" label="订单状态" width="100"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "shop",
  data() {
    return {
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value6: "",
      value7: ""
    };
  }
};
</script>
<style scoped>
.screen {
  padding-bottom: 20px;
}
.screen .row2 {
  padding-top: 20px;
}
.date_label {
  color: #909399;
  font-size: 14px;
  padding-right: 15px;
}
.screen .radio {
  padding-top: 12px;
}
.screen .el-radio {
  margin-left: 20px;
}
.screen .search_btn {
  text-align: right;
}
</style>