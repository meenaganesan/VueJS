<template>
  <div id="outer">
		<!-- image of the book-->
		<div class="imgDiv">
			<img class="bookImage" src="https://m.media-amazon.com/images/I/51d2e+67u1L.jpg">
		</div>
		<!-- name -->
		<div class="bookInfo">
			<div class="bookTitle">{{bookData.title}}</div>
			<div class="bookAuthor">by {{bookData.author}}</div>
			<div class="bookDescription" v-if="bookData.description">{{ bookData.description }}</div>
			<div class="bookDescription" style="font-style: italic;" v-else>Book description not available</div>
			<!-- <div id="bookPages">{{bookData.pages}}</div> -->
			<div class="categories">
				<div v-for="(item, index) in categories" :key="index">
					<span class="bookCategories">{{item}}</span>	
				</div>	
			</div>	
		</div>
		<div v-if="!role && role !== 'admin'">
			<div class="bookData" v-if="bookData.bookedBy && bookData.bookedBy.email === email ">
				<div v-if="new Date(bookData.bookedBy.expectedReturnDate) >= new Date()">
					<button class="submitButton" @click="returnBooks">Return Book</button>
					<div>Expected Return Date:{{bookData.bookedBy.expectedReturnDate}}</div>
				</div>
				<div v-else>Please contact admin</div>	
			</div>		
			<div v-else-if="!bookData.bookedBy || bookData.bookedBy === ''">
				<button class="submitButton" @click="getBooks">Get Book</button>
			</div>
			<div class="bookData" v-else>
				<div>Book is not available but you can reserve it.</div>
				<button class="submitButton" @click="reserveBooks">Reserve Book</button>
			</div>
		</div>		
  </div>	

</template>


<script>
export default {
	name: 'BookOverview',
	props: {
		bookData: Object,
		bookList: Function
	},

	data () {
		return {
			categories: this.bookData.categories && this.bookData.categories !== "" ? this.bookData.categories.split(',') : [],
			email: JSON.parse(localStorage.getItem('data')).email,
			role: JSON.parse(localStorage.getItem('data')).role
		}
	},

	methods: {
		getBooks () {
			fetch('http://localhost:5000/bookList/getBook', {
				method: 'POST',
				headers: {
					'Content-Type' :'application/json'
				},
				body: JSON.stringify({
					bookId: this.bookData.id,
					emailId: this.email
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
					this.bookList()
					this.updateUserData()
				}
			})
		},

		returnBooks () {
			fetch('http://localhost:5000/bookList/returnBook', {
				method: 'POST',
				headers: {
					'Content-Type' :'application/json'
				},
				body: JSON.stringify({
					bookId: this.bookData.id,
					emailId: this.email
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
					this.bookList()
					this.updateUserData()				
				}
			})
		},
		updateUserData () {
			fetch('http://localhost:5000/userData', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body:JSON.stringify({ emailId: this.email })
			})
			.then((response) => { return response.json() })
			.then((result) => {
				if (result.status === 200) {
					localStorage.setItem('data', JSON.stringify(result.data))
					this.$emit('updateItem')
				}
			})
		} ,
		reserveBooks () {
			fetch('http://localhost:5000/bookList/reserveBook', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ bookId: this.bookData.id, emailId: this.email })
			})
			.then((response) => { return response.json() })
			.then((result) => {
				console.log(result)
			})
		}
	}	
}
</script>

<style scoped>
#outer .bookImage {
	width: 80px;
	height: 140px;
}

#outer .bookInfo {
	padding: 11px;
	line-height: 24px;
	width: 600px;
}

#outer .bookTitle {
	font-size: 16px;
  font-weight: bold;
	max-height: 20px;
	overflow: hidden;
	text-overflow: ellipsis;
}

#outer .bookAuthor{
	font-size: 15px;
}

#outer .bookDescription {
 text-overflow: ellipsis;
 max-width: 650px;
 max-height: 45px;
 font-size: 14px;
 overflow: hidden;
}

#outer .categories {
	display: flex; 
	margin-top:8px;
}

#outer .bookData {
	width: 300px;
	font-size: 14px;
}


#outer .bookCategories { 
	padding: 6px;
	border-radius: 5px;
	/* color: gray; */
	border:1px solid gray;
	font-size: 12px;
	line-height: 19px;
	margin-right: 5px;
}

#outer {
	display: flex;
	height: 140px;
	margin: 15px;
	justify-content: center;
	/* border: 1px solid gray;
	border-radius: 20px; */
}

#outer .submitButton {
  color: #fff;
  border: none;
  margin: 10px 10px;
  border-radius: 5px;
  background-color:gray;
  padding: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
</style>