<template>
  <div>
    <!-- 插入三级联动全局组件，全局组件不需要在这个地方引入 -->
    <TypeNav/>
    <ListContainer/>
    <todayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in this.floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import todayRecommend from '@/pages/Home/todayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
  name:'Home',
  components:{
    ListContainer,
    todayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){ 
    this.$store.dispatch("getFloorList")
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  }
}
</script>

<style>

</style>