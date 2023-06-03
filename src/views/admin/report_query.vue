<template>
    <section>
      <el-row>
        <el-col :span="24">
          <!--表单-->
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            
            <el-form-item label="报表查询">
              <el-input v-model="formInline.data.start" placeholder="开始日期" style="width: 140px;"></el-input>
              ~
              <el-input v-model="formInline.data.end" placeholder="结束日期" style="width: 140px;"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit(formInline.data.start, formInline.data.end)">查询</el-button>
            <!-- <a href="javascript:;" id="download" style="background-color:#409EFF;color: #fff;padding: 12px 10px!important;margin-left: 10px!important;border-radius:4px " @click="download()" download="download.csv">导出数据</a> -->
          </el-form>
          <!--表格-->
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column
              prop="start"
              label="开始日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="end"
              label="结束日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="duration"
              label="总时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="总电量"
              width="150">
            </el-table-column>
            <el-table-column
              prop="service"
              label="服务费"
              width="150">
            </el-table-column>
            <el-table-column
              prop="charge"
              label="充电费用"
              width="150">
            </el-table-column>
            <el-table-column
              prop="total"
              label="总费用">
            </el-table-column>
          </el-table>
        
          
        </el-col>
      </el-row>
    </section>
  </template>
  <script type="text/ecmascript-6">
  import axios from 'axios';
  export default {
    data () {
      return {
        formInline: {
          data: {
            start: "",
            end: "",
            duration: 0,
            date: "",
            amount: 0,
            service: 0,
            charge: 0,
            total: 0,
          }
        },
        tableData: [],
        options: [],
        places: [],
        dialogFormVisible: false,
        editLoading: false,
        currentPage: 1,
        table_index: 999,
      };
    },
    methods: {
      onSubmit(start, end) {
        console.log("onSubmit");
        const apiUrl = 'https://6cc561c5-f4d2-4668-88f2-c9e97e7aa76f.mock.pstmn.io';
        const params = {
          start: this.formInline.data.start,
          end: this.formInline.data.end
        };
        axios.get(apiUrl, {params})
        .then(response => {
          if (start === '' || end === '') {
            this.$message("请输入时间");
          } else
          if (response.status === 200) {
            console.log("2Success");
            const responseData = response.data.data;
            this.formInline.data.start = responseData.start;
            this.formInline.data.end = responseData.end;
            this.formInline.data.duration = responseData.duration;
            this.formInline.data.date = responseData.date;
            this.formInline.data.amount = responseData.amount;
            this.formInline.data.service = responseData.service;
            this.formInline.data.charge = responseData.charge;
            this.formInline.data.total = responseData.total;
            this.$message(response.data.message);
            console.log(response.data.message);
             // 更新表格数据
            this.tableData = [
              {
                start: responseData.start,
                end: responseData.end,
                duration: responseData.duration,
                amount: responseData.amount,
                service: responseData.service,
                charge: responseData.charge,
                total: responseData.total,
              },
            ];
          } else {
            console.log("3Success");
            this.$message(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }
    }
  };
  </script>
  <style>
    .el-pagination {
      text-align: center;
      margin-top: 30px;
    }
    .el-message-box__btns .cancel {
      float: right;
      margin-left: 10px;
    }
  </style>
  