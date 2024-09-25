接口：http://gmall-h5-api.atguigu.cn

### day1总结
(1)路由组件和静态组件结构完成

### day2总结

(1)接口测试:与接口有关的文件都写在api文件夹下
(2)axios二次封装
(3)接口统一管理
    1. 项目较小：完全可以在组件的生命周期函数中发请求，可以不统一管理
        2. 项目大：
        (4)跨域问题的解决:// ###############********改完配置文件记得重启项目*********#################

(5) nprogress进度条的使用: 安装（`npm install --save nprogress`） 可以在请求拦截器和响应拦截器中使用 

(6)vuex集中式管理状态

### 24-1-17日之前：
 （1）将页面固定的组件写到component下，然后将路由组件完成：将路由组件写到pages文件夹下，在router文件夹的index下进行路由设置
 （2）与接口有关的内容写在api文档下，在request.js下对axios进行二次封装，利用请求和响应拦截器在请求和响应前后完成其他业务.并设置进度条显示请求内容返回情况。将接口统一在index.js下进行管理
 （3）引入vuex进行状态集中管理，在store文件夹下，对每个组件设置一个仓库

### 24-1-17
(1)对三级联动组件设置为全局组件，放到components文件夹下。组件挂载完毕就通过vuex的action进行发请求获取服务器的三级联动相关列表，通过mutations修改三级联动数据



### 24-1-18~19

1.对三级联动不同类别，点击到选项有背景颜色

 （1）方案1：采用css样式

`.item:hover{`

background:skyblue

`}`

 (2) 方案2： 通过js,mouseenter事件记录鼠标划过的index，根据index对背景颜色进行设置。利用事件委托，使得鼠标在全部商品分类上也不会改变背景颜色



2.通过一级索引控制二三级商品分类的显示与隐藏：

​		原始方法：通过css的hover当鼠标移动到三级联动位置将二、三级的样式显示出来

​        修改后：通过js动态绑定样式 判断index

3.用户操作过快，浏览器可能反应不过来（卡顿、防抖、节流）

（1）.防抖：前面所有触发都被取消，最后一次执行才被触发。每次重新触发后会重新计时。 lodash插件封装了函数防抖和节流的业务（闭包和延迟器）

（2）节流：





### 24-1/20

##### 1.三级联动路由跳转（点击各个分类都能，跳转到search模块并把用户选择的产品进行传递）

 	(1)方式1：声明式导航，使用<router-link>将每个分类的按钮导向“/search”, 但是使用<router-link>相当于放了一个新的组件在页面上。索引太多，页面上的组件过多，会出现卡顿现象。

  







（2）方式2：编程式导航，

​     弹幕--  把 href=""去掉，别偷懒，a标签和router-link不能用编程式路由，会跳到根目录然后重定向到home--  其实这里还有个问题 a连接没有了href属性 vue会渲染成普通文本（点击后就没有了链接的下划线等动态样式） href属性后面写`javascript:`  -- 反之工作中最常用的是 slot="scope 不知道老师这里用哪一种"

 

（3）方式3;编程式导航+事件委托+自定义属性

​         (a)事件委托会导致点击父标签下任一位置都触发函数，用自定义属性（以data-命名）将点击位置区分，通过节点的dataset属性获取节点的自定义属性`element.target.dataset`，也可以同样通过自定义属性区分节点的级别

```js
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
          
        location.query=query

        this.$router.push(location)
      }
      
      
    }
```



##### 2.search模块内容的显示，以及search模块导航的显示隐藏

（1）当search模块的时候 导航内容隐藏，点击到索引部分显示（通过函数+v-show控制）

（2）导航的显示和隐藏增加过渡动画效果

​        过渡动画效果的前提是：元素务必要有v-if/v-show指令



##### 3.导航功能优化，每次切换home与search模块都会向服务器发请求，

（1）将dispatch向服务器发请求建立在app总组件的mounted钩子中，

​       <font color="orange"> 能不能放在入口文件 main.js中？</font> 不能，只有组件身上才有$store,main.js不是一个组件，不能直接使用 `this.$store.dispatch('categoryList')`



### 24-1/21

##### 1.params和query合并功能

（1）举例在当前已有“手机”这个query参数的情况下，去搜索“华为”。保留query参数并带上param参数

##### 2.mock模拟数据，用于home首页ListContainer组件与Floor组件

 (1)mockjs插件：`生成随机数据，拦截ajax请求。`资源： (印记中文网)docschina.org

​                             mock模拟的数据用于前端，不会向服务器发请求



（2）具体方法：

​		

```
（1）在项目的src下创建mock文件夹
（2）准备JSON数据：在mock下创建相应的JSON文件--将数据格式化，不然运行有问题
（3）将mock需要的数据（图片等）放到public文件夹下，【文件夹在打包时会把相应的资源原封不动的打包到dist文件夹--？？？不是很懂这一步】
（4）创建mockserver.js通过插件实现数据模拟
（5）在入口文件引入mockserver.js，使得其运行
```

