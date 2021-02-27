<template>
  <div class="seven-needles">
    <el-row :gutter="20" style="padding: 20px">
      <el-col :span="12" :offset="0">
        <el-button type="primary" plain @click="onOpenTkyClick">
          激活探空仪
        </el-button>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-button type="primary" plain @click="onCloseTkyClick">
          关闭探空仪
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="padding: 20px">
      <el-col :span="12" :offset="0">
        <el-button type="primary" plain @click="onGetTkyFreqClick">
          获取探空仪频点
        </el-button>
        <span style="padding-left: 15px" v-show="sondeFreq">
          {{ sondeFreq }}MHZ
        </span>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-button type="primary" plain @click="onGetTkyIdClick">
          获取探空仪id
        </el-button>
        <span style="padding-left: 15px" v-show="sondeId">{{ sondeId }}</span>
      </el-col>
    </el-row>
    <el-form
      :model="formData"
      ref="form"
      :rules="rules"
      label-width="80px"
      :inline="true"
      style="padding: 20px"
    >
      <el-form-item prop="sondeFreq">
        <el-input
          v-model="formData.sondeFreq"
          placeholder="频点取值范围400-406"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onSondeFreqSubmit">
          设置探空仪频点
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";
import {
  powerOn,
  powerOff,
  getSondeFreq,
  getSondeId,
  setSondeFreq,
} from "../api/sevenNeedles";
export default {
  name: "SevenNeedles",
  setup() {
    const state = reactive({
      sondeStatus: null,
      sondeId: "",
      sondeFreq: "",
      formData: {
        sondeFreq: "",
      },
      rules: {
        sondeFreq: [
          {
            validator: function (rule, value, callback) {
              // if (!value) return callback(new Error("请输入探空仪频点"));
              if (value && (value < 400 || value > 406)) {
                return callback(new Error("取值范围400-406"));
              }
              callback();
            },
            trigger: ["change", "blur"],
          },
        ],
      },
    });
    function onOpenTkyClick() {
      powerOn().then((res) => {
        ElMessage({
          type: res.powerOn ? "success" : "error",
          message: res.powerOn ? "操作成功" : "操作失败",
          duration: res.powerOn ? 2000 : 3000,
        });
      });
    }
    function onCloseTkyClick() {
      powerOff().then((res) => {
        ElMessage({
          type: res.powerOff ? "success" : "error",
          message: res.powerOff ? "操作成功" : "操作失败",
          duration: res.powerOff ? 2000 : 3000,
        });
      });
    }
    function onGetTkyFreqClick() {
      getSondeFreq().then((res) => {
        if (res.SondeFreq) {
          state.sondeFreq = res.SondeFreq;
        }
      });
    }
    function onGetTkyIdClick() {
      getSondeId().then((res) => {
        if (res.SondeId) {
          // const id = parseInt("0x" + res.SondeId);
          // state.sondeId = id;
          state.sondeId = res.SondeId;
        }
      });
    }
    function onSondeFreqSubmit() {
      if (!state.formData.sondeFreq) return;
      setSondeFreq(state.formData.sondeFreq).then((res) => {
        console.log(
          "🚀 ~ file: SevenNeedles.vue ~ line 121 ~ setSondeFreq ~ res",
          res
        );
        ElMessage({
          type: res.setSondeFreq ? "success" : "error",
          message: res.setSondeFreq ? "操作成功" : "操作失败",
          duration: res.setSondeFreq ? 2000 : 3000,
        });
      });
    }
    return {
      ...toRefs(state),
      onOpenTkyClick,
      onCloseTkyClick,
      onGetTkyFreqClick,
      onGetTkyIdClick,
      onSondeFreqSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.seven-needles {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>