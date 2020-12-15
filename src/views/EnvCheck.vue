<template>
  <!-- 环境检测要素 -->
  <div style="margin-top: 0px">
    <div class="title">环境检测要素</div>
    <div class="border p-10" style="color: #606266">
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">放球仓氢气1浓度：</el-col>
            <el-col :span="12" class="p-10">1000 Ppm</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">放球仓氢气1浓度：</el-col>
            <el-col :span="12" class="p-10">1000 Ppm</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房总管道压力：</el-col>
            <el-col :span="12" class="p-10">1000 kPa</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">操作室烟雾报警器：</el-col>
            <el-col :span="12" class="p-10">1000 Ppm</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">放球仓烟雾报警器：</el-col>
            <el-col :span="12" class="p-10">正常</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">环境设备状态：</el-col>
            <el-col :span="12" class="p-10">正常</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">环境温度：</el-col>
            <el-col :span="12" class="p-10">28 ℃</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">环境湿度：</el-col>
            <el-col :span="12" class="p-10">20 %RH</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">操作室水浸传感器：</el-col>
            <el-col :span="12" class="p-10">正常</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房氢气1浓度：</el-col>
            <el-col :span="12" class="p-10">1000 Ppm</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房氢气2浓度：</el-col>
            <el-col :span="12" class="p-10">1000 Ppm</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房支路1管道压力：</el-col>
            <el-col :span="12" class="p-10">1000 kPa</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房支路2管道压力：</el-col>
            <el-col :span="12" class="p-10">1000 kPa</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房烟雾报警器：</el-col>
            <el-col :span="12" class="p-10">不报警</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房水浸传感器：</el-col>
            <el-col :span="12" class="p-10">正常</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">仓顶秒风风速：</el-col>
            <el-col :span="12" class="p-10">1 m/s</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">仓顶秒风风向：</el-col>
            <el-col :span="12" class="p-10">100 °</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10"></el-col>
            <el-col :span="12" class="p-10"></el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
  <!-- 阈值设置 -->
  <div style="margin-top: 20px">
    <div class="title">阈值设置</div>
    <el-form
      :model="formData"
      :rules="rules"
      label-width="240px"
      :inline="false"
      style="border: 1px solid #dcdfe6; padding: 20px"
    >
      <el-row>
        <el-col :span="12" :offset="0">
          <el-form-item label="氢气浓度上限(0-9999Ppm):" prop="GNZA">
            <el-input v-model.number="formData.GNZA"></el-input>
          </el-form-item>
          <el-form-item label="管道压力上限(0-30000kPa):" prop="GNZB">
            <el-input v-model.number="formData.GNZB"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="烟雾报警器上限(0-5000Ppm):" prop="GNZC">
            <el-input v-model.number="formData.GNZC"></el-input>
          </el-form-item>
          <el-form-item label="开启时间上限设置(0-1800S):" prop="GNZE">
            <el-input v-model.number="formData.GNZE"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item style="margin-bottom: 0">
        <el-button>提交</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 安全阀门开关 -->
  <div style="margin-top: 20px">
    <div class="title">安全阀门开关</div>
    <el-form
      :model="formData"
      :rules="rules"
      label-width="240px"
      :inline="false"
      style="border: 1px solid #dcdfe6; padding: 20px"
    >
      <el-row>
        <el-col :span="12" :offset="0">
          <el-form-item label="总阀门:" prop="GNZD">
            <svg
              style="vertical-align: middle"
              t="1607683926625"
              class="icon"
              viewBox="0 0 1137 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="941"
              width="24"
              height="24"
            >
              <path
                d="M511.650982 227.403885V113.684852H170.562245A56.842426 56.842426 0 1 1 170.562245 0h795.862325a56.842426 56.842426 0 1 1 0 113.684852H625.506737v113.719033h56.842426a56.876607 56.876607 0 0 1 56.876607 56.842426v170.561458h66.51555a170.595639 170.595639 0 0 1 331.552335 56.842426v341.088737a170.527278 170.527278 0 0 1-331.552335 56.842426H331.553121a170.62982 170.62982 0 0 1-331.552335-56.842426v-341.088737a170.561459 170.561459 0 0 1 331.552335-56.842426h66.48137v-170.561458a56.876607 56.876607 0 0 1 56.876607-56.842426z m-56.842426 341.088736H341.089523v227.403885h454.807769v-227.403885z m-227.403885-56.842426a56.876607 56.876607 0 0 0-113.719033 0v341.088737a56.876607 56.876607 0 0 0 113.719033 0z m682.177473 341.088737a56.876607 56.876607 0 0 0 113.719033 0v-341.088737a56.876607 56.876607 0 0 0-113.719033 0zM511.650982 454.807769H625.506737V341.088737h-113.855755z m0 0"
                p-id="942"
                fill="#707070"
              ></path>
            </svg>
            <el-switch
              style="margin: 0 20px"
              v-model="formData.GNZD"
              active-text="开"
              inactive-text="关"
              :disabled="GNZDDisabled"
            ></el-switch>
            <i
              v-show="formData.warningGNZD"
              class="el-icon-warning"
              style="color: #f40; font-size: 24px; vertical-align: middle"
              title="异常"
            ></i>
          </el-form-item>
          <el-form-item label="支路1阀门:" prop="GNZF">
            <svg
              style="vertical-align: middle"
              t="1607683926625"
              class="icon"
              viewBox="0 0 1137 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="941"
              width="24"
              height="24"
            >
              <path
                d="M511.650982 227.403885V113.684852H170.562245A56.842426 56.842426 0 1 1 170.562245 0h795.862325a56.842426 56.842426 0 1 1 0 113.684852H625.506737v113.719033h56.842426a56.876607 56.876607 0 0 1 56.876607 56.842426v170.561458h66.51555a170.595639 170.595639 0 0 1 331.552335 56.842426v341.088737a170.527278 170.527278 0 0 1-331.552335 56.842426H331.553121a170.62982 170.62982 0 0 1-331.552335-56.842426v-341.088737a170.561459 170.561459 0 0 1 331.552335-56.842426h66.48137v-170.561458a56.876607 56.876607 0 0 1 56.876607-56.842426z m-56.842426 341.088736H341.089523v227.403885h454.807769v-227.403885z m-227.403885-56.842426a56.876607 56.876607 0 0 0-113.719033 0v341.088737a56.876607 56.876607 0 0 0 113.719033 0z m682.177473 341.088737a56.876607 56.876607 0 0 0 113.719033 0v-341.088737a56.876607 56.876607 0 0 0-113.719033 0zM511.650982 454.807769H625.506737V341.088737h-113.855755z m0 0"
                p-id="942"
                fill="#707070"
              ></path>
            </svg>
            <el-switch
              style="margin: 0 20px"
              v-model="formData.GNZF"
              active-text="开"
              inactive-text="关"
              :disabled="GNZFDisabled"
            ></el-switch>
            <i
              v-show="formData.warningGNZF"
              class="el-icon-warning"
              style="color: #f40; font-size: 24px; vertical-align: middle"
              title="异常"
            ></i>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="支路2阀门:" prop="GNZG">
            <svg
              style="vertical-align: middle"
              t="1607683926625"
              class="icon"
              viewBox="0 0 1137 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="941"
              width="24"
              height="24"
            >
              <path
                d="M511.650982 227.403885V113.684852H170.562245A56.842426 56.842426 0 1 1 170.562245 0h795.862325a56.842426 56.842426 0 1 1 0 113.684852H625.506737v113.719033h56.842426a56.876607 56.876607 0 0 1 56.876607 56.842426v170.561458h66.51555a170.595639 170.595639 0 0 1 331.552335 56.842426v341.088737a170.527278 170.527278 0 0 1-331.552335 56.842426H331.553121a170.62982 170.62982 0 0 1-331.552335-56.842426v-341.088737a170.561459 170.561459 0 0 1 331.552335-56.842426h66.48137v-170.561458a56.876607 56.876607 0 0 1 56.876607-56.842426z m-56.842426 341.088736H341.089523v227.403885h454.807769v-227.403885z m-227.403885-56.842426a56.876607 56.876607 0 0 0-113.719033 0v341.088737a56.876607 56.876607 0 0 0 113.719033 0z m682.177473 341.088737a56.876607 56.876607 0 0 0 113.719033 0v-341.088737a56.876607 56.876607 0 0 0-113.719033 0zM511.650982 454.807769H625.506737V341.088737h-113.855755z m0 0"
                p-id="942"
                fill="#707070"
              ></path>
            </svg>
            <el-switch
              style="margin: 0 20px"
              v-model="formData.GNZG"
              active-text="开"
              inactive-text="关"
              :disabled="GNZGDisabled"
            ></el-switch>
            <i
              v-show="formData.warningGNZG"
              class="el-icon-warning"
              style="color: #f40; font-size: 24px; vertical-align: middle"
              title="异常"
            ></i>
          </el-form-item>
          <el-form-item label="安全阀:" prop="GNZI">
            <svg
              style="vertical-align: middle"
              t="1607683926625"
              class="icon"
              viewBox="0 0 1137 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="941"
              width="24"
              height="24"
            >
              <path
                d="M511.650982 227.403885V113.684852H170.562245A56.842426 56.842426 0 1 1 170.562245 0h795.862325a56.842426 56.842426 0 1 1 0 113.684852H625.506737v113.719033h56.842426a56.876607 56.876607 0 0 1 56.876607 56.842426v170.561458h66.51555a170.595639 170.595639 0 0 1 331.552335 56.842426v341.088737a170.527278 170.527278 0 0 1-331.552335 56.842426H331.553121a170.62982 170.62982 0 0 1-331.552335-56.842426v-341.088737a170.561459 170.561459 0 0 1 331.552335-56.842426h66.48137v-170.561458a56.876607 56.876607 0 0 1 56.876607-56.842426z m-56.842426 341.088736H341.089523v227.403885h454.807769v-227.403885z m-227.403885-56.842426a56.876607 56.876607 0 0 0-113.719033 0v341.088737a56.876607 56.876607 0 0 0 113.719033 0z m682.177473 341.088737a56.876607 56.876607 0 0 0 113.719033 0v-341.088737a56.876607 56.876607 0 0 0-113.719033 0zM511.650982 454.807769H625.506737V341.088737h-113.855755z m0 0"
                p-id="942"
                fill="#707070"
              ></path>
            </svg>
            <el-switch
              style="margin: 0 20px"
              v-model="formData.GNZI"
              active-text="开"
              inactive-text="关"
              :disabled="GNZIDisabled"
            ></el-switch>
            <i
              v-show="formData.warningGNZI"
              class="el-icon-warning"
              style="color: #f40; font-size: 24px; vertical-align: middle"
              title="异常"
            ></i>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <!-- 报警使能复位开关 -->
  <div style="margin-top: 20px">
    <div class="title">报警使能复位开关</div>
    <el-form
      :model="formData1"
      :rules="rules1"
      label-width="240px"
      :inline="false"
      style="border: 1px solid #dcdfe6; padding: 20px"
    >
      <el-row>
        <el-col :span="12" :offset="0">
          <el-form-item label="放球仓氢气检测1:">
            <el-row>
              <el-col :span="12" :offset="0">
                <el-form-item prop="GNZHGNA">
                  <el-switch
                    v-model="formData1.GNZHGNA"
                    active-text="开"
                    inactive-text="关"
                    @change="A"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="0">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="GNZJGNADisabled"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="放球仓氢气检测2:">
            <el-row>
              <el-col :span="12" :offset="0">
                <el-form-item prop="GNZHGNB">
                  <el-switch
                    v-model="formData1.GNZHGNB"
                    active-text="开"
                    inactive-text="关"
                    @change="A"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="0">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="GNZJGNBDisabled"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="放球仓烟雾报警:">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="GNZHGNE">
                  <el-switch
                    v-model="formData1.GNZHGNE"
                    active-text="开"
                    inactive-text="关"
                    @change="A"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="GNZJGNEDisabled"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="操作室烟雾报警器:">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="GNZHGND">
                  <el-switch
                    v-model="formData1.GNZHGND"
                    active-text="开"
                    inactive-text="关"
                    @change="A"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="GNZJGNDDisabled"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="操作室水进传感器:">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="GNZHGNI">
                  <el-switch
                    v-model="formData1.GNZHGNI"
                    active-text="开"
                    inactive-text="关"
                    @change="A"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="GNZJGNIDisabled"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="氢气房氢气检测1:">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="GNZHGNJ">
                  <el-switch
                    v-model="formData1.GNZHGNJ"
                    active-text="开"
                    inactive-text="关"
                    @change="A"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="GNZJGNJDisabled"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="氢气房氢气检测2:">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="GNZHGNK">
                  <el-switch
                    v-model="formData1.GNZHGNK"
                    active-text="开"
                    inactive-text="关"
                    @change="A"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="GNZJGNKDisabled"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="氢气房烟雾报警:">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="GNZHGNN">
                  <el-switch
                    v-model="formData1.GNZHGNN"
                    active-text="开"
                    inactive-text="关"
                    @change="A"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="GNZJGNNDisabled"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="氢气房水进传感器:">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="GNZHGNP">
                  <el-switch
                    v-model="formData1.GNZHGNP"
                    active-text="开"
                    inactive-text="关"
                    @change="A"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="GNZJGNPDisabled"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="氢气房管道压力1:">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="GNZHGNL">
                  <el-switch
                    v-model="formData1.GNZHGNL"
                    active-text="开"
                    inactive-text="关"
                    @change="A"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="GNZJGNLDisabled"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="氢气房管道压力2:">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="GNZHGNM">
                  <el-switch
                    v-model="formData1.GNZHGNM"
                    active-text="开"
                    inactive-text="关"
                    @change="A"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="GNZJGNMDisabled"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item style="margin-bottom: 0" label="氢气房管道压力总:">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="GNZHGNC">
                  <el-switch
                    v-model="formData1.GNZHGNC"
                    active-text="开"
                    inactive-text="关"
                    @change="A"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="GNZJGNCDisabled"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, toRefs } from "vue";
