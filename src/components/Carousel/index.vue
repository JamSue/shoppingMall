<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// import Swiper from "swiper";
import Swiper from 'swiper/js/swiper';
export default {
  name: "Carousel",
  props:["list"],
watch:{
      list:{
        immediate:true,
        handler(newvalue,oldvalue){
           this.$nextTick(()=>{
              var mySwiper = new Swiper(this.$refs.mySwiper,{// 老版本
             
             loop:true,
              //如果需要分页器
              pagination:{
                el:'.swiper-pagination',
                clickable: true // 点击小球可切换
              },

              // 如果需要前进后退按钮
              navigation:{
                nextEl:'.swiper-button-next',
                prevEl:'.swiper-button-prev',

              }
            })
            })
        }
      }
  }
};
</script>

<style></style>
