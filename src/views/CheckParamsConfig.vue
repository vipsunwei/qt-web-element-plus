<template>
  <div :style="{ marginTop: '20px' }">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header>
        <div class="title">检测参数配置</div>
      </template>
      <!-- card body -->
      <el-form :model="params" ref="form" label-width="180px" :inline="false">
        <el-form-item
          :label="paramsDict[key]"
          v-for="(value, key) in params"
          :key="key"
        >
          <template v-if="['mustBeJcTky', 'resetTkyFreq'].includes(key)">
            <el-switch
              v-model="params[key]"
              active-text="是"
              inactive-text="否"
            >
            </el-switch>
          </template>
          <template v-else>
            <el-input v-model="params[key]"></el-input>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRaw, toRefs } from "vue";
import {
  getCheckSurveyCriteion,
  setCheckSurveyCriteion,
  paramsDict,
} from "../api/checkParams";
import { ElMessage } from "element-plus";
export default {
  setup() {
    onMounted(() => getData());
    const state = reactive({
      params: {},
    });
    function getData() {
      getCheckSurveyCriteion().then((res) => {
        console.info(res.CheckSurveyCriteionInfo);
        state.params = res.CheckSurveyCriteionInfo;
      });
    }
    function onSubmit() {
      console.info("formdata", state.params);
      const options = toRaw(state.params);
      console.log("rawdata -- ", options);
      setCheckSurveyCriteion(options).then((res) => {
        if (res.setCheckSurveyCriteion === true) {
          ElMessage({
            type: "success",
            message: "操作成功",
            duration: 2000,
          });
        } else if (res.setCheckSurveyCriteion === false) {
          ElMessage({
            type: "error",
            message: "操作失败",
            duration: 3000,
          });
        } else {
          ElMessage({
            type: "warning",
            message: res.setCheckSurveyCriteion,
            duration: 3000,
          });
        }
      });
    }
    return { ...toRefs(state), onSubmit, paramsDict };
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