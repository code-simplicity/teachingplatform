<template>
  <baseDiv
    ref="base"
    :codeDataList="codeDataList"
    :option="option"
    :title="title"
    :levelList="levelList"
  >
    <transition-group
      slot="animation-div"
      class="sort"
      name="list-complete"
      tag="p"
    >
      <!-- 遍历数组 -->
      <div
        class="list-complete-item"
        v-for="(item, index) in sortList"
        :key="item.index"
      >
        <div>{{ item.val }}</div>
        <div
          class="item-div"
          :class="{
            change: isChange(index),
            active: isActived(index),
            complate: isComplete(index),
            insert: isInserted(index)
          }"
          :style="{ height: setHight(item.val) + 'px' }"
        ></div>
      </div>
    </transition-group>
    <el-form slot="change-dialog-div">
      <el-form-item label="数组个数:" label-width="80px">
        <el-input v-model.number="Player.len" placeholder="数组长度"></el-input>
      </el-form-item>
      <el-form-item label="最小值:" label-width="80px">
        <el-input v-model.number="Player.min" placeholder="最小数"></el-input>
      </el-form-item>
      <el-form-item label="最大值:" label-width="80px">
        <el-input v-model.number="Player.max" placeholder="最大数"></el-input>
      </el-form-item>
    </el-form>
    <el-form slot="add-dialog-div">
      <el-form-item label="数组:" label-width="60px">
        <el-input
          type="textarea"
          v-model="dataString"
          placeholder="数组"
        ></el-input>
      </el-form-item>
    </el-form>
  </baseDiv>
</template>

