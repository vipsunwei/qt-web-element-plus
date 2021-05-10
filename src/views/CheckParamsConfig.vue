<template>
  <div :style="{ marginTop: '20px' }">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header>
        <div style="padding: 20px">
          <span class="title">检测参数配置</span>
          <div v-if="isOffline" style="display: inline">
            [
            <span style="color: #f56c6c; text-shadow: 0 0 4px #f56c6c">
              {{ offlineText }}
            </span>
            ]
          </div>
        </div>
      </template>
      <!-- card body -->
      <el-form
        v-loading="loading"
        :model="params"
        ref="form"
        label-width="180px"
        :inline="false"
        :disabled="isOffline"
      >
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
import { checkParamsInit } from "../data-map/checkParams";
import { showMessage } from "../utils/utils";
export default {
  setup() {
    onMounted(() => getData());
    const state = reactive({
      params: checkParamsInit(),
      loading: false,
      isOffline: false,
      offlineText: "设备离线",
    });
    function getData() {
      state.loading = true;
      getCheckSurveyCriteion()
        .then((res) => {
          state.params = formatData(res.CheckSurveyCriteionInfo);
        })
        .catch((error) => {
          console.dir(error);
          state.isOffline = true;
        })
        .finally(() => {
          state.loading = false;
        });
    }
    function formatData(o) {
      const obj = {};
      for (const key in o) {
        if (
          Object.hasOwnProperty.call(o, key) &&
          Object.hasOwnProperty.call(paramsDict, key)
        ) {
          const element = o[key];
          obj[key] = element;
        }
      }
      return obj;
    }
    function onSubmit() {
      const options = toRaw(state.params);
      setCheckSurveyCriteion(options).then((res) => {
        showMessage(res.setCheckSurveyCriteion);
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
}
</style>