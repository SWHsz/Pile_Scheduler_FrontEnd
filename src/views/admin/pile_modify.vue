  <template>
    <div>
    <div>
      <el-row>
        <el-col :span="24">
          <!-- 表单 -->
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-row style="margin-bottom: 20px;">
          <el-col :span = "8">
            <el-input v-model="pileID" placeholder="请输入pile_id" style="width: 80%; display: inline-block;"></el-input>
          </el-col>
          
          
          <el-col :span = "4">
            <el-button type="primary" @click="Modify()">修改充电桩状态</el-button>
          </el-col>
          <el-col :span = "4">
              <el-button type="primary" @click="Query_Status()" style="display: inline-block;">查询充电桩状态</el-button>
          </el-col>
          <el-col :span = "4">
              <el-button type="primary" @click="Query_waitlist()">查询充电桩等待队列</el-button>
          </el-col>
          <el-col :span = "8">
            <p v-if="ShowStatus" class="ResMessage">{{ ResMessage }}</p>
          </el-col>
          </el-row>

        <el-row style="margin-bottom: 20px;">
          <el-col :span = "24">
            <el-radio v-model="radio" label="0">关闭</el-radio>
            <el-radio v-model="radio" label="1">开启</el-radio>
            <el-radio v-model="radio" label="2">故障</el-radio>
          </el-col>
        </el-row>

          
          </el-form>
        </el-col>
      </el-row>
    </div>
    <br/>
    <div>
      <el-row>
        <el-col :span="24">
          <!--充电桩 表格 -->
          <el-table :data="tableData" v-if="showTable" border style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="pile_id" label="充电桩id" width="180"></el-table-column>
            <el-table-column prop="status" label="充电桩状态" width="180">
              <template slot-scope="scope">
                <span>{{ getStatusText(scope.row.status) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="已充电量" width="180"></el-table-column>
            <el-table-column prop="time" label="运行时间"></el-table-column>
          </el-table>
          <!-- 错误提示 -->
          <p v-if="ShowError" class="error-message">{{ errorMessage }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <!-- List 表格 -->
          <el-table :data="tableData" v-if="showList" border style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="user_id" label="	用户id" width="180"></el-table-column>
            <el-table-column prop="car" label="车辆id" width="180">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="180">
              <template slot-scope="scope">
                <span>{{ getListStatusText(scope.row.status) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
          </el-table>
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
  import axios from 'axios';
  export default {
    data () {
      return {
        ShowStatus: '',
        pileID: '',
        radio: '',
        tableData: [],
        showList: false,
        showTable: false,
        ShowError: false,
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
        errorMessage: '',
        ResMessage: '',
      };
    },

    methods: {
      getListStatusText(status) {
        switch (status) {
          case 0:
            return '等待中';
          case 1:
            return '已取消';
          default:
            return '';
        }
      },
      getStatusText(status) {
        switch (status) {
          case 0:
            return '空闲';
          case 1:
            return '正在充电';
          case 2:
            return '故障';
          default:
            return '';
        }
      },
      Modify () {
        console.log("Modify_Success");
        const apiUrl = '/api/admin/alter/pile';
        const params = {
          pile_id: this.pileID,
          radio: this.radio
        };
        this.showTable = false;
        this.showList = false;
        this.ShowError = false;
        this.ShowStatus = true;
        axios(
          {
            method: 'post',
            url: apiUrl,
            data: params
          }
        )// 无法使用则修改为 data: params
        .then(response => {
          if (response.status === 0) {
            this.ResMessage = "修改成功";
            // console.log(this.ShowStatus);
            // console.log(this.ResMessage);
          } else {
            this.ResMessage = "修改失败";
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
      Query_waitlist () {
        console.log("ListSuccess");
        const apiUrl = '/api/admin/query/pile/waitlist';
        const params = {
          pile_id: this.pileID
        };
        this.showTable = false;
        this.showList = true;
        this.ShowError = false;
        this.ShowStatus = false;
        axios.get(apiUrl, {params})
        .then(response => {
          console.log(response.data.data.status);
          console.log(response.data.data.car);
          if (response.status === 200) {
            this.tableData = response.data.data.map(item => {
              return {
                user_id: item.user_id,
                car: item.car,
                status: item.status,
                time: item.time
              };
            })
          } else {
            this.showList = false;
            this.ShowError = true;
            this.errorMessage = "token已过期";
            console.log("FUCK YOU");
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
      Query_Status () {
        console.log("Success");
        const apiUrl = '/api/admin/query/state';
        const params = {
          pile_id: this.pileID
        };
        axios.get(apiUrl, {params})
        .then(response => {
          console.log("1Success");
          this.showList = false;
          this.showTable = true;
          this.ShowError = false;
          this.ShowStatus = false;
          if (response.status === 200) {
            this.tableData = response.data.map(item => {
              return {
                pile_id: item.pile_id,
                status: item.status,
                amount: item.amount,
                time: item.time
              };
            })
          } else {
            this.showList = false;
            this.showTable = false;
            this.ShowError = true;
            this.errorMessage = "充电桩不存在";
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  };
</script>
