<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <h2>Add Account</h2>
            </v-flex>
             <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                    label="First Name"
                    v-model="first_name"
                    required>
                </v-text-field>
            </v-flex>
             <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                    label="Last Name"
                    v-model="last_name"
                    required>
                </v-text-field>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                    label="Email"
                    v-model="email"
                    v-bind:rules="emailRules"
                    required>
                </v-text-field>
            </v-flex>
             <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                    label="Notes"
                    v-model="notes"
                    v-bind:type="'notes'"
                    required>
                </v-text-field>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
                <v-btn color=primary v-on:click="addToAPI">Create Account</v-btn>
                <v-btn v-on:click="login">Login</v-btn>
            </v-flex>
        </v-layout>
            <v-snackbar>
                :timeout="6000"
                :top="true"
                v-model="showAlert"
                >
                    <!-- {{message}} -->
                    {{message}}
                    <v-btn flat color="pink" v-on:click="showAlert=false">Close</v-btn>
            </v-snackbar>
    </v-container>
</template>

<script>
export default{
    data(){

        first_name: ''
        last_name: ''
        email: ''
        notes: ''

         return {
        Account: {first_name: '', last_name: '', email:'', notes: ''},

      },
             {
            showAlert: false,
            message: '', 
            email: '',
            emailRules: [
                v => !!v || 'Email is Required'
            ],

            password: '',
            passwordRules: [
                v => !!v || 'Email is Required'
            ]

        }
        
    },

    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        },
        loginError () {
            return this.$store.getters.loginError
        }
    },


    methods: {
        Add: function(){
            const vm = this
            if (vm.firstname === ' '){
                vm.showAlert = true
                vm.message = 'Name is required'
            } else {
                this.$router.push({path:'/'})
            }
            
        },
        login: function(){
            const vm = this
            if (vm.password === 'test111') {
                this.$router.push({path: '/'})
            } else {
                vm.showAlert = true
                vm.message = 'email or password is invalid!'
            }
             
        },

            addToAPI(){
      let newAccount = {
        first_name: this.Account.first_name,
        last_name: this.Account.last_name,
        email: this.Account.email,
        notes: this.Account.notes
      }
      console.log(newAccount);
      axios.post('http://localhost:8080/user', newAccount)

    }
        // login: function(){
        //     const vm = this
        //     const payload = {
        //         email: this.email,
        //         password: this.password
        //     }
        //     this.$store.dispatch('logInUser', payload)
        //     .then (() => {
        //         if (vm.isLoggedIn) {
        //             this.$router.push({path: '/'})
        //         } else {
        //             vm.showAlert = true
        //         }
        //     })
        // }
    }

}

</script>

<style>

</style>