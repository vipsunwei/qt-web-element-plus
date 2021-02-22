<template>
  <!-- 报警使能复位开关 -->
  <div style="margin-top: 20px">
    <div class="title">设备使能开关</div>
    <el-form
      label-width="240px"
      :inline="false"
      style="border: 1px solid #dcdfe6; padding: 20px"
    >
      <el-row>
        <el-col
          :span="12"
          :offset="0"
          v-for="(item, index) in deviceEnable"
          :key="index"
        >
          <el-form-item :label="item.name">
            <el-switch
              v-model="item.status"
              active-text="开"
              inactive-text="关"
              @change="onEnableChange($event, item)"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  getDeviceEnable,
  openDeviceEnable,
  closeDeviceEnable,
} from "../api/deviceEnable";
import { onMounted, reactive, toRefs } from "vue";
export default {
  setup() {
    // onMounted(() => deviceEnable());
    const deviceEnableState = reactive({
      deviceEnable: [
        {
          name: "设备使能开关1",
          status: true,
        },
        {
          name: "设备使能开关2",
          status: false,
        },
        {
          name: "设备使能开关3",
          status: false,
        },
      ],
    });
    // 获取全部设备使能
    function deviceEnable() {
      getDeviceEnable().then((data) => console.log("device enable -- ", data));
    }
    // 开启
    function openEnable() {}

    // 关闭
    function closeEnable() {}

    // 使能变化
    function onEnableChange(e, item) {
      console.log(e, item);
    }

    return { ...toRefs(deviceEnableState), onEnableChange };
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  font-size: 18px;
  color: #606266;
  padding: 20px;
}
</style>