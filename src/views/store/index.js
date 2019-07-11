import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    beeCart: JSON.parse(localStorage.getItem("myBeeCart")) || []
  },
  mutations: {
    addCart(state, info) {
      const curGoods = state.beeCart.find(
        item => item.selectProId === info.selectProId
      );
      if (!curGoods) {
        state.beeCart.push({ ...info, isSelected: true });
      } else {
        curGoods.selectProCount = info.selectProCount;
      }
      localStorage.setItem("myBeeCart", JSON.stringify(state.beeCart));
    },
    updateCart(state, curList) {
      state.beeCart = curList.map(item => {
        return { ...item };
      });
      localStorage.setItem("myBeeCart", JSON.stringify(state.beeCart));
    }
  },
  getters: {
    ids(state) {
      return state.beeCart.map(item => item.selectProId).join();
    },
    //总数
    total(state) {
      return state.beeCart.reduce((count, item) => {
        count += item.selectProCount;
        return count;
      }, 0);
    },
    //数据
    goods(state) {
      return [...state.beeCart];

      // return state.beeCart.reduce((data, item) => {
      //   data = {
      //     id: item.selectProId,
      //     name: item.selectProName,
      //     price: item.selectPromarketPrice,
      //     count: item.selectProCount,
      //     isSelected: item.isSelected,
      //     selectCid: item.selectCid
      //   }
      //   return data
      // }, [])
    },
    // goods(state) {
    //   return state.beeCart.reduce((data, item) => {
    //     data[item.selectProId] = {
    //       name: item.selectProName,
    //       price: item.selectPromarketPrice,
    //       count: item.selectProCount,
    //       isSelected: item.isSelected,
    //       selectCid: item.selectCid
    //     }
    //     return data
    //   }, {})
    // },
    //全选
    selectAll(state) {
      return state.beeCart.every(item => item.isSelected);
    }
  }
});
