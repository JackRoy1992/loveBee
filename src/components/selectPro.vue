<template>
  <div>
    <span :class="{ isHide: !isSelected }">
      <div class="selectIcon reduce" @click="reduce"></div>
      <div class="selectIcon num">{{ selectCount }}</div>
    </span>
    <div class="selectIcon add" @click="add"></div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      selectCount: this.value
    };
  },
  computed: {
    isSelected() {
      return this.selectCount > 0;
    }
  },
  methods: {
    add() {
      this.selectCount++;
    },
    reduce() {
      this.selectCount--;
    }
  },
  watch: {
    selectCount: {
      handler(curcount) {
        // 为什么是input
        this.$emit("input", curcount);
        this.$emit("selectHandler");
      },
      deep: true
    }
  }
};
</script>

<style>
.selectIcon {
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
}
.isHide {
  display: none;
}
.selectIcon.reduce {
  border-radius: 15px;
  border: 1px solid red;
  background-color: red;
  background-image: url("../assets/images/product_operate.png");
  /* background-repeat: no-repeat; */
  background-position: left center;
  background-size: 200% 100%;
}
.selectIcon.add {
  border-radius: 15px;
  border: 1px solid red;
  background-color: red;
  background-image: url("../assets/images/product_operate.png");
  background-position: right center;
  background-size: 200% 100%;
}
</style>
