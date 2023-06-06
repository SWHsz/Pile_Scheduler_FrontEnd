<template>
    <div>
      <el-row>
        <el-col :span="24">
          <!-- 表单 -->
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-col :span = "3">
            <el-input v-model="car_id" placeholder="请输入car_id" style="width: 100%; display: inline-block;"></el-input>
          </el-col>  
          <el-col :span = "3">
              <el-button type="primary" @click="Query_Charge_Detail()" style="display: inline-block;">查询充电详情</el-button>
          </el-col>
          <el-col :span = "3">
              <el-button type="primary" @click="Query_Request()">查询充电请求</el-button>
          </el-col>
          </el-form>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="24">
          <!--排队信息 表格 -->
          <el-table :data="tableData" v-if="ShowTable" border style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="car_id" label="车辆id"></el-table-column>
            <el-table-column prop="mode" label="充电模式">
            <template slot-scope="scope">
                <span>{{ Get_Query_Charge_Mode(scope.row.mode) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Status" label="车辆状态">
            <template slot-scope="scope">
                <span>{{ Get_Query_Charge_Status(scope.row.Status) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="pile_id" label="充电桩id"></el-table-column>
            <el-table-column prop="request_amount" label="电量"></el-table-column>
            <el-table-column prop="charged_amount" label="已充电量"></el-table-column>
            <el-table-column prop="duration" label="时间"></el-table-column>
            <el-table-column prop="remain" label="剩余时间"></el-table-column>
            <el-table-column prop="start_time" label="开始时间"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="24">
          <!--排队信息 表格 -->
          <el-table :data="tableData" v-if="ShowRequest" border style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="car_id" label="车辆id"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
  </div>
 </template>
  <style scoped>
  .container {
    padding: 20px;
  }
  
  .demo-form-inline .el-form-item {
    margin-right: 10px;
  }
  
  .Res-message{
    color: black;
    margin-top: 50px;
  }
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>  
  <script type="text/ecmascript-6">
  import axios from 'axios';
  import { getToken } from '@/utils/auth';
  export default {
    data () {
      return {
        ShowTable: false,
        ShowRequest: false,
        user_id: '',
        car_id: '',
        user_id2: '',
        tableData: [],
        billData: [],
        formInline2: {
          user: {
            name: '',
            date: '',
            address: [],
            place: ''
          }
        },
        formInline: {
          user: {
            name: '',
            date: '',
            address: [],
            place: ''
          }
        },
      };
    },
    methods: {
      Get_Query_Charge_Mode(status) {
        switch (status) {
          case 0:
            return '常规';
          case 1:
            return '快速';
          default:
            return '';
        }
      },
      Get_Query_Charge_Status(status) {
        switch (status) {
          case 0:
            return '等待中';
          case 1:
            return '充电中';
          default:
            return '';
        }
      },
      Query_Charge_Detail () {
        console.log("Query_Charge_Detail_Success");
        const apiUrl = '/api/user/query/detail';
        const params = {
          user_id: getToken(),
          car_id: this.car_id
        };
        axios.get(apiUrl, { params })// 无法使用则修改为 data: params
        .then(response => {
          console.log(response.status);
          if (response.data.status === 0) {
            this.ShowTable = true;
            this.ShowRequest = false;
            console.log(response.data.data);
            console.log(this.ShowTable);
            console.log(response.data.data.status);
            this.tableData = [
              {
                car_id: response.data.data.car_id,
                mode: response.data.data.mode,
                Status: response.data.data.status,
                pile_id: response.data.data.pile_id,
                request_amount: response.data.data.request_amount,
                charged_amount: response.data.data.charged_amount,
                duration: response.data.data.duration,
                remain: response.data.data.remain,
                start_time: response.data.data.start_time,
              }
            ];
          }
          else{
            this.$message({
                          message: response.data.message,
                          type: "error"
                        });
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
      Query_Request () {
        console.log("Query_Request_Success");
        const apiUrl = '/api/user/query/request';
        const params = {
          user_id: getToken(),
        };
        axios.get(apiUrl, { params })// 无法使用则修改为 data: params
        .then(response => {
          console.log(response.status);
          console.log(response);
          if (response.data.status === 0) {
            this.ShowTable = false;
            this.ShowRequest = true;
            this.tableData = response.data.data.map(item => {
              return {
                car_id: item,
              };
            })
          }
          else{
            this.$message({
                          message: response.data.message,
                          type: "error"
                        });
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
    }
  };
  </script>
  