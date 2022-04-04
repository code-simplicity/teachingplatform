<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title">
      <div slot="animation-div">
      </div>
      <div slot="change-dialog-div">
      </div>
      <div slot="add-dialog-div">
      </div>
    </baseDiv>
  </div>
</template>
<script>
import baseDiv from 'components/utils/BaseDiv/Base'
export default {
  data () {
    return {
      codeDataList: [
        'C',
        'C++',
        `//冒泡排序
    private void sortBubble(int[] a)
    {
        int i,j,temp,len=a.length;
        for(i=0;i<len;i++)
        {
            for(j=0;j<len-i-1;j++)
            {
               if(a[j]>a[j+1]){
                   temp=a[j];
                   a[j]=a[j+1];
                   a[j+1]=temp;
               }
            }
        }
    }`
      ],
      option: {
        mode: 'text/x-java',
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        readOnly: true,
        theme: 'dracula'
      },
      title: [
        '更改数组',
        '输入数据'
      ],
      base: {}
    }
  },
  components: {
    baseDiv
  },
  mounted () {
    this.base = this.$refs.base
    this.base.moveCursor = this.moveCursor
    this.base.changeDialog = this.changeDialog
    this.base.addDialog = this.addDialog
    this.base.changeDataCode(2)
  },
  methods: {
    moveCursor () {
      const that = this.base
      console.log(that)
    },
    changeDialog () {

    },
    addDialog () {

    }
  }
}
</script>
<style lang="less" scoped>

</style>
