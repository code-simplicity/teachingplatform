<template>
    <div>
      <el-main>
        <div id="flame">
          <div
            class="showDiv"
            v-for="(item, index) in itemList"
            :key="index"
            :style="item.style"
            @click="click(item.path)"
          >
            {{ item.title }}
          </div>
        </div>
      </el-main>
      <el-footer>
        <el-card shadow="hover">
          <buttonGroup></buttonGroup>
        </el-card>
      </el-footer>
    </div>
</template>
<script>
import buttonGroup from 'components/utils/ButtonGroupB/Buttongroup'
const maxTag = 20
export default {
  data () {
    return {
      flame: {},
      dataList: [],
      itemList: [],
      index: 0,
      w: document.documentElement.clientWidth * 6 / 7
    }
  },
  components: {
    buttonGroup
  },
  mounted () {
    this.dataList = require('@/json/dataList.json')
    this.flame = document.getElementById('flame')
    this.createTag()
    setInterval(() => {
      this.itemList.length = 0
      this.createTag()
    }, 20000)
  },
  methods: {
    /* 创建欢迎界面路由掉下标签 */
    createTag () {
      let n = 0
      /* 循环 */
      const timer = setInterval(() => {
        if (n >= maxTag) {
          clearInterval(timer)
        }
        const index = Math.floor(Math.random() * this.dataList.length)
        const data = this.dataList[index]
        // 创建div
        const odiv = {
          ...data,
          style: this.itemStyle()
        }
        this.itemList.push(odiv)
        n++
      }, 800)
    },
    click (path) {
      this.$router.push(path)
    },
    color () {
      const r = Math.floor(Math.random() * 128)
      const g = Math.floor(Math.random() * 128)
      const b = Math.floor(Math.random() * 128)
      const color = 'rgba(' + r + ',' + g + ',' + b + ',' + Math.random() + ')'
      return color
    },
    itemStyle () {
    // var speed = 0
      const style = {}
      var startPosLeft = (this.index += Math.floor(Math.random() * this.w)) % this.w// 设置随机的开始x值的大小
      style.opacity = (Math.ceil(Math.random() * 3) + 8) / 10 // 设置透明度
      style.position = 'absolute'
      style.left = startPosLeft + 'px'
      style.fontFamily = 'KaiTi'
      style.color = this.color()
      style.fontSize = 20 + Math.ceil(Math.random() * 14) + 'px'
      style.left = startPosLeft + Math.ceil(Math.random() * 8) + 'px'
      return style
    }
  }
}
</script>
<style lang="less" scoped>
  #flame{
    height: 70vh;
  }
  .showDiv {
      position: absolute;
      animation: 15s show infinite linear;
      cursor: pointer;
  }
  .showDiv:hover {
      animation-play-state:paused;
  }
  @keyframes show {
      0% {
          font-size: 20px;
         color: blue;
      }
      30% {
          font-size: 30px;
          color: yellow;
          transform: translateY(15vh);
      }
      50% {
          font-size: 30px;
          color: black;
          transform: translateY(30vh);
      }
      70%{
          font-size: 30px;
          color: green;
          transform: translateY(40vh);
      }
      100% {
        font-size: 20px;
          color:crimson;
          transform: translateY(70vh);
      }
  }
</style>
