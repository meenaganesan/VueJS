<template>
  <div id="myHistory">
    <div class="searchDiv">
      <input class="inputElement" type="text" placeholder="Search book" @keyup="filterBooks"/>
    </div>
    <div v-if="historyData.length > 0">
      <div class="row" v-for="(data, index) in historyData" :key="index">
        <TableView :tableData="data" :type="'myHistory'"></TableView>
      </div>
    </div>  
    <div v-else class="booksNotAvailable">Book is not available</div>
  </div>  
</template>

<script>
import TableView from '@/components/TableView'
export default {
  name: 'MyHistory',

  data() {
    return {
      historyData: JSON.parse(localStorage.getItem('data')).returnedBooks,
      duplicateHistoryData: JSON.parse(localStorage.getItem('data')).returnedBooks
    }
  },

  methods: {
    filterBooks: function (e) {
      let val = e.target.value
      this.historyData = this.duplicateHistoryData.filter(function(data){
        return data.book.title.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
    },

  },
  components: {
    TableView
  }
}
</script>

<style scoped>
#myHistory {
  overflow-y: scroll;
  height: 89vh;
  width: 100%;
  /* overflow-x: hidden; */
}

#myHistory .booksNotAvailable {
  text-align: center;
  font-size: 22px;
  margin-top: 25px;
}

#myHistory .row {
  display: flex;
  align-items: center;
  border-radius: 12px;
  width:1060px;
  border: 1px solid gray;
  margin-bottom: 10px;
  margin: 12px;
}

#myHistory .inputElement {
  width: 200px;
  height: 20px;
  border-style: groove;
  border-radius: 5px;
  padding: 5px;
}

#myHistory .searchDiv {
  margin: 15px 15px;
  display: flex; 
  justify-content: space-between;
}
</style>