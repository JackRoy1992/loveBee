<template>
  <div class="content">
    <div class="lb_header">
      <h3>黑马程序员-上海校区（前端学院）</h3>
    </div>
    <router-view></router-view>
    <div class="lb_footer">
      <ul>
        <li>
          <router-link to="/" class="footer_icon_home" active-class="active"
            >首页</router-link
          >
        </li>
        <li>
          <router-link to="/shop" class="footer_icon_shop" active-class="active"
            >闪送超市</router-link
          >
        </li>
        <li class="cart">
          <router-link to="/cart" class="footer_icon_cart" active-class="active"
            >购物车</router-link
          >
          <span class="totalNum" v-show="$store.getters.total">{{
            $store.getters.total
          }}</span>
        </li>
        <li>
          <router-link to="/" class="footer_icon_mine" active-class="active"
            >我的</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.lb_header {
  min-width: 320px;
  height: 60px;
  background-color: #ffd600;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: 60px;
  color: #000;
  text-align: center;
}

.lb_footer {
  min-width: 320px;
  height: 70px;
  background-color: #f6f6f6;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
.lb_footer ul {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  height: 100%;
  box-sizing: border-box;
  li {
    height: 100%;
    text-align: center;
    a {
      display: block;
      width: 100%;
      height: 100%;
      padding-top: 35px;
      background-position: center top;
      background-repeat: no-repeat;
      img {
        width: 32px;
        height: 32px;
        margin: 0 auto;
      }
      span {
        display: block;
        font-size: 18px;
        color: #7d7d7d;
      }
      &.footer_icon_home {
        background-image: url("../../assets/images/menu-icon/navs-item-home.png");
        background-size: 32px 32px;
      }
      &.footer_icon_shop {
        background-image: url("../../assets/images/menu-icon/navs-item-menu.png");
        background-size: 32px 32px;
        &.active {
          background-image: url("../../assets/images/menu-icon/navs-item-menu-active.png");
        }
      }
      &.footer_icon_cart {
        background-image: url("../../assets/images/menu-icon/navs-item-cart.png");
        background-size: 32px 32px;
        &.active {
          background-image: url("../../assets/images/menu-icon/navs-item-cart-active.png");
        }
      }
      &.footer_icon_mine {
        background-image: url("../../assets/images/menu-icon/navs-item-mine.png");
        background-size: 32px 32px;
      }
    }
  }
}
.cart {
  position: relative;
  .totalNum {
    position: absolute;
    top: 0;
    right: -12px;
    background-color: red;
    color: #fff;
    border-radius: 50%;
    padding: 0px 5px;
  }
}
</style>
