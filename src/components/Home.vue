<template>
  <v-app id="inspire">
  
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="red"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 500px" class="ml-0 pl-3">
        <span class="hidden-sm-and-down">ACCOUNTS MANAGER!</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon @click="home()" large>
        <v-avatar size="32px" tile>
          <img
            src="https://www.iconspng.com/clipart/tamil/tamil.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
     

    <v-btn class="add_btn"
      fab 
      color="pink"
      dark
      fixed
      direction="top"
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Add Account
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="First Name"
                  v-model="first_name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex >
              <v-text-field
                
                placeholder="Last Name"
                v-model="last_name"
              ></v-text-field>
            </v-flex>
           
            <v-flex >
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
                v-model="email"
                
              >

              </v-text-field>
                 
              
            </v-flex>
           
          
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
                v-model="notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false, resetForm()">Close</v-btn>
          <v-btn flat @click="addToAPI">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <h1>
    <v-text-field
        flat
        solo-inverted
        hide-details
        autocomplete
        multiple
        chips
        required
        :item="Accounts" 
        cache-items
        filter
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        v-model="element"
      ></v-text-field>
       <v-btn @click="search"> <v-icon>search</v-icon></v-btn>
       <v-btn @click="bawse(), resetForm()">Get All</v-btn>
      </h1>


  <v-data-table :headers="headers" :items="Accounts" hide-actions class="elevation-1">
    <template slot="items" slot-scope="props"> 
      
        <td>{{ props.item.firstname }}</td>
        <td class="text-xs-center">{{ props.item.surname }}</td>
        <td class="text-xs-center">{{ props.item.email }}</td>
        <td class="text-xs-center">{{ props.item.notes }}</td>
        <td class="justify-center layout px-0"> </td>
        
        
        <v-btn icon class="mx-0" @click="dbox = !dbox, setForm(props.item)">
            <v-icon color="teal">edit</v-icon>
        </v-btn>
        <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
        </v-btn>
        
    </template>
    </v-data-table> 

     <v-dialog v-model="dbox" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Edit Account
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  
                  v-model="first_name"

                > </v-text-field>
              </v-layout>
            </v-flex>
            <v-flex >
              <v-text-field
                
                placeholder="Last Name"
                v-model="last_name"
              ></v-text-field>
            </v-flex>
           
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
                v-model="email"
              ></v-text-field>
            </v-flex>
          
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
                v-model="notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dbox = false, resetForm()">Close</v-btn>
          <v-btn flat @click="editAPI(id)">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


      


     </v-container>
    </v-content>
  </v-app>
</template>

<script>
import FindAccount from './FindAccount.vue'
import EditAccount from './EditAccount.vue'
import axios from 'axios'




  export default {

    computed: {
      isLoggedIn(){
        return this.$store.getters.isLoggedIn
    
      },

      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }


    },
    data: () => ({

      firstname: '',
      first_name: '',
      lastname: '',
      last_name: '',
      email: '',
      notes: '',
      id: '',
      element: '',


    

        Accounts: [],

    
       



      dialog: false,
      dbox: false,
      headers: [
        {
        text: 'First Name',
        align: 'center',
        value: 'name'
    },
    { text: 'Last Name', value: 'surname' },
    { text: 'Email', value: 'email' },
    { text: 'Notes', value: 'notes' },
    { text: 'Actions', value: 'name', sortable: false }
],
accounts: [],
editedIndex: -1,
editedItem: {
    name: '',
    surname: '',
    email: '',
    notes: '',
},
defaultItem: {
    name: '',
    surname: '',
    email: '',
    notes: '',
},
listPrimitive: null,


      
    }),
    props: {
      source: String
    },
    methods: {
      addToAPI(){
      const newAccount = new FormData()
      newAccount.append("firstname", this.first_name)
      newAccount.append("surname", this.last_name)
      newAccount.append("email", this.email)
      newAccount.append("notes", this.notes)
      console.log(newAccount);
      axios.post('http://localhost:8080/user/add', newAccount)
      .then(response =>{
        this.bawse()
      })
      .catch(e => alert(e))

    },

    search(){
       this.firstname = this.element 
      axios.get('http://localhost:8080/user/find?firstname=' + this.firstname)
      .then(response =>{
        this.Accounts = response.data
      })
      .catch(e => alert(e))
    },

    bawse(){
        axios.get('http://localhost:8080/user/findAll')
      .then((response) => {
        console.log(response.data);
        this.Accounts = response.data;
        
        
      })
    },

    home(){
      this.$router.push({path: '/'})

    },

    deleteItem(item){
      axios.delete('http://localhost:8080/user/'+ item.id)
      .then((response)=>{
        this.bawse()
      })
      .catch(e => alert(e))
      

    },

    editItem(item){

    },

    editAPI(id){
      const newAccount = new FormData()
      newAccount.append("id", this.id)
      newAccount.append("firstname", this.first_name)
      newAccount.append("surname", this.last_name)
      newAccount.append("email", this.email)
      newAccount.append("notes", this.notes)
      axios.post('http://localhost:8080/user/update', newAccount)
      .then(response =>{
        this.bawse()
      })
      .catch(e => alert(e))
      
    },

    setForm(item){
      this.id = item.id
      this.first_name = item.firstname
      this.last_name = item.surname
      this.email = item.email
      this.notes = item.notes
    },

    resetForm(){
      this.first_name = ''
      this.last_name = ''
      this.email = ''
      this.notes = ''
      this.element = ''
    
      }
       
    },

    mounted(){
      axios.get('http://localhost:8080/user/findAll')
      .then((response) => {
        console.log(response.data);
        this.Accounts = response.data;
        
        
      })

    }
  
    
    }
</script>

<style>
.add_btn{
top: 750px;
right: 50px;
}
</style>