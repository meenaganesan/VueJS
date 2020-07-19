<template>
  <div id="userList">
    <div class="outer-div">
      <div>User Table</div>
      <div class="searchDiv">
          <input class="inputElement" type="text" placeholder="Search user name" @keyup="filterBooks"/>
          <div>
            <label>Sort By: </label>
            <select v-model="sortOrder">
              <option value="name">Name</option>
              <option value="booksTaken">Books Taken</option>
              <option value="returnedBooks">Returned Books</option>
              <!-- <option>Year</option> -->
            </select>
          </div>  
        </div>
      <div class="inner-div">
        <div class="table-head">
          <div class="name">Name</div>
          <div class="thBooksTaken">Books Taken</div>
          <div class="thReturnedBooks">Returned Books</div>
        </div>
        <div class= "row" v-for="(data, index) in orderBy(userData, sortOrder)" :key="index" @click="openUserDetails(data)">
          <div class="name">{{data.name}}</div>
          <div class="booksTaken">{{data.booksTaken.length}}</div>
          <div class="returnedBooks">{{data.returnedBooks.length}}</div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import Vue2Filters from 'vue2-filters'
import Vue from 'vue'

Vue.use(Vue2Filters)
export default {
  name: 'UserList',
  mixins: [Vue2Filters.mixin],
  data () {
    return { 
      userData: [],
      sortOrder: 'name',
      currentUserMail: JSON.parse(localStorage.getItem('data')).email
    }
  },
  created() {
    fetch('http://localhost:5000/userList', {
      method: 'GET',
    })
    .then((response) => { return response.json() })
    .then((result) => { 
      if(result.status === 200) {
        this.userData = result.data.filter(element => {
          return element.email !== this.currentUserMail
        })
        this.duplicateUserList = this.userData
      }
    })
  }, 
  
  methods: {
    openUserDetails (data) {
      this.$router.push({name: 'UserDetails', params: data})
      //this.$router.params = data
    },

    filterBooks: function (e) {
      let val = e.target.value
      this.userData = this.duplicateUserList.filter(function(data){
        return data.name.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
    },
  }
}
</script>

<style scoped>
#userList {
  overflow-y: scroll;
  height: 89vh;
  width: 100%;
}

#userList .outer-div {
  margin: 20px 12px;
}

#userList .inputElement {
  width: 200px;
  height: 20px;
  border-style: groove;
  border-radius: 5px;
  padding: 5px;
}

#userList .inner-div {
  padding: 20px 20px;
  border-radius: 14px;
  border: 1px solid gray;
  margin-top: 15px;
  margin-bottom: 15px;
}

#userList .searchDiv {
  margin: 6px 13px;
  display: flex; 
  justify-content: space-between;
}

#userList .table-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px ;
  border-bottom-color: gray;
  border-bottom-style: double;
}

#userList .name{
  width: 350px;
  text-transform: capitalize;
}

#userList .thBooksTaken {
  width: 150px;
}

#userList .thReturnedBooks {
  width: 150px;
}

#userList .booksTaken {
  width: 150px;
  text-align: center;
}

#userList .returnedBooks {
  width: 200px;
  text-align: center;
}

#userList .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0px ;
  border-bottom: 1px solid gray;
}

#userList .row:last-child {
  border-bottom: none;
}
</style>