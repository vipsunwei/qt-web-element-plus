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
import { ElMessage } from "element-plus";
export default {
  setup() {
    onMounted(() => deviceEnable());
    const deviceEnableState = reactive({
      deviceEnable: [],
    });
    // 获取全部设备使能
    function deviceEnable() {
      getDeviceEnable().then((data) => {
        deviceEnableState.deviceEnable = formatDeviceEnable(data);
      });
    }
    function formatDeviceEnable(data) {
      return data.map((item) => {
        return formatDataItem(item);
      });
    }
    function formatDataItem(item) {
      return Object.keys(item).reduce((prev, current) => {
        prev.name = current;
        prev.status = item[current];
        return prev;
      }, {});
    }
    // 开启
    function openEnable(param) {
      openDeviceEnable(param).then((res) => {
        if (res.openDeviceEnable) {
          ElMessage({
            type: "success",
            message: "操作成功",
            duration: 2000,
          });
        } else {
          ElMessage({
            type: "error",
            message: "操作失败",
            duration: 3000,
          });
        }
      });
    }

    // 关闭
    function closeEnable(param) {
      closeDeviceEnable(param).then((res) => {
        if (res.closeDeviceEnable) {
          ElMessage({
            type: "success",
            message: "操作成功",
            duration: 2000,
          });
        } else {
          ElMessage({
            type: "error",
            message: "操作失败",
            duration: "3000",
          });
        }
      });
    }

    // 使能变化
    function onEnableChange(e, item) {
      console.log(e, item);
      e ? openEnable({ Dtype: item.name }) : closeEnable({ Dtype: item.name });
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