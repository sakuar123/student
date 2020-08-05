<template>
  <div id="student-leave-count">
    <h1 style="color:#00CED1">{{msg}}</h1>
    <div id="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="studentName"
          label="学生姓名"
          width="380">
        </el-table-column>
        <el-table-column
          prop="leaveFormName"
          label="请假类型"
          width="380">
        </el-table-column>
        <el-table-column
          prop="count"
          label="统计数量">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StudentLeaveCount",
    mounted() {
      this.search();
    },
    methods: {
      search() {
        return this.axios({
          method: "GET",
          url: "http://localhost:8083/student/leave/count",
        }).then((res) => {
          if (res.data.status != '200') {
            this.$message.error(res.data.message);
            return;
          }
          this.tableData = res.data.body;
        });
      }
      ,
    }
    ,
    data() {
      return {
        msg: "请假统计",
        tableData: [],
      }
    }
    ,
  }
</script>

<style scoped>
  #table {
    width: 65%;
    margin: 0px auto;
  }
</style>
