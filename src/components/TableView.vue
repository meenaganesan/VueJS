<template>
  <div id="tableView">
    <div class="name">
      <div class="bookTitle">{{tableData.book.title}}</div>
      <div class="bookAuthor"> by {{tableData.book.author}}</div>
    </div>
    <div class="flexStyle" v-if="type === 'myHistory'">
      <div>
        <div class="thPicked"> Book Picked On:{{tableData.pickedTime}}</div>
        <div class="thReturned">Book Returned On:{{tableData.returnedTime ? tableData.returnedTime: tableData.expectedReturnDate}}</div>
      </div>  
      <div class="thReturned" v-if="tableData.fine">Fine: {{tableData.fine}}</div>
      <div class="thReturned" v-if="tableData.lostBy">Lost On: {{tableData.returnedTime}}</div>
    </div>
    <div class="flexStyle" v-else-if="type === 'booksTaken'">
      <div class="flexStyle" v-if="new Date(tableData.expectedReturnDate) < new Date()">
        <div class="thReturned">Expected Return Date: {{tableData.expectedReturnDate}}</div>
        <button class="submitButton" @click="returnFunction(tableData.book.id)">Return</button>
        <button class="submitButton" @click="lostFunction(tableData.book.id)">Lost</button>
      </div>
      <div class="flexStyle" v-else-if="new Date(tableData.expectedReturnDate) >= new Date()">
        <div class="thPicked"> Book Picked On:{{tableData.pickedTime}}</div>
        <div class="thReturned">Expected Return Date:{{tableData.expectedReturnDate}}</div>
      </div>  
    </div>  
    <div class="flexStyle" v-else>
      <div class="thPicked"> Book Picked On:{{tableData.pickedDate}}</div>
      <div class="thReturned">Taken By:{{tableData.takenBy}}</div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'TableView',
  props: {
    tableData: Object,
    returnFunction: Function,
    lostFunction: Function,
    type: String
  }
}
</script>

<style scoped>

#tableView {
  display: flex;
  margin: 0px 8px;
  justify-content: center;
  align-items: center;
}

#tableView .flexStyle {
  display: flex;
  align-items: center;
}

#tableView .bookTitle {
	font-size: 16px;
  font-weight: bold;
	max-height: 20px;
	overflow: hidden;
	text-overflow: ellipsis;
}

#tableView .bookAuthor{
	font-size: 15px;
}

#tableView .name {
  width: 500px;
  padding: 7px 0px;
}

#tableView .thPicked{
  width: 250px;
  font-size: 15px;
  padding: 7px 0px;
}

#tableView .thReturned {
  font-size: 15px;
  width: 300px;
  padding: 7px 0px;
}

#tableView .submitButton {
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