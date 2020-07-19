<template>
  <div id="changePassword">
    <div class="header">
			<i class="fa fa-book"></i>
			LMS
		</div>
    <div class="changePasswordOuter">
      <div class="formDiv">
        <h1>Change Password Form</h1>
        <div class="form">
          <div class="inputDiv">
            <label>
              Current Password: 
            </label>
            <div>
              <input class="inputElement"
                type="password"
                v-model="password"
              />
              <div class="error" v-if="submitted && !$v.password.required">Current Password is required.</div>
              <div class="error" v-if="submitted && !$v.password.minLength">Current Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>
            </div>  
          </div>
          <div class="inputDiv">
            <label>
              New Password: 
            </label>
            <div>
              <input class="inputElement"
                type="password"
                v-model="newPassword"
              />
              <div class="error" v-if="submitted && !$v.newPassword.required">New Password is required</div>
              <div class="error" v-if="submitted && !$v.newPassword.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>
            </div>  
          </div>
          <div class="inputDiv">
            <label>
              Confirm New Password: 
            </label>
            <div>
              <input class="inputElement"
                type="password"
                v-model="confirmNewPassword"
              />
              <div class="error" v-if="submitted && !$v.confirmNewPassword.required">Password is required.</div>
              <div class="error" v-if="submitted && !$v.confirmNewPassword.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</div> 
            </div>  
          </div>
          <button type="submit" class="submitButton" @click="changePassword">Submit</button>
        </div>
      </div>  
    </div>  
  </div>  
</template>

<script>
import Vue from 'vue'
import vuelidate from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

Vue.use(vuelidate)
export default {
  name: 'ChangePassword',
  data () {
    return {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      submitted: false
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(4)
    },
    newPassword: {
      required,
      minLength: minLength(4)
    },
    confirmNewPassword: {
      required,
      minLength: minLength(4)
    }
  },

  methods: {
    changePassword() {
      this.submitted = true
      if(this.$v.$invalid){
        return 
      } else if(this.newPassword === this.confirmNewPassword){
      fetch('http://localhost:5000/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type' :'application/json'
        },
        body: JSON.stringify({
          emailId: JSON.parse(localStorage.getItem('data')).email,
          password: this.password,
          newPassword: this.confirmNewPassword
        })
      })
      .then((response) => { return response.json() })
      .then((result) => {
        if (result.status === 200) {
          this.$toast.open({
            message: result.message,
            position: "top-right",
            type: "success",
            duration: 5000,
            dismissible: true
          });
          localStorage.clear('data')
          this.$router.push({path: '/login'})
        }
      })
    } else {
      this.$toast.open({
        message: 'Your new password does not match with the confirm password.',
        position: "top-right",
        type: "error",
        duration: 5000,
        dismissible: true
      });
    }
  }
}
}
</script>

<style>
#changePassword {
  width: 100%;
  height: 100vh;
  background-color: #3d3f47;
}

#changePassword .changePasswordOuter {
  display: flex;
  height: inherit;
  align-items: center;
  justify-content: center;
}

#changePassword .header {
	font-size: -webkit-xxx-large;
	font-weight: 500;
	font-family: monospace;
	color: white;
  height: 70px;
	align-items: center;
	justify-content: space-evenly;
	display: flex;
	width: 170px;
}

#changePassword .formDiv {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  width: max-content;
  height: max-content;
  background-color: #f2f2f2;
  border-radius: 20px;
  padding: 40px;
}

#changePassword .form {
  padding: 25px;
  width: 100%;
  align-items: center;
}

#changePassword .inputDiv{
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  align-items: center;
}

#changePassword .inputElement {
  width: 200px;
  height: 20px;
  border-style: groove;
  border-radius: 5px;
  padding: 5px;
  
}

#changePassword .inputElement:focus {
  outline: none;
}

#changePassword .submitButton {
  color: #fff;
  border: none;
  margin: 10px 10px;
  border-radius: 5px;
  background-color:gray;
  padding: 10px;
  margin-left: 45%;
  cursor: pointer;
}

#changePassword .error{
  margin-top: 5px;
  color:#fff;
  color: red;
  font-size: 12px;
}
</style>