<script>
import baseDiv from "@/components/utils/BaseDiv/Base";
import { getArray } from "../../utils/index";
export default {
  name: "QuickSort",
  props: {},
  components: {
    baseDiv
  },
  data() {
    return {
      // 代码展示
      codeDataList: [
        `
    // 快速排序 java版
    public int[] quickSort(int[] array, int L, int R) {
        int i = L;
        int j = R;
        int pivot = array[(L + R) / 2];
        while (i <= j) {
            while (pivot > array[i]) {
                i++;
            }
            while (pivot < array[j]) {
                j--;
            }
            if (i <= j) {
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                i++;
                j--;
            }
        }
        if (L < j) {
            quickSort(array, L, j);
        }
        if (i < R) {
            quickSort(array, i, R);
        }
        return array;
    }`
      ],
      // 代码展示器配置
      option: {
        tabSize: 2,
        mode: "text/x-java",
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        readOnly: true,
        theme: "dracula",
        highlightDifferences: true,
        hintOptions: {
          completeSingle: false
        }
      },

      title: ["更改数组", "输入数据"],
      base: {},
      dataString: "",
      dataList: [],
      sortList: [], // 排序列表
      // 选中的数组标记
      actived: [],
      // 交换元素标记
      change: [],
      // 已完成元素标记
      sorted: [],
      // 插入排序所选中的元素
      inserted: [],
      // 面包屑
      levelList: [
        {
          name: "排序",
          path: "bubbleSort"
        },
        {
          name: " 快速排序",
          path: "quickSort"
        }
      ],
      // 是否排序
      isSort: true,
      // 是否结束
      isEnd: false,
      // 最大值
      maxVal: 100,
      // 最小值
      minVal: 1,
      // 演示的相关配置
      Player: {
        min: 1,
        max: 100,
        len: 10,
        i: 0,
        j: 0,
        status: -1, // 状态
        line: 0, // 线条初始值
        // 移动焦点
        moveCursor: {
          i: 0,
          j: 0
        }
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    // 将子组件的ref实例给到父组件的base
    this.base = this.$refs.base;
    this.base.moveCursor = this.moveCursor;
    this.base.changeDialog = this.initDataList;
    this.base.addDialog = this.initDataList2; // 添加数据的初始化
    this.initDataList(1, 100, 10);
    // 默认右侧代码展示区域的显示代码
    this.base.changeDataCode(0);
  },
  watch: {},
  methods: {
    // 真正的算法实现
    bubbleSort() {
      // TODO: 当前算法的实现
      const len = this.sortList.length; // 获取数组长度
      const that = this.base; // 实例赋值
      const left = this.Player.i;
      const right = len - 1;
      const pivot = left; // 基准
      let index = pivot + 1;
      const i = index;
      // 动画执行
      const change = () => {
        // 判断是否正在执行动画演示，并且是正在排序
        if (this.isPlay && this.isSort) {
          // 首先判断基准元素和第一个元素大小关系
          if (this.sortList[i] <= this.sortList[pivot]) {
            this.change = [pivot, i];
            console.log("this.change", this.change);
            // 交换位置
            const temp = this.sortList[i];
            this.$set(this.sortList, i, this.sortList[index]);
            this.$set(this.sortList, index, temp);
          }
          // 再将基准元素和上一个元素交换
          const temp = this.sortList[pivot];
          this.$set(this.sortList, pivot, this.sortList[index - 1]);
          this.$set(this.sortList, index - 1, temp);
          // 将index-1操作
          index = index - 1;
          // 循环
          setTimeout(() => {
            innerLoop();
          }, that.getSpeed() + 100);
        } else {
          this.Player.i = left;
          this.Player.j = right;
          this.Player.status = 0;
        }
      };

      // 循环函数
      const innerLoop = () => {
        const pivot = left;
        const index = pivot + 1;
        const i = index;
        if (this.change.length) {
          this.change.length = 0;
        }
        // 正在演示
        if (that.isPlay && this.isSort) {
          if (left < right) {
            // 这里做递归
            this.actived = [i, left];
            // 指定调用change函数
            setTimeout(() => {
              change();
            }, that.getSpeed() + 100);
          } else {
            this.sorted.push(i);
            // i++;
            // left = i + 1;
          }
        } else {
          this.Player.i = i;
          this.Player.j = left;
          this.Player.status = 1;
        }
      };

      // 调出循环
      const outLoop = () => {
        if (left < right) {
          innerLoop();
        } else {
          this.isEnd = true;
        }
      };
      // 选择执行的状态
      switch (this.Player.status) {
        // 改变动画
        case 0:
          change();
          break;
        // 循环
        case 1:
          innerLoop();
          break;
        // 默认不循环
        default:
          outLoop();
      }
    },

    // 移动焦点
    moveCursor() {
      const k = this.Player.line;
      const that = this.base;
      // const listLen = this.sortList.length;
      const i = this.Player.moveCursor.i;
      const j = this.Player.moveCursor.j;
      const innerLoop = () => {
        if (that.isPlay && !this.isEnd && !that.set.has(k)) {
          // if (k === )
          that.editor.setCursor(k, 0);
          setTimeout(() => {
            innerLoop();
          }, that.getSpeed());
        } else if (this.isEnd) {
          this.isPlay = false;
          this.initDataList2();
        } else {
          that.isPlay = false;
          that.focus = k;
          this.Player.line = k;
          this.Player.moveCursor.i = i;
          this.Player.moveCursor.j = j;
        }
      };
      innerLoop();
    },
    // 初始化数据
    initDataList() {
      const that = this.base; // 将this.base对象给that
      const n = this.Player.min; // 最小值
      const m = this.Player.max; // 最大值
      const len = this.Player.len; // 长度
      this.minVal = n;
      this.maxVal = m;
      this.isPlay = false; // 不播放
      const res = [];
      for (let i = 0; i < len; i++) {
        // 往数组中添加随机数
        res.push(that.getRandom(m, n));
      }
      // 清除动画
      // this.clear();
      this.datalist = res; // 给生成数据的值
      this.dataString = res.toString(); // 字符串化
      setTimeout(() => {
        this.initSortList(); // 初始化排序
      }, 1000);
    },

    // 初始化排序列表
    initSortList() {
      for (let i = 0; i < this.datalist.length; i++) {
        this.sortList.push({ index: i, val: this.datalist[i] });
      }
    },

    initDataList2() {
      const that = this.base;
      that.inputDialogVisible = false;
      that.isPlay = false;
      this.clear();
      this.datalist = getArray(this.dataString);
      this.Player.len = this.datalist.length;
      this.minVal = Math.min(...this.datalist);
      this.maxVal = Math.max(...this.datalist);
      setTimeout(() => {
        this.initSortList();
      }, 1000);
    },

    // 清除数据
    clear() {
      const that = this.base;
      that.isPlay = false;
      this.datalist = [];
      this.sortList = [];
      this.actived = [];
      this.change = [];
      this.sorted = [];
      this.isEnd = false;
      setTimeout(() => {
        this.Player.i = 0;
        this.Player.j = 0;
        this.Player.status = -1;
        this.Player.line = 0;
        this.Player.moveCursor.i = 0;
        this.Player.moveCursor.j = 0;
      }, 800);
    },

    // 设置柱状图高度
    setHight(n) {
      return ((n - this.minVal + 1) / (this.maxVal - this.minVal)) * 100;
    },

    // 是否改变
    isChange(index) {
      return this.change.includes(index);
    },
    // 是否激活
    isActived(index) {
      return this.actived.includes(index);
    },
    // 是否编译
    isComplete(index) {
      return this.sorted.includes(index);
    },
    // 是否插入数据
    isInserted(index) {
      return this.inserted.includes(index);
    }
  }
};
</script>

<style lang="less" scoped>
.sort {
  top: 0;
  height: 100%;
  width: 600px;
  margin: 100px auto;
  text-align: center;
  .list-complete-item {
    margin: 0 10px;
    top: 50%;
    display: inline-block;
    transition: transform 0.5s;
    .item-div {
      display: inline-block;
      background-color: rgb(214, 59, 59);
      width: 20px;
      .active {
        background-color: yellow;
        color: #fff;
      }
      .change {
        background-color: red;
        color: #fff;
      }
      .complate {
        background-color: green;
        color: #fff;
      }
      .insert {
        background-color: blue;
        color: #fff;
      }
    }
  }
}
</style>
