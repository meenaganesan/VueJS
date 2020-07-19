<template>
	<div id="userDashboard">
		<div class="outer-div">
			<Cards message="Total number of books" :count="booksCount"></Cards>
      <div class="flexStyle" v-if="userData.role === 'admin' && currentTab === 'Available Books'">
        <div v-if="deleteBooks" class="flexStyle">
          <button class="submitButton" @click="cancel"> Cancel </button>
          <button class="submitButton" @click="deleteBookAPI">Delete ({{booksArray.length}})</button>
        </div>  
        <button v-else class="submitButton" @click="deleteBooksFunc">Delete Book</button>
      </div>  
		</div>
    <div class="tab-div">
      <button v-show="role === 'admin'"
      v-for="tab in tabs"
      v-bind:key="tab"
      v-bind:class="['tab-button', { active: currentTab === tab }]"
      v-on:click="changeTab(tab)"
      >
        {{ tab }}
      </button>
      <div >
        <div class="searchDiv">
          <input class="inputElement" type="text" placeholder="Search book" @keyup="filterBooks"/>
          <div v-if="currentTab === 'Available Books'">
            <label>Sort By: </label>
            <select v-model="sortOrder">
              <option value="title">Title</option>
              <option value="author">Author</option>
              <!-- <option>Year</option> -->
            </select>
          </div>  
        </div>
        <div v-for="(book, index) in orderBy(books, sortOrder) " :key="index" class="inner-div">
          <input v-if="deleteBooks && (book.bookedBy === '' || !book.bookedBy)" type="checkbox" @click="removeBooks(book.title)"/>
          <BookOverview v-if= "currentTab === 'Available Books'" :bookData="book" :bookList="loadBookList"></BookOverview>
          <TableView v-else :tableData="book"></TableView>
        </div> 
        <div v-if="books.length === 0" class="booksNotAvailable">Book is not available.</div>
        <div v-if="hasNext && currentTab === 'Available Books'" class="ml">
          <button class="submitButton" @click="loadMore">Load More</button>
        </div>
      </div>  
    </div>  
	</div>
</template>

<script>
import BookOverview from '@/components/BookOverview.vue'
import Cards from '@/components/Cards.vue'
import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import Vue2Filters from 'vue2-filters'
import TableView  from '@/components/TableView.vue'

Vue.use(VueToast)
Vue.use(Vue2Filters)

export default {
  name: 'UserDashboard',
  mixins: [Vue2Filters.mixin],
	data() {
		return{
      "books":[],
      "availableBooks": [],
      "issuedBooks": [],
			"booksCount": 0,
      "hasNext": false,
      "deleteBooks": false,
      "booksArray" :[],
      "sortOrder": 'title',
      "currentTab": 'Issued Books',
      "tabs": ['Issued Books', 'Available Books'],
      "userData": JSON.parse(localStorage.getItem('data')),
      "role": JSON.parse(localStorage.getItem('data')).role
		}
	},

	created () {
    if(this.role && this.role === 'admin') {
      this.currentTab = 'Issued Books'
    } else {
      this.currentTab = 'Available Books'
    }
    this.loadIssuedBooks()
    this.loadBookList()
    this.getBooksCount()
    
  },

  methods: {
    loadBookList () {
      fetch('http://localhost:5000/bookList',{
      method: 'GET'
      })
      .then((response) => { return response.json()})
      .then((result) => { 
        if( result.status === 200 ) {
          this.availableBooks = result.data
          this.duplicateBookList = result.data
          this.hasNext = result.hasNext
          this.setData()
        } else {
          this.books = []
        }
      })
    }, 

    changeTab (tab) {
      this.currentTab = tab
      if(tab === 'Issued Books') {
        this.books = this.issuedBooks
      } else {
        this.books = this.availableBooks
      }
    },

    loadIssuedBooks () {
      fetch('http://localhost:5000/bookList/issuedBooks', {
        method: 'GET'
      })
      .then((response) => {return response.json()})
      .then((result) => {
        if( result.status === 200 ) {
          this.issuedBooks = result.data
        } else {
          this.books = []
        }
      })
    },

    setData () {
      if(!this.role && this.role !== 'admin' || this.currentTab === 'Available Books') {
        this.books = this.availableBooks
      } else {
        this.books = this.issuedBooks
      }
    },

    filterBooks: function (e) {
      let val = e.target.value
      this.books = this.duplicateBookList.filter(function(data){
        return data.title.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
    },

    getBooksCount () {
      fetch('http://localhost:5000/bookList/totalCount',{
      method: 'GET'
      })
      .then((response) => { return response.json()})
      .then((result) => { 
        if( result.status === 200 ) {
          this.booksCount = result.data
        } else {
          this.booksCount = 0
        }
      })
    },

    loadMore () {
      fetch('http://localhost:5000/bookList/loadMore', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          skip: this.books.length
        })
      })
      .then((response) => { return response.json()})
      .then((result) => {
        if(result.status === 200) {
          this.books = this.books.concat(result.data)
          this.hasNext = result.hasNext
        }
      })
    },

    deleteBookAPI () {
      fetch('http://localhost:5000/bookList/deleteBooks',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body : JSON.stringify(this.booksArray)
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
          this.cancel()
          this.getBooksCount()
          this.loadBookList()

        }
      })
    }, 

    deleteBooksFunc () {
      this.deleteBooks = true
    },

    cancel () {
      this.deleteBooks = false
      this.booksArray = []
    },

    removeBooks(data) {
      this.booksArray.push(data)
      console.log(this.booksArray)
    }
	},
	
	components: {
		BookOverview,
    Cards,
    TableView
	}
}
</script>

<style scoped>
#userDashboard .booksNotAvailable {
  text-align: center;
  font-size: 22px;
  margin-top: 25px;
}
#userDashboard .tab-button {
  padding: 12px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}

#userDashboard .tab-body {
  border:  1px solid gray;
}

#userDashboard .tab-div {
  margin-left: 12px;
  margin-bottom: 12px;
}

#userDashboard .tab-button:hover {
  background: #e0e0e0;
}

#userDashboard .tab-button.active {
  background: #e0e0e0;
}

#userDashboard .tab {
  border: 1px solid #ccc;
  padding: 10px;
}

#userDashboard .searchDiv {
  margin: 6px 13px;
  display: flex; 
  justify-content: space-between;
}

#userDashboard .outer-div {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 10px;
}

#userDashboard .inputElement {
  width: 200px;
  height: 20px;
  border-style: groove;
  border-radius: 5px;
  padding: 5px;
}

#userDashboard .inner-div {
  width: 1020px;
  display: flex; 
  align-items: center; 
  border-radius: 12px; 
  border: 1px solid gray; 
  margin-bottom: 10px; 
  margin: 12px;
}

#userDashboard .ml{
  margin-left: 50%;
}

#userDashboard .flexStyle {
  display: flex;
}

#userDashboard  {
	overflow-y: scroll; 
	height: 89vh; 
	width: 100%;
  /* overflow-x: hidden; */
}

#userDashboard .submitButton {
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