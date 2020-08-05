<template>
  <div id="student">
    <h1 style="color:#8B4513 ">{{msg}}</h1>
    <div id="main">
      <div id="form">
        <el-form :inline="true" :model="studend" class="demo-form-inline">
          <el-form-item label="学号:">
            <el-input v-model="studend.studentNo" placeholder="学号"></el-input>
          </el-form-item>

          <el-form-item label="学生姓名:">
            <el-input v-model="studend.studentName" placeholder="学生姓名"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search(null)">查询</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="warning" @click="clearInput()">重置搜索</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="info" @click="dialogFormVisible = true">新增学生</el-button>
          </el-form-item>
        </el-form>
        <div id="dialog-add">
          <el-dialog title="新增学生" :visible.sync="dialogFormVisible">
            <el-form :model="studend">

              <el-form-item label="学号:" :label-width="formLabelWidth" class="dialog-el-form-item">
                <el-input v-model="studend.studentNo" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="学生姓名:" :label-width="formLabelWidth" class="dialog-el-form-item">
                <el-input v-model="studend.studentName" autocomplete="off"></el-input>
              </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="create()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
      <div id="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="id"
            width="180">
          </el-table-column>
          <el-table-column
            prop="studentNo"
            label="学号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="学生姓名"
            width="250">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建时间"
            width="280">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="open(scope.row),dialogFormVisible1=true" type="text" size="small">修改</el-button>
              <template>
                <el-popconfirm title="确定删除该学生吗？" @onConfirm="del(scope.row)">
                  <el-button type="text" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <div id="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-count="totalPage"
            :current-page="pageNum"
            @current-change="search($event)"
            @prev-click="search($event)"
            @next-click="search($event)">
          </el-pagination>
        </div>
        <div id="dialog-update">
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible1">
            <el-form :model="studendUpdate">

              <el-form-item label="学号:" :label-width="formLabelWidth" class="dialog-el-form-item">
                <el-input v-model="studendUpdate.studentNo" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="学生姓名:" :label-width="formLabelWidth" class="dialog-el-form-item">
                <el-input v-model="studendUpdate.studentName" autocomplete="off"></el-input>
              </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="update()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Studend",
    mounted() {
      this.search(null);
    },
    methods: {
      onSubmit() {
        return true;
      }
      ,
      handleClick(row) {
        console.log(row);
        return true;
      }
      ,
      clearInput() {
        this.pageNum = 1;
        this.studend.studentName = '';
        this.studend.studentNo = '';
      },
      search(event) {
        this.pageNum = event == null ? 1 : event;
        return this.axios({
          method: "GET",
          url: "http://localhost:8083/students",
          params: {
            page: this.pageNum,
            size: 2,
            studentName: this.studend.studentName,
            studentNo: this.studend.studentNo
          }
        }).then((res) => {
          if (res.data.status != '200') {
            this.$message.error(res.data.message);
            return;
          }
          this.tableData = res.data.body.records;
          this.totalPage = res.data.body.pages;
        }).catch((error) => {
          this.$message.error(error.toString());
        });
      },
      create() {
        if (this.studend.studentName == null || this.studend.studentName.trim().length <= 1) {
          this.$message.error("请输入学生姓名!");
        }
        if (this.studend.studentNo == null || this.studend.studentNo.trim().length <= 1) {
          this.$message.error("请输入学号!");
        }
        return this.axios({
          method: "POST",
          url: "http://localhost:8083/students",
          data: JSON.stringify({
            studentNo: this.studend.studentNo,
            studentName: this.studend.studentName,
          }),
          headers: {'Content-Type': 'application/json'},
        }).then((res) => {
          if (res.data.status != '200') {
            this.$message.error(res.data.message);
            this.dialogFormVisible = false;
            return;
          }
          this.clearInput();
          this.search(null);
          this.dialogFormVisible = false;
          this.$message({
            message: "添加成功!",
            type: "success"
          });
        }).catch((error) => {
          this.$message.error(error.toString());
        });
      },
      open(row) {
        this.studendUpdate.studentName = row.studentName;
        this.studendUpdate.studentNo = row.studentNo;
        this.studendUpdate.studentId = row.id;
      },
      update() {
        if (this.studendUpdate.studentName == null || this.studendUpdate.studentName.trim().length <= 1) {
          this.$message.error("学生姓名不能为空!");
          this.dialogFormVisible1 = true;
        }
        if (this.studendUpdate.studentNo == null || this.studendUpdate.studentNo.trim().length <= 1) {
          this.$message.error("学号不能为空!");
          this.dialogFormVisible1 = true;
        }
        return this.axios({
          method: "PUT",
          url: "http://localhost:8083/students/" + this.studendUpdate.studentId,
          data: JSON.stringify({
            studentNo: this.studendUpdate.studentNo,
            studentName: this.studendUpdate.studentName,
          }),
          headers: {'Content-Type': 'application/json'},
        }).then((res) => {
          this.dialogFormVisible1 = false;
          if (res.data.status != '200') {
            this.$message.error(res.data.message);
            return;
          }
          this.$message({
            message: "修改成功!",
            type: "success"
          });
        }).catch((error) => {
          this.$message.error(error.toString());
        });
      },
      del(row) {
        return this.axios({
          method: "DELETE",
          url: "http://localhost:8083/students/" + row.id
        }).then((res) => {
          if (res.data.status != '200') {
            this.$message.error(res.data.message);
            return;
          }
          this.search(null);
          this.$message({
            message: row.studentName + '已经成功删除!',
            type: 'success'
          });
        }).catch((error) => {
          this.$message.error(error.toString());
        });
      },
    },
    data() {
      return {
        msg: "学生管理",
        pageNum: 1,
        totalPage: 1,
        studend: {
          studentNo: "",
          studentName: "",
        },
        studendUpdate: {
          studentNo: "",
          studentName: "",
          studentId: "",
        },
        tableData: [],
        dialogFormVisible: false,
        dialogFormVisible1: false,
        formLabelWidth: '120px',
      }
    },
  }
</script>

<style scoped>
  #main {
    margin: 0px auto;
    width: 60%;
  }

  #form {
    height: 30%;
    margin-bottom: 40px;
  }

  .el-form-item {
    margin: 0px 20px;
  }

  #page {
    margin-top: 30px;
    float: right;
  }

  .dialog-el-form-item {
    width: 60%;
    margin: 30px 0px;
  }
</style>
