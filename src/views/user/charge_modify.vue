<template>
  <section class="form-section">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户ID"  prop="userID">
        <el-input  v-model="ruleForm.userID"></el-input>
      </el-form-item>
      <el-form-item label="车辆ID"  prop="carID">
        <el-input  v-model="ruleForm.carID"></el-input>
      </el-form-item>
      <el-form-item label="充电模式" prop="mode">
        <el-radio-group v-model="ruleForm.mode">
          <el-radio label="0">常规</el-radio>
          <el-radio label="1">快速</el-radio>
        <el-button type="primary" @click="submitMode">修改充电模式</el-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="充电电量" prop="mount">
        <el-row type="flex" justify="space-between">
          <el-col :span="25">
            <el-input v-model="ruleForm.mount"></el-input>
          </el-col>
          <el-col :span="10">
            <el-button type="primary" @click="submitMount">修改充电电量</el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-row type="flex" justify="space-between">
          <el-col :span="25">
            <el-button type="primary" @click="submitForm">提交充电请求</el-button>
          </el-col>
          <el-col :span="14">
            <el-button type="primary" @click="submitCancel">取消充电</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      ruleForm: {
        userID: '',
        carID: '',
        mode: '',
        mount: '',
      },
      rules: {
        userID: [
          {required: true, message: '请输入用户ID', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        carID: [
          {required: true, message: '请输入车辆ID', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        mode: [
          {required: true, message: '请选择充电模式', trigger: 'change'}
        ],
        mount: [
          {required: true, message: '请输入充电电量', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitMode() {
      if (this.ruleForm.userID !== '' && this.ruleForm.carID !== '' && this.ruleForm.mode !== '') {
        axios({
          url: '/api/user/alter/mode',
          // url: 'https://607daafc-16fc-42a7-9928-53eb7b5b6cad.mock.pstmn.io/api',
          data: {
            user_id: this.ruleForm.userID,
            car_id: this.ruleForm.carID,
            mode: this.ruleForm.mode,
          },
          method: 'post'
        }).then(res => {
          console.log(res.data) // 输出返回的报文
          if (res.data.status === 0) {
            this.$message.success(res.data.message); // 如果修改成功，弹出成功信息
          } else if (res.data.status === 1) {
            this.$message.warning(res.data.message); // 如果车辆不存在，弹出警告信息
          } else if (res.data.status === 2) {
            this.$message.warning(res.data.message); // 如果不允许修改，弹出警告信息
          } else {
            this.$message.error(res.data.message); // 如果有其他错误，弹出错误信息
          }
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        console.log('error submit!!');
        this.$message.error('充电模式信息未填全');
        return false;
      }
    },
    submitMount() {
      if (this.ruleForm.userID !== '' && this.ruleForm.carID !== '' && this.ruleForm.mount !== '') {
        axios({
          url: '/api/user/alter/amount',
          // url: 'https://607daafc-16fc-42a7-9928-53eb7b5b6cad.mock.pstmn.io/api',
          data: {
            user_id: this.ruleForm.userID,
            car_id: this.ruleForm.carID,
            mount: this.ruleForm.mount,
          },
          method: 'post'
        }).then(res => {
          console.log(res.data) // 输出返回的报文
          if (res.data.status === 0) {
            this.$message.success(res.data.message); // 如果修改成功，弹出成功信息
          } else if (res.data.status === 1) {
            this.$message.warning(res.data.message); // 如果车辆不存在，弹出警告信息
          } else if (res.data.status === 2) {
            this.$message.warning(res.data.message); // 如果不允许修改，弹出警告信息
          } else {
            this.$message.error(res.data.message); // 如果有其他错误，弹出错误信息
          }
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        console.log('error submit!!');
        this.$message.error('充电电量信息未填全');
        return false;
      }
    },
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          axios({
            url: '/api/user/charge',
            // url: 'https://607daafc-16fc-42a7-9928-53eb7b5b6cad.mock.pstmn.io/api',
            data: {
              user_id: this.ruleForm.userID,
              car_id: this.ruleForm.carID,
              mode: this.ruleForm.mode,
              amount: this.ruleForm.mount
            },
            method: 'post'
          }).then(res => {
            console.log(res.data) // 输出返回的报文
            if (res.data.status === 0) {
              this.$message.success(res.data.message); // 如果修改成功，弹出成功信息
            } else if (res.data.status === 1) {
              this.$message.warning(res.data.message); // 如果车辆不存在，弹出警告信息
            } else if (res.data.status === 2) {
              this.$message.warning(res.data.message); // 如果不允许修改，弹出警告信息
            } else {
              this.$message.error(res.data.message); // 如果有其他错误，弹出错误信息
            }
          })
          .catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!');
          this.$message.error('信息未填全');
          return false;
        }
      })
    },
    submitCancel() {
      if (this.ruleForm.userID !== '' && this.ruleForm.carID !== ''){
        axios({
          url: '/api/user/alter/cancel',
          // url: 'https://607daafc-16fc-42a7-9928-53eb7b5b6cad.mock.pstmn.io/api',
          data: {
            user_id: this.ruleForm.userID,
            car_id: this.ruleForm.carID,
          },
          method: 'post'
        }).then(res => {
          console.log(res.data) // 输出返回的报文
          if (res.data.status === 0) {
            this.$message.success(res.data.message); // 如果修改成功，弹出成功信息
          } else if (res.data.status === 1) {
            this.$message.warning(res.data.message); // 如果车辆不存在，弹出警告信息
          } else if (res.data.status === 2) {
            this.$message.warning(res.data.message); // 如果不允许修改，弹出警告信息
          } else {
            this.$message.error(res.data.message); // 如果有其他错误，弹出错误信息
          }
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        console.log('error submit!!');
        this.$message.error('用户或车辆信息未填全');
        return false;
      }
    },
  },
}
</script>
<style>
  .form-section {
    padding: 10px;
    width: 500px;
  }
</style>
