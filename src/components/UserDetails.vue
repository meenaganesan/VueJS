<template>
  <div id="userDetails">
    <div class="header">User Details of {{data.name}}</div>
    <div class="table-header">Books Taken</div>
    <div v-if="data.booksTaken.length > 0">
      <div class="row" v-for="(i, index) in data.booksTaken" :key="index">
        <TableView :tableData="i" :returnFunction="returnBookWithFine" :lostFunction="lostBook" type="booksTaken"></TableView>
      </div>
    </div>  
    <div v-else class="booksNotAvailable">Data Not available</div>  
    <div class="table-header">Returned Books</div>
    <div v-if="data.returnedBooks.length > 0">
      <div class="row" v-for="(i, index) in data.returnedBooks" :key="index">
        <TableView :tableData="i" type="myHistory"></TableView>
      </div>
    </div>
    <div v-else class="booksNotAvailable">Data Not available</div>  
  </div>
</template>

<script>
import TableView from "@/components/TableView.vue";
export default {
  name: "UserDetails",

  methods: {
    returnBookWithFine (bookId) {
      fetch('http://localhost:5000/bookList/returnBook', {
        method: 'POST',
        headers: {
          'Content-Type' :'application/json'
        },
        body: JSON.stringify({
          bookId: bookId,
          emailId: this.data.email,
          collectFine: true
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
					this.$router.go(-1)		
				}
			})
    },

    lostBook(bookId) {
      fetch('http://localhost:5000/bookList/bookLost', {
        method: 'POST',
        headers:  {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          bookId: bookId,
          emailId: this.data.email
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
					this.$router.go(-1)		
				}
      })
    }
  },

  created() {
    this.data = this.$router.currentRoute.params;
  },
  components: {
    TableView
  }
};
</script>

<style scoped>
#userDetails .row {
  display: flex;
  align-items: center;
  border-radius: 12px;
  width: 1060px;
  border: 1px solid gray;
  margin-bottom: 10px;
  margin: 12px;
}

#userDetails .booksNotAvailable {
  text-align: center;
  font-size: 22px;
  margin-top: 25px;
}

#userDetails .table-header {
  margin: 12px;
  font-size: 17px;
}

#userDetails .header {
  margin: 12px;
  font-size: 20px;
}

#userDetails {
  overflow-y: scroll; 
	height: 89vh; 
	width: 100%;
}
</style>