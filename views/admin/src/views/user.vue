<template>
  <div class="user content">
    <div class="screen">
      <el-row :gutter="20">
        <el-col :span="7">
          <div>
            <el-input placeholder="请输入用户名" v-model="name">
              <template slot="prepend">用户名</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="14">
          <span class="date_label">选择注册时间</span>
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
    <el-table :data="users" border style="width: 100%">
      <el-table-column prop="_id" label="ID" ></el-table-column>
      <el-table-column align="center" prop="name" label="用户名" ></el-table-column>
      <el-table-column align="center" label="注册时间">
        <template slot-scope="scope">
          <span>{{ scope.row.date | date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="上次登录时间" >
        <template slot-scope="scope">
          <span>{{ scope.row.lastTime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="orderTotal" label="订单成交量" width="130"></el-table-column>
      <!-- <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="pager">
      <el-pagination background layout="prev, pager, next" :page-size="limit" :total="total" @current-change="pagination"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "shop",
  data() {
    return {
      users:[],
      total:0,
      limit:1,
      name:"",
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
      value7: ""
    };
  },
  methods:{
    pagination(page){
      this.$http.post('/api/user/all', { page: page }).then(data=>{
        this.users = data.data.data.users
        this.total = data.data.data.total;
        this.limit = data.data.data.limit;
      })
    }
  },
  mounted() {
    this.$store.state.nav = [
      { name: "用户管理", path: "/goods" },
      { name: "用户列表", path: null }
    ];
    this.pagination(1)
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