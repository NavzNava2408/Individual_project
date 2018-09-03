<template>
    <div>
        {{x}}
        {{x*y}}
        <input type="text" v-model="x">
       
        <v-btn @click="getData">get</v-btn>
         {{Accounts}}






    </div>
</template>

<script>
import axios from 'axios'



export default {
name:"test",
data(){
    return{
        x: 7,
        y: 20,
    
        Accounts:[]

    }
},

methods: {
    getData(){
        axios.get('http://localhost:8080/user/findAll')
      .then((response) => {
        console.log(response.data);
        this.Accounts = response.data;
      })
    }

}


}
</script>

<style>

</style>
