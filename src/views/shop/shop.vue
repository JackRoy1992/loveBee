<template>
  <div class="lb_container">
    <div class="lb_aside">
      <ul>
        <li
          v-for="item in categoryList"
          :key="item.id"
          :class="{ active: selectID == item.id }"
          @click="toggleCate(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="lb_main">
      <div class="sort">
        <ul class="clearfix">
          <li class="sort_title">全部分类</li>
          <li class="sort_title">全部分类</li>
          <li class="sort_title">全部分类</li>
        </ul>
      </div>
      <div class="pro_list">
        <ul>
          <li v-for="item in selectProList" :key="item.id">
            <a href="#" class="clearfix">
              <img v-lazy="item.img" alt />
              <div class="pro_info">
                <p class="one-txt-cut">{{ item.name }}</p>
                <div class="weigth">{{ item.specifics }}</div>
                <div class="price">
                  <span class="newprice">￥{{ item.market_price }}</span>
                  <span class="oldprice">￥{{ item.price }}</span>
                </div>
              </div>
            </a>
            <div class="selectPro">
              <selectpro
                v-model="item.count"
                @selectHandler="selectPro(item.id, item.cid)"
              ></selectpro>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SelectPro from "../../components/selectPro";
export default {
  data() {
    return {
      categoryList: [],
      proList: [],
      selectProList: [],
      selectID: ""
    };
  },
  components: {
    selectpro: SelectPro
  },
  created() {
    this.getData();
    // this.renderProList(this.cateId);
  },
  methods: {
    getData() {
      this.$http.jsonp("http://localhost:3008/list").then(res => {
        let { categories, products } = res.data;
        this.categoryList = categories;
        this.proList = products;
        // console.log(this.categoryList, this.proList);
        // 从vuex获取goods数据
        const goods = this.$store.getters.goods;
        this.selectProList = products[categories[0].id].map(item => {
          return {
            ...item,
            count:
              (goods.find(v => v.selectProId === item.id) &&
                goods.find(v => v.selectProId === item.id).selectProCount) ||
              0
          };
        });
        this.selectID = this.categoryList[0].id;
        // console.log(this.selectProList);
      });
    },
    toggleCate(id) {
      // 从vuex获取goods数据
      const goods = this.$store.getters.goods;
      this.selectProList = this.proList[id].map(item => {
        return {
          ...item,
          count:
            (goods.find(v => v.selectProId === item.id) &&
              goods.find(v => v.selectProId === item.id).selectProCount) ||
            0
        };
      });
      this.selectID = id;
    },
    selectPro(id, cid) {
      // console.log(id, cid);
      let selectProName = this.selectProList.find(item => item.id === id).name;
      let selectPromarketPrice = +this.selectProList.find(
        item => item.id === id
      ).market_price;
      let selectProCount = this.selectProList.find(item => item.id === id)
        .count;
      let selectProId = id;
      let selectCid = cid;
      let selectProInfo = {
        selectProName,
        selectPromarketPrice,
        selectProId,
        selectProCount,
        selectCid
      };
      this.$store.commit("addCart", selectProInfo);
    }
  }
};
</script>

<style lang="less" scoped>
.lb_container {
  position: absolute;
  top: 60px;
  bottom: 70px;
  width: 100%;
  display: flex;
  background-color: #fff;
}
.lb_aside {
  flex: 0 0 95px;
  background-color: #f8f8f8;
  float: left;
  overflow-y: scroll;
  ul {
    width: 100%;
    li {
      text-align: center;
      line-height: 65px;
      height: 65px;
      border-left: 2px solid transparent;
      box-sizing: border-box;
      border-bottom: 1px solid #e9e9e9;
      &.active {
        border-left: 2px solid #ffd600;
      }
    }
  }
}
.lb_main {
  flex: 1;
  position: relative;
  overflow-y: scroll;
  .sort {
    position: fixed;
    top: 60px;
    left: 95px;
    right: 0;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e9e9e9;
    overflow-x: scroll;
    background-color: #fff;
    z-index: 1;
    ul {
      width: 1000px;
      .sort_title {
        width: 100px;
        height: 40px;
        text-align: center;
        color: #7e7e7e;
        float: left;
      }
    }
  }
  .pro_list {
    margin-top: 40px;
    ul {
      li {
        height: 140px;
        box-sizing: border-box;
        border-bottom: 1px solid #e9e9e9;
        padding: 35px 8px;
        position: relative;
        a {
          width: 100%;
          height: 100%;
          display: block;
          img {
            width: 75px;
            height: 75px;
            float: left;
          }
          .pro_info {
            width: 100%;
            // overflow: hidden;
            p {
              height: 38px;
              font-size: 18px;
            }
            .weight {
              font-size: 18px;
              color: #a0a0a0;
            }
            .price {
              .newprice {
                color: red;
                font-size: 14px;
                font-weight: 700;
                margin-right: 5px;
              }
              .oldprice {
                color: #a0a0a0;
                font-size: 14px;
                text-decoration: line-through;
              }
            }
          }
        }
        .selectPro {
          position: absolute;
          right: 10px;
          bottom: 20px;
        }
      }
    }
  }
}
</style>
