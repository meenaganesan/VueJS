<template>
  <div id="loginForm">
    <div class="header">
			<i class="fa fa-book"></i>
			LMS
		</div>
    <div class="loginFormOuter">
      <div class="formDiv">
        <h1>Log In</h1>
        <div class="form">
          <div class="inputDiv">
            <label>
              Email: 
            </label>
            <div>
              <input class="inputElement"
                type="text"
                v-model="$v.email.$model"
              />
              <div class="error" v-if="submitted && !$v.email.required">Email Id is required</div>
              <div class="error" v-if="submitted && !$v.email.email">Email is invalid</div>
            </div>
          </div>
          <div class="inputDiv">
            <label>
              Password: 
            </label>
            <div>
              <input class="inputElement"
                type="password"
                v-model="password"
              />
              <div class="error" v-if="submitted && !$v.password.required">Password is required.</div>
              <div class="error" v-if="submitted && !$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</div> 
            </div> 
          </div>
          <div class="displayButtons">
            <button type="submit" class="submitButton" @click="loginUser">Log In</button>
            <button class="submitButton" @click="openRegisterForm">Sign Up</button>
          </div>  
        </div>
      </div>
    </div>    
  </div>
</template>


<script>
// @ is an alias to /src

import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import vuelidate from 'vuelidate'
import { required, minLength,email } from 'vuelidate/lib/validators'

Vue.use(vuelidate)
Vue.use(VueToast);

export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: '',
      submitted: false
    }
  },

  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(4)
    }
  },

  methods: {

    loginUser() {
      this.submitted = true
      if(this.$v.$invalid) {
        return
      } else {
        var data = { email: this.email, password: this.password }
        fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then((response) => { return response.json() })
        .then((result) => {
          if(result.status === 200) {
            this.$toast.open({
              message: result.message,
              position: "top-right",
              type: "success",
              duration: 5000,
              dismissible: true
            });
            this.$router.push({ path: '/dashboard'})
            localStorage.setItem("data", JSON.stringify(result.data))
          } else {
            this.$toast.open({
              message: result.message,
              position: "top-right",
              type: "error",
              duration: 5000,
              dismissible: true
            });
          }
        })
      }
    },

    openRegisterForm () {
      this.$router.push({ path: '/registerForm'})
    }
  }
}
</script>

<style>
#loginForm {
  width: 100%;
  height: 100vh;
  background-color: #3d3f47;
}

#loginForm .loginFormOuter {
  display: flex;
  height: inherit;
  align-items: center;
  justify-content: center;
}

#loginForm .header {
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

#loginForm .formDiv {
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

#loginForm .form {
  padding: 25px;
  width: 100%;
  align-items: center;
}

#loginForm .inputDiv{
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  align-items: center;
}

#loginForm .inputElement {
  width: 200px;
  height: 20px;
  border-style: groove;
  border-radius: 5px;
  padding: 5px;
  
}

#loginForm .inputElement:focus {
  outline: none;
}

#loginForm .displayButtons {
  display: flex;
  justify-content: center;
}

#loginForm .submitButton {
  color: #fff;
  border: none;
  margin: 10px 10px;
  border-radius: 5px;
  background-color:gray;
  padding: 10px;
  cursor: pointer;
}

#loginForm .error{
  margin-top: 5px;
  color: red;
  font-size: 12px;
}
</style>