import { debounce, formatDate } from "../utils/utils";

export default {
  setup() {
    onMounted(() => {
      window.addEventListener("resize", getMaxHeight);
      getMaxHeight();
    });
    onUnmounted(() => window.removeEventListener("resize", getMaxHeight));
    const getMaxHeight = debounce(function () {
      const height = document.body.offsetHeight;
      state.maxHeight = height * 0.9;
    });
    const state = reactive({
      tableData: [],
      maxHeight: null,
      formData: {
        GNZA: "",
        GNZB: "",
        GNZC: "",
        GNZE: "",
        GNZD: false,
        GNZF: true,
        GNZG: false,
        GNZI: true,
        warningGNZD: true,
        warningGNZF: false,
        warningGNZG: true,
        warningGNZI: false,
      },
      formData1: {
        GNZHGNA: true,
        GNZHGNB: false,
        GNZHGNE: false,
        GNZHGND: true,
        GNZHGNI: false,
        GNZHGNJ: true,
        GNZHGNK: false,
        GNZHGNN: false,
        GNZHGNP: false,
        GNZHGNL: false,
        GNZHGNM: false,
        GNZHGNC: false,
        GNZJGNA: true,
        GNZJGNB: false,
        GNZJGNE: false,
        GNZJGND: false,
        GNZJGNI: false,
        GNZJGNJ: false,
        GNZJGNK: false,
        GNZJGNN: false,
        GNZJGNP: false,
        GNZJGNL: false,
        GNZJGNM: false,
        GNZJGNC: false,
      },
      rules: {
        GNZA: [
          { type: "number", message: "规定范围0-9999" },
          {
            validator: function (rule, value, callback) {
              if (value < 0 || value > 9999) {
                return callback(new Error("规定范围0-9999"));
              }
              callback();
            },
            trigger: ["blur", "change"],
          },
        ],
        GNZB: [
          { type: "number", message: "规定范围0-30000" },
          {
            validator: function (rule, value, callback) {
              if (value < 0 || value > 30000) {
                return callback(new Error("规定范围0-30000"));
              }
              callback();
            },
            trigger: ["blur", "change"],
          },
        ],
        GNZC: [
          { type: "number", message: "规定范围0-5000" },
          {
            validator: function (rule, value, callback) {
              if (value < 0 || value > 5000) {
                return callback(new Error("规定范围0-5000"));
              }
              callback();
            },
            trigger: ["blur", "change"],
          },
        ],
        GNZE: [
          { type: "number", message: "规定范围0-1800" },
          {
            validator: function (rule, value, callback) {
              if (value < 0 || value > 1800) {
                return callback(new Error("规定范围0-1800"));
              }
              callback();
            },
            trigger: ["blur", "change"],
          },
        ],
      },
      rules1: [],
    });
    // 安全阀门开关
    const GNZDDisabled = computed(() => state.formData.warningGNZD);
    const GNZFDisabled = computed(() => state.formData.warningGNZF);
    const GNZGDisabled = computed(() => state.formData.warningGNZG);
    const GNZIDisabled = computed(() => state.formData.warningGNZI);
    // 使能、复位
    const GNZJGNADisabled = computed(() => !state.formData1.GNZHGNA);
    const GNZJGNBDisabled = computed(() => !state.formData1.GNZHGNB);
    const GNZJGNEDisabled = computed(() => !state.formData1.GNZHGNE);
    const GNZJGNDDisabled = computed(() => !state.formData1.GNZHGND);
    const GNZJGNIDisabled = computed(() => !state.formData1.GNZHGNI);
    const GNZJGNJDisabled = computed(() => !state.formData1.GNZHGNJ);
    const GNZJGNKDisabled = computed(() => !state.formData1.GNZHGNK);
    const GNZJGNNDisabled = computed(() => !state.formData1.GNZHGNN);
    const GNZJGNPDisabled = computed(() => !state.formData1.GNZHGNP);
    const GNZJGNLDisabled = computed(() => !state.formData1.GNZHGNL);
    const GNZJGNMDisabled = computed(() => !state.formData1.GNZHGNM);
    const GNZJGNCDisabled = computed(() => !state.formData1.GNZHGNC);
    const columns = [
      {
        prop: "col0",
        label: "观测要素变量编码",
      },
      {
        prop: "col1",
        label: "观测要素变量名称",
      },
      {
        prop: "col2",
        label: "单位",
      },
      {
        prop: "col3",
        label: "乘数因子",
      },
      {
        prop: "col4",
        label: "字节长度",
      },
      {
        prop: "col5",
        label: "备注",
      },
    ];
    function A(value) {
      console.log(value, "value");
    }

    return {
      ...toRefs(state),
      columns,
      A,
      GNZDDisabled,
      GNZFDisabled,
      GNZGDisabled,
      GNZIDisabled,
      GNZJGNADisabled,
      GNZJGNBDisabled,
      GNZJGNEDisabled,
      GNZJGNDDisabled,
      GNZJGNIDisabled,
      GNZJGNJDisabled,
      GNZJGNKDisabled,
      GNZJGNNDisabled,
      GNZJGNPDisabled,
      GNZJGNLDisabled,
      GNZJGNMDisabled,
      GNZJGNCDisabled,
    };
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
.w-60 {
  width: 60%;
}
.d-inline-block {
  display: inline-block;
}
.p-10 {
  padding: 10px;
}
.border {
  border: 1px solid #dcdfe6;
}
.border-bottom {
  border-bottom: 1px solid #dcdfe6;
}
.border-right {
  border-right: 1px solid #dcdfe6;
}
.border-left {
  border-left: 1px solid #dcdfe6;
}
.border-top {
  border-top: 1px solid #dcdfe6;
}
.reset_button {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 0;
  font-size: 12px;
}
</style>