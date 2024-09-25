<template> 
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveIndex()" @mouseenter="enterShow()">
        <h2 class="all">全部商品分类</h2>
         
         <!-- 过渡动画添加 -->
        <transition name="sort">
        <div class="sort" v-show="show">
        <div class="all-sort-list2">
          <!-- 一级分类 -->
          <div class="item" v-for='(c1, index) in categoryList' :key="c1.categoryId" :class="{cur:curIndex===index}" @click="goSearch">
            <h3 @mouseenter="changeIndex(index)">
              <a  href="javascript:" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
              <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
            </h3>
            <!-- 二、三级分类 -->
            <div class="item-list clearfix" :style="{display:(curIndex===index)? 'block':'none'}" v-for='(c2, index) in c1.categoryChild' :key="c2.categoryId">
              <div class="subitem">
                <dl class="fore">
                  <dt>
                    <a  href="javascript:" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                    <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                  </dt>
                  <dd>
                    <!-- 三级分类 -->
                    <em v-for='(c3)  in c2.categoryChild' :key="c3.categoryId">
                      <a href="javascript:" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                      <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
         
        </div>
       </div> 
      </transition>
      </div>
      
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// 引入lodash插件实现防抖或者节流,按需加载,如果throttle是默认暴露就不用加"{}"将throttle括起来
import {throttle} from 'lodash';
export default {
  name: "TypeNav",
  mounted(){
    //组件挂载完后通过Vuex向服务器发请求，获取数据，存储于仓库当中
    // this.$store.dispatch('categoryList')
    
  },
  data(){
    return {
      curIndex: -1,   // 存储用户鼠标移动的位置
      show:true
    }
  },
  computed:{
    ...mapState({
      categoryList:(state)=>{
        return state.home.categoryList
      }
    })
  },
  methods:{
    // 鼠标介入 ，修改鼠标移动的index属性
    // changeIndex(index){
    //   // index:鼠标移动到一级索引的索引值
    //  this.curIndex=index
    //  console.log("鼠标进入"+index);
    // },
    // 节流写法
    changeIndex: throttle(function(index){
      this.curIndex=index
    },100),
    moveIndex(){
      this.curIndex=-1
      if(this.$route.path!='/home'){
        this.show = false
      }
    },
    goSearch(event){
      let {categoryname,category1id,category2id,category3id} = event.target.dataset // 解构出自定义属性名,注意小写
      // console.log(event.target.dataset);
      // console.log(categoryname,category1id,category2id,category3id);
      
      if(categoryname){
        let location = {name:'search', query:''} // 要用let声明 不然会出错,跳转到home组件 不知道为啥...
        let query = {categoryName:categoryname,categoryid:''}
        if(category1id){
          query.categoryid=category1id
         
        }
        if(category2id){
          query.categoryid=category2id
        }
        if(category3id){
          query.categoryid=category3id
        }
        
        if(this.$route.params){
          location.params = this.$route.params  // 将params参数传入
          location.query = query
          if (this.$route.path != '/home') {
            this.$router.replace(location)
          } else {
            this.$router.push(location)
          }
        } 
        // console.log(this.$route);
      }
      
      
    },
    //鼠标移动到全部商品分类时,展示菜单栏
    enterShow(){
      if(this.$route.path!='/home'){
        this.show = true
      }
    }
  }
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
         
          }
          
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   //初始方式：通过样式当鼠标移动到三级联动位置将二、三级的样式显示出来
          //   .item-list {
          //     display: block;
          //     background-color: #fff;
          //   }
          // }
        }
        // .item:hover{
        //     background-color: skyblue; //样式直接控制
        //   }

      .cur{
        background-color: paleturquoise;
      }
      }
    }

    .sort-enter{
      // 动画开始状态
      height: 0px;
    }
    .sort-enter-to{
      //动画结束状态
      height:461px;
      // transform: rotate(50deg);
    }
    .sort-enter-active{
      // 动画过渡
      transition: all 0.5s linear;
    }
  }
}

</style>
