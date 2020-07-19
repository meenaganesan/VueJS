<template>
  <div id="addBook">
		<div class="mainDiv">
			<h1>Add New Book Form</h1>
			<div class="form">
				<div class="inputDiv">
					<label>Name of the Book:</label>
					<div>
						<input class="inputElement" v-model ="title" type="text" />
						<div class="error" v-if="submitted && !$v.title.required">Name of the book is required.</div>
					</div>
				</div>
				<div class="inputDiv">
					<label>Author:</label>
					<div>
						<input class="inputElement" v-model="author" type="text" />
						<div class="error" v-if="submitted && !$v.author.required">Author is required.</div>
					</div>
				</div>
				<div class="inputFlex">
					<div class="inputDiv">
						<label>Year:</label>
						<div>
							<input class="inputElementSmall" v-model="year" type="number" />
							<div class="error" v-if="submitted && !$v.year.required">Year is required.</div>
						</div>
					</div>
					<div class="inputDiv">
						<label>Pages:</label>
						<div>
							<input class="inputElementSmall" v-model="pages" type="number" />
							<div class="error" v-if="submitted && !$v.pages.required">Pages is required.</div>
						</div>
					</div>
				</div>
				<div class="inputFlex">
					<div class="inputDiv">
						<label>Edition:</label>
						<div>
							<input class="inputElementSmall" v-model="edition" type="text" />
							<div class="error" v-if="submitted && !$v.edition.required">Edition of the book is required.</div>
						</div>
					</div>
					<div class="inputDiv">
						<label>Volume:</label>
						<div>
							<input class="inputElementSmall" v-model="volume" type="number" />
						</div>
					</div>
				</div>
				<div class="inputDiv">
					<label>Categories:</label>
					<div>
						<input class="inputElement" v-model="categories" type="text" />
					</div>
				</div>
				<div class="inputDiv">
					<label>Description:</label>
					<div>
						<input class="inputElement" v-model="description" type="text" />
					</div>
				</div>
			</div>
			<div>
				<button type="submit" @click="submitForm" class="submitButton">Submit</button>
			</div>		
		</div>
  </div>		
</template>

<script>
import Vue from 'vue'
import vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

Vue.use(VueToast)

Vue.use(vuelidate)

export default {
	name: 'AddNewBook',
	data () {
		return {
			title: '',
			author: '',
			year: '',
			volume: '',
			description: '',
			edition: '',
			categories: '',
			pages: '',
			submitted: false
		}
	},

	validations: {
		title: { required },
		author: { required },
		year: { required },
		edition: { required },
		pages: { required }
	},

	methods: {
		submitForm () {

			this.submitted = true
			if(this.$v.$invalid){
        return 
      } else {
				var item = {
					title: this.title,
					author: this.author,
					year: this.year,
					volume: this.volume,
					edition: this.edition,
					categories: this.categories,
					pages: this.pages.toString(),
					description: this.description,
					id: Math.floor(Math.random() * 100)
				}
				fetch('http://localhost:5000/bookList/addBook', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(item)
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
						this.$v.$reset()
					}
				})
			}
		}
	}

}
</script>

<style scoped>
#addBook {
	width: 100%;
  height: 89vh;
	overflow-y: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
}

#addBook .inputFlex{
	display: flex;
	justify-content: space-between;
}

#addBook .mainDiv {
	justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
}

#addBook .form {
  padding: 0px;
	width: 110%;
  align-items: center;
}

#addBook .inputDiv{
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  align-items: center;
}

#addBook .inputElement {
  width: 200px;
  height: 20px;
  border-style: groove;
  border-radius: 5px;
  padding: 5px;
  
}

#addBook .inputElementSmall{
	width: 80px;
  height: 20px;
  border-style: groove;
  border-radius: 5px;
  padding: 5px;
  
}

#addBook .inputElementSmall:focus {
  outline: none;
}

#addBook .inputElement:focus {
  outline: none;
}

#addBook .submitButton {
  color: #fff;
  border: none;
  margin: 10px 10px;
  border-radius: 5px;
  background-color:gray;
  padding: 10px;
  margin-left: 50%;
  cursor: pointer;
}

#addBook .error{
  margin-top: 5px;
  color:gray;
  font-size: 12px;
}
</style>