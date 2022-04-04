<template>
  <el-container>
    <!-- 首部 -->
    <el-header>
      <!-- 导航栏 -->
      <el-menu
        class="el-menu-demo"
        text-color="#fff"
        active-text-color="#909399"
        :background-color="backgroundColor"
        mode="horizontal"
        router
      >
        <div class="content">
          <el-submenu
            v-for="(item, index) in bigNavItems"
            :key="index"
            :index="item.path"
          >
            <template slot="title">
              <i class="iconfont" :class="item.iconfont"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="(subItem, subIndex) in item.children">
              <el-submenu
                v-if="subItem.children"
                :key="subIndex"
                :index="subItem.path"
              >
                <template slot="title">{{ subItem.name }}</template>
                <el-menu-item
                  v-for="(ssubItem, ssubIndex) in subItem.children"
                  :key="ssubIndex"
                  :index="ssubItem.path"
                  >{{ ssubItem.name }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :key="subIndex" :index="subItem.path">{{
                subItem.name
              }}</el-menu-item>
            </template>
          </el-submenu>
          <el-submenu
            v-if="Object.keys(smellNavItems).length === 0 ? false : true"
            index="20"
          >
            <template slot="title">
              <i
                class="el-icon-s-fold"
                style="font-size: 28px; color: #2d2d2d"
              ></i>
            </template>
            <template>
              <el-submenu
                v-for="(item, index) in smellNavItems"
                :key="index"
                :index="item.path"
              >
                <template slot="title">
                  <i class="iconfont" :class="item.iconfont"></i>
                  <span>{{ item.name }}</span>
                </template>
                <template v-for="(subItem, subIndex) in item.children">
                  <el-submenu
                    v-if="subItem.children"
                    :key="subIndex"
                    :index="subItem.path"
                  >
                    <template slot="title">{{ subItem.name }}</template>
                    <el-menu-item
                      v-for="(ssubItem, ssubIndex) in subItem.children"
                      :key="ssubIndex"
                      :index="ssubItem.path"
                      >{{ ssubItem.name }}</el-menu-item
                    >
                  </el-submenu>
                  <el-menu-item v-else :key="subIndex" :index="subItem.path">{{
                    subItem.name
                  }}</el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-submenu>
        </div>
        <div class="user-info">
          <el-dropdown @command="handleCommand">
            <span>admin</span> <i class="el-icon-user-solid"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout" icon="el-icon-switch-button"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-menu>
    </el-header>
    <el-main>
      <!-- 路由占位符 -->
      <router-view></router-view>
      <audio
        v-show="music"
        id="audio"
        loop
        :src="require(`assets/music/${musicVal}`)"
      ></audio>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      music: false,
      screenWidth: document.body.clientWidth,
      audio: {},
      timer: false,
      musicVal: "千里千寻.mp3",
      backgroundColor: "#545c64",
      body: document.querySelector("body"),
      navItems: []
    };
  },
  watch: {
    screenWidth(newValue) {
      if (!this.timer) {
        this.screenWidth = newValue;
        this.timer = true;
        setTimeout(() => {
          this.timer = false;
        }, 400);
      }
    }
  },
  computed: {
    bigNavItems: function() {
      return this.screenWidth >= 829 ? this.navItems : {};
    },
    smellNavItems: function() {
      return this.screenWidth < 829 ? this.navItems : {};
    }
  },
  mounted() {
    // 获取导航栏信息
    this.navItems = require("@/json/navItems.json");
    // 获取audio背景音乐
    this.audio = document.getElementById("audio");
    this.changeMusic();
    this.changeThem();
    this.$EventBus.$on("change-theme", () => {
      this.changeThem();
    });
    this.$EventBus.$on("change-music", () => {
      this.changeMusic();
    });
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
    };
  },
  methods: {
    // 退出登录
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.doLogout();
          break;
      }
    },
    // 退出登录的方法
    doLogout() {
      this.$router.replace({
        path: "login"
      });
      this.$message({
        message: "退出登录成功",
        type: "success"
      });
    },
    changeMusic() {
      // 获取系统设置背景音乐
      const music = JSON.parse(window.sessionStorage.getItem("music"));
      if (music) {
        [this.music, this.musicVal] = music;
        if (this.music) {
          setTimeout(() => {
            this.audio.play();
          }, 800);
        } else {
          this.audio.pause();
        }
      }
    },
    changeThem() {
      // 获取系统设置主题
      const them = JSON.parse(window.sessionStorage.getItem("theme"));
      console.log(them);
      if (them) {
        this.backgroundColor = them[1];
        this.body.style.background =
          them[1] === "#545c64" ? "rgba(200,200,200,0.5)" : them[1];
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding: 0;
  z-index: 200;
  .el-menu {
    border: 1px solid white;
    .content {
      max-width: 700px;
      padding: 0 20px;
      margin: 0 auto;
      outline: 0;
      .el-submenu {
        outline: 0;
        float: left;
      }
    }
    .user-info {
      position: absolute;
      right: 20px;
      top: 25%;
      display: flex;
      align-items: center;
      cursor: pointer;
      /deep/.el-dropdown {
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
.el-container {
  top: 0px;
  margin: 0 20px;
  padding: 30px 0 20px;
  border-radius: 20px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.1)
  );
  .el-main {
    overflow: unset;
  }
}
</style>
