<template>
  <div id="app">
    <div id="header">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
          <router-link to="/student">学生管理</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/student/leave">请假单管理</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/student/leave/count">统计报表</router-link>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </div>
    <br/>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'App',
    components: {},
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        activeIndex: "1",
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  #header {
    margin: 0px auto;
    width: 60%;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>