弹幕---直接的暴露是为了能使用其中的一些变量，所以要导入具体暴露的啥，我如果只导入这个文件就只是把这个文件执行了一次

##### 3.containList轮播图

弹幕---巨坑：mockServe,里要写根目录 /mock/banner 注意前面的/

（1）从mockserver中请求数据，通过vuex保存到仓库state中  <font font-size=8px color=red> 这边的过程要反复模拟一下</font>

（2）swiper完成pc或者移动端的轮播图

```
（1）引入包(js和css包)，
  ## 引入包，各个版本的方式不一样5版本中
  js引入：原来是 import Swiper from 'swiper';现在不可用，现在是 import Swiper from 'swiper/js/swiper';
  css: import 'swiper/css/swiper.min.css' 
（2）页面结构完善
（3）初始化swiper实例，new Swiper()
```

<font font-size=8px color=red>重点，new swiper这段代码放在哪个位置？ 因为轮播图需要发送请求异步先获取数据，组件加载了但是数据后期动态更新， 按照swiper实例初始化在页面结构完善后应该将其放在mounted下，但是数据此时还没出来，通过nexttick</font>

（3）完善解决轮播图放映的异步问题

​	（a）方法1： 通过watch监听已有数据的变化,监听到数据变化后直接初始化Swiper()也不能加载出来轮播图------因为数据更新完了，但是通过遍历更新dom结构还需要时间，dom结构不一定加载完成。。 再通过$nextTick在dom结构更新结束之后再执行。

  	(b)为什么不能直接通过在$nextTick()中初始化swiper

   







### 24-1-22/23

##### 1.ref属性，框架中不适合直接获取dom节点，可以通过ref属性获取



### 24-1-24

##### 1.floor组件的复用，但是数据不一致

  （1）在home页面复用floor，通过dispatch获取数据需要在home组件下进行，然后再通过v-for创建两个子组件 通过父子通信将子组件的数据传给两个floor组件

 （2）组件通信复习

  （3）floor组件的轮播图，因为数据是从home组件中传过来的，所以直接可以在floor组件的mounted下实例化swiper



##### 2.将首页的轮播图拆分为共用全局组件

​    (1) probs属性是单向的，现在两种轮播图的写法不同。floor中的数据来自于父组件，通过watch监听不到，只能通过immediate：true进行监听 

--弹幕：把swiper封装成组件的话就完全不用watch监听了，直接mounted就好了

##### 遇到问题：子组件与父组件的mounted顺序问题：子组件需要父组件异步请求的数据



### 24-1-26

##### 1.search模块静态页面的编写

###### 页面编写步骤总结：

  （1）拆分静态页面

  （2）发送请求

  （3）vuex管理数据仓库

 （4）组件获取仓库数据，动态展示

### 24-2-05

##### 1.阅读search模块

（1）面包屑

##### 2.具体步骤

(1)发送请求：获取searchList,将searchList中的各个数据写入页面对应位置动态展示

**注意点：**searchList刚开始没有数据为空时，子数据为undefined，需要对子数据初始化为空

```js
const getters = {
    goodsList(state) { //相当于以函数形式定义一个计算属性,
        //形参state为当前仓库中state，包括其中所有数据
        return state.searchList.goodsList || []; //最开始searchList为空列表，goodList还为undefined,此时返回值为undefined
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
```

（2）根据不同的路由参数，获取不同数据并动态展示到页面：**通过监听$route的变化，发生变化了再向服务器发送请求，获取数据进行动态展示 **

### 2024-2-20

(1)面包屑处理：面包屑动态展示搜索的关键字

## 页面编写步骤总结：·

  #### （1）拆分静态页面



  #### （2）发送请求

​	     (a)在api文件夹下的request.js中二次封装axios请求，可以利用请求拦截器和相应拦截器在请求或响应前后完成其他业务。并将二次封装的axios实例进行暴露

​		 (b) 先在api文件夹的index文件中对接口进行统一管理，实现获取数据的操作，并对数据实例进行暴露。

```js
//定义箭头函数，在函数中请求数据。并将函数暴露
export const reqSearchInfo = (params) => request({
    url: "/list",
    method: 'post',
    data:params  // 参数是用data传参，给服务器传递的参数params至少是一个空对象
})
```

<font color="red">**Tip1**: 在发送请求需要传参的时候，默认参数至少是一个空对象，否则请求失败</font>

 #### （3）vuex管理数据仓库 (三连环)

​				首先将请求数据的箭头函数导入仓库管理文件中（store文件夹下相应模块的index.js文件）

​			 (a)根据需要在mounted或者其他阶段通过store.dispatch('actionName')派发具体的action

​			 (b)action: 在action函数中提交mutation，action函数的参数是上下文

​			 (c)mutation必须**同步执行**，在mutation中将state中的数据修改

 #### （4）组件获取仓库数据，动态展示



 #### （5）路由组件的使用



## 自己的疑难点

#### （1）命名空间的作用