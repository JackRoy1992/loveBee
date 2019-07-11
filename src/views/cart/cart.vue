<template>
  <div class="lb_container">
    <div class="user_card">
      <div class="context"></div>
    </div>
    <div class="consign_info"></div>
    <div class="cart_list">
      <ul>
        <li v-for="item in cartList" :key="item.selectProId">
          <div
            class="checkbox"
            :class="{ checked: item.isSelected }"
            @click="toggleChecked(item.selectProId)"
          ></div>
          <img v-lazy="item.img" alt />
          <div class="info">
            <p>{{ item.selectProName }}</p>
            <div class="price">￥{{ item.selectPromarketPrice }}</div>
          </div>
          <div class="selectPro">
            <selectpro v-model="item.selectProCount"></selectpro>
          </div>
        </li>
      </ul>
      <div class="buy">
        <div
          class="checkbox"
          :class="{ checked: $store.getters.selectAll }"
          @click="toggleSelect"
        ></div>
        <span>全选</span>
        共:
        <span class="total_price">￥{{ totalPrice }}</span>
        <div class="go_buy">选好了</div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectPro from "../../components/selectPro";
export default {
  components: {
    selectpro: SelectPro
  },
  data() {
    return {
      cartList: []
    };
  },
  created() {
    this.getCartList();
  },
  methods: {
    getCartList() {
      this.cartList = this.$store.getters.goods;
      // console.log(this.cartList);
      //反向代理
      // this.$http
      //   .get(
      //     `/api/home?_r=${Math.random()}&cart_pids=${encodeURIComponent(
      //       ids
      //     )}&location=121.5721941391567%2C31.21168025925351`
      //   )
      //   .then(res => {
      //     console.log(res);
      //   });
    },
    toggleChecked(id) {
      let curData = this.cartList.find(item => item.selectProId === id);
      curData.isSelected = !curData.isSelected;
    },
    toggleSelect() {
      this.cartList.forEach(item => {
        item.isSelected = !this.$store.getters.selectAll;
      });
    }
  },
  computed: {
    totalPrice() {
      return this.cartList.reduce((price, item) => {
        if (item.isSelected) {
          price += +item.selectPromarketPrice * item.selectProCount;
        }
        return price;
      }, 0);
    }
  },
  watch: {
    cartList: {
      handler(curList) {
        curList.some((item, index) => {
          if (item.selectProCount <= 0) {
            curList.splice(index, 1);
            return true;
          }
        });
        const cartList = curList.map(item => {
          return {
            isSelected: item.isSelected,
            selectCid: item.selectCid,
            selectProCount: item.selectProCount,
            selectProId: item.selectProId,
            selectProName: item.selectProName,
            selectPromarketPrice: item.selectPromarketPrice
          };
        });
        this.$store.commit("updateCart", cartList);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.lb_container {
  position: absolute;
  top: 60px;
  bottom: 70px;
  width: 100%;
  overflow-y: scroll;
}
.user_card {
  width: 100%;
  margin: 15px 0;
  height: 140px;
  background: url("../../assets/images/place.png");
  padding: 5px 0;
}
.user_card .context {
  height: 130px;
  background-color: #fff;
}
.consign_info {
  width: 100%;
  background-color: #fff;
  height: 200px;
  border-bottom: 1px solid #ccc;
}
.cart_list {
  background-color: #fff;
}
.cart_list ul li {
  padding: 15px 5px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.selectPro {
  position: absolute;
  right: 10px;
  bottom: 20px;
}
.checkbox {
  width: 25px;
  height: 25px;
  margin: 0 20px;
  background: url("../../assets/images/check.png") no-repeat center center;
  background-size: 100% 100%;
  display: inline-block;
  vertical-align: middle;
}
.checkbox.checked {
  background-image: url("../../assets/images/checked.png");
}
.cart_list img {
  width: 80px;
  height: 80px;
  display: inline-block;
  vertical-align: middle;
}
.cart_list .info {
  display: inline-block;
}
.buy {
  padding: 20px 5px;
  position: relative;
}
.buy .total_price {
  color: red;
}
.go_buy {
  width: 110px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #ffd600;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
