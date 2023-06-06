<template>
  <div>
  <div>
    <el-row>
      <el-col :span="24">
        <!-- 表单 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-col :span = "3">
          <el-input v-model="car_id" placeholder="请输入car_id" style="width: 100%; display: inline-block;"></el-input>
        </el-col>  
        <el-col :span = "3">
            <el-button type="primary" @click="Query_queue()" style="display: inline-block;">查询排队信息</el-button>
        </el-col>
        <el-col :span = "3">
          <el-input v-model="bill_id" placeholder="请输入账单id" style="width: 100%"></el-input>
        </el-col>
        <el-col :span = "3">
            <el-button type="primary" @click="Query_bill()">查询账单</el-button>
        </el-col>
        
        <el-col :span = "3">
            <el-button type="primary" @click="Query_User_info()">查询用户信息</el-button>
        </el-col>

        </el-form>
      </el-col>
    </el-row>
  </div>
  <br/>
  <div>
    <el-row>
      <el-col :span="24">
        <!--排队信息 表格 -->
        <el-table :data="tableData" v-if="ShowTable" border style="width: 100%">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="car_id" label="	车辆id" width="180"></el-table-column>
          <el-table-column prop="pile_id" label="充电桩id" width="180"></el-table-column>
          <el-table-column prop="wait" label="排队位置" width="180"></el-table-column>
          <el-table-column prop="section" label="区域">
            <template slot-scope="scope">
              <span>{{ Get_Queue_Section_Text(scope.row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span>{{ Get_Queue_Status_Text(scope.row.status) }}</span>
            </template>
          </el-table-column>

        </el-table>
        <!-- 错误提示 -->
        <p v-if="ShowError" class="error-message">{{ errorMessage }}</p>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :span="24">
        <!-- List 表格 -->
        <el-table :data="tableData" v-if="ShowBill" border style="width: 100%">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="bill_id" label="账单id" ></el-table-column>
          <el-table-column prop="status" label="账单状态" >
          <template slot-scope="scope">
              <span>{{ get_Bill_Status(scope.row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="账单日期"></el-table-column>
          <el-table-column prop="car" label="车辆id"></el-table-column>
          <el-table-column prop="amount" label="总电量"></el-table-column>
          <el-table-column prop="mode" label="充电模式">
            <template slot-scope="scope">
              <span>{{ get_Bill_Mode(scope.row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="pile" label="充电桩id"></el-table-column>
          <el-table-column prop="start_time" label="开始时间"></el-table-column>
          <el-table-column prop="end_time" label="结束时间"></el-table-column>
          <el-table-column prop="service" label="服务费"></el-table-column>
          <el-table-column prop="charge" label="充电费用"></el-table-column>
          <el-table-column prop="total" label="总费用"></el-table-column>
        </el-table>
        <p v-if="ShowBillError" class="error-message">{{ "账单不存在" }}</p>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">      
        <el-table :data="billData" v-if="Showuserinfo" border style="width: 100%">
          <el-table-column prop="id" label="账单id"></el-table-column>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="cost" label="花费"></el-table-column>
          <el-table-column prop="car_id" label="车辆id"></el-table-column>
        </el-table>
        <!-- 错误提示 -->
        <p v-if="ShowError" class="error-message">{{ QueueMessage }}</p>
      </el-col>
    </el-row>
  </div>   
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
import {getToken} from '@/utils/auth';
import axios from 'axios';
export default {
  data () {
    return {
      user_id: '',
      car_id: '',
      user_id2: '',
      bill_id: '',
      user_id3: '',
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
      ShowBill: false,
      ShowError: false,
      ShowBillError: false,
      errorMessage: '',
      ResMessage: '',
      QueueMessage: '',
      ShowTable: false,
      Showuserinfo: false,
    };
  },
  methods: {
    Get_Queue_Section_Text(status) {
      switch (status) {
        case 0:
          return '等待区';
        case 1:
          return '充电区';
        default:
          return '';
      }
    },
    Get_Queue_Status_Text(status) {
      switch (status) {
        case 0:
          return '等待中';
        case 1:
          return '充电中';
        default:
          return '';
      }
    },
    get_Bill_Status(status) {
      switch (status) {
        case 0:
          return '已提交';
        case 1:
          return '正在充电';
        case 2:
          return '已完成';
        case 3:
          return '已取消';
        default:
          return '';
      }
    },
    get_Bill_Mode(status) {
      switch (status) {
        case 0:
          return '常规';
        case 1:
          return '快速';
        default:
          return '';
      }
    },
    Query_queue () {
      console.log("Query_queue_Success");
      const apiUrl = '/api/user/query/queue';
      const params = {
        user_id: getToken(),
        car_id: this.car_id
      };
      axios.get(apiUrl, { params })// 无法使用则修改为 data: params
      .then(response => {
        console.log(response.status);
        if (response.data.status === 0) {
          this.ShowTable = true;
          this.ShowError = false;
          this.ShowBill = false;
          this.ShowBillError = false;
          this.Showuserinfo = false;
          this.tableData = [
            {
              car_id: response.data.data.car_id,
              pile_id: response.data.data.pile_id,
              wait: response.data.data.wait,
              section: response.data.data.section,
              status: response.data.data.status
            }
          ];
        } else {
          this.ShowTable = false;
          this.ShowError = true;
          this.Showuserinfo = false;
          this.QueueMessage = "车辆不存在";
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    Query_bill () {
      console.log("Query_bill_Success");
      const apiUrl = '/api/user/query/bill';
      const params = {
        user_id: getToken(),
        bill_id: this.bill_id
      };
      axios(
        {
          url: apiUrl,
          method: 'get',
          params: params
        }
      )
      .then(response => {
        console.log(response.status);
        if (response.data.status === 0) {
          this.ShowBill = true;
          this.ShowTable = false;
          this.ShowError = false;
          this.ShowBillError = false;
          this.Showuserinfo = false;
          console.log(response.data.data)
          this.tableData = [
            {
              bill_id: response.data.data.bill_id,
              status: response.data.data.status,
              date: response.data.data.date,
              car: response.data.data.car,
              amount: response.data.data.detail.amount,
              duration: response.data.data.detail.duration,
              mode: response.data.data.detail.mode,
              pile: response.data.data.detail.pile,
              start_time: response.data.data.detail.start_time,
              end_time: response.data.data.detail.end_time,
              service: response.data.data.cost.service,
              charge: response.data.data.cost.charge,
              total: response.data.data.cost.total,
            }
          ];
        } else {
          this.ShowTable = false;
          this.ShowBill = false;
          this.ShowError = false;
          this.Showuserinfo = false;
          this.ShowBillError = true;
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    Query_User_info () {
      console.log("Query_User_info_Success");
      const apiUrl = '/api/user/query/profile';
      const params = {
        user_id: getToken(),
      };
      axios.get(apiUrl, { params })// 无法使用则修改为 data: params
      .then(response => {
        console.log(response);
        if (response.data.status === 0) {
          this.ShowTable = false;
          this.ShowError = false;
          this.ShowBill = false;
          this.ShowBillError = false;
          this.Showuserinfo = true;
            
          this.billData = response.data.data.bill.map(item => {
            return {
              id: item.id,
              date: item.date,
              cost: item.cost,
              car_id : item.car,
            };
          })
          this.tableData = [
            {
              user_id: response.data.data.user_id,
            }
          ];
        } else {
          this.ShowTable = false;
          this.ShowError = true;
          this.QueueMessage = response.data.message;
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
  }
};
</script>
