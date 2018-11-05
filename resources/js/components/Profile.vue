<style>
.widget-user-header {
    background-position: center center;
    background-size: cover;
    height: 250px;
}
    
</style>


<template>
    <div class="container">
        <div class="row">
            <!-- start leftside -->
            <div class="col-md-3 mt-3">
                <!-- Profile Image -->
                <div class="card card-primary card-outline">
                <div class="card-body box-profile">
                    <div class="text-center">
                    <img class="profile-user-img img-fluid img-circle"
                        :src="getProfilePhoto()"
                        alt="user avatar">
                    </div>

                    <h3 class="profile-username text-center" >{{ this.form.name }}</h3>

                    <p class="text-muted text-center">{{ this.form.type | upText }}</p>

                </div>
                <!-- /.card-body -->
                </div>
                <!-- /.card -->
                <!-- About Me Box -->
                <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">About Me</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <strong><i class="fa fa-book mr-1"></i> Biography</strong>

                    <p class="text-muted">
                    {{ this.form.bio }}
                    </p>

                    <hr>

                    <strong><i class="fa fa-mail mr-1"></i> Email</strong>

                    <p class="text-muted">{{ this.form.email }}</p>

                    <hr>

                </div>
                <!-- /.card-body -->
                </div>
                <!-- /.card -->
            <!-- end leftside -->
            </div>

            <!-- start rightside -->
            <!-- /.col -->
            <div class="col-md-9 mt-3">
                <div class="card card-primary card-outline">
                <div class="card-header p-2">
                    <ul class="nav nav-pills">
                    <!-- <li class="nav-item"><a class="nav-link" href="#timeline" data-toggle="tab">Timeline</a></li> -->
                    <li class="nav-item"><a class="nav-link active" href="#settings" data-toggle="tab">Settings</a></li>
                    </ul>
                </div><!-- /.card-header -->
                <div class="card-body">
                    <div class="tab-content">
                    
                    <div class="active tab-pane" id="settings">
                        <form class="form-horizontal">
                        <div class="form-group">
                            <label for="inputName" class="col-sm-12 control-label">Full Name</label>

                            <div class="col-sm-10">
                            <input type="text" v-model="form.name" class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" name="name" id="inputName" placeholder="Name">
                            <has-error :form="form" field="name"></has-error>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail" class="col-sm-12 control-label">Email</label>

                            <div class="col-sm-10">
                            <input type="email" v-model="form.email" name="email" class="form-control" :class="{ 'is-invalid': form.errors.has('email') }" id="inputEmail" placeholder="Email">
                            <has-error :form="form" field="email"></has-error>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="inputExperience" class="col-sm-12 control-label">Biography</label>

                            <div class="col-sm-10">
                            <textarea class="form-control" v-model="form.bio" name="bio" :class="{ 'is-invalid': form.errors.has('bio') }" id="inputExperience" placeholder="Experience"></textarea>
                            <has-error :form="form" field="bio"></has-error>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="photo" class="col-sm-12 control-label">Profile Photo</label>
                            <div class="col-sm-12">
                                <input type="file" @change="updateProfile" name="photo" class="form-input">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="inputEmail" class="col-sm-12 control-label">Password *(leave it blank if you don't want to change)</label>

                            <div class="col-sm-10">
                            <input type="text" v-model="form.password" name="password" class="form-control" :class="{ 'is-invalid': form.errors.has('password') }" id="inputEmail" placeholder="password">
                            <has-error :form="form" field="password"></has-error>
                            </div>
                        </div>

                        
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                            <button @click.prevent="updateInfo" type="submit" class="btn btn-danger">Update <i class="fas fa-user-plus fa-fw"></i></button>
                            </div>
                        </div>
                        </form>
                    </div>
                    <!-- /.tab-pane -->
                    </div>
                    <!-- /.tab-content -->
                </div><!-- /.card-body -->
                </div>
                <!-- /.nav-tabs-custom -->
            </div>
            <!-- /.col -->
            <!-- start rightside -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: new Form({
                    id : '',
                    name : '',
                    email : '',
                    password : '',
                    type : '',
                    bio : '',
                    photo : '',
                })
            }
        },

        mounted() {
            console.log('Component mounted.')
        },

        methods: {

            getProfilePhoto() {
                let photo = (this.form.photo.length > 100) ? this.form.photo : "img/profile/"+ this.form.photo ;
                return photo;
                //return "img/profile/"+ this.form.photo;
            },

            updateInfo() {
            this.$Progress.start(); //progress bar
               this.form.put('api/profile')
               .then(() => {
                   Fire.$emit("AfterCreate");
                   //success
                    swal(
                        'Updated!',
                        'Your information has been updated.',
                        'success'
                        )
                        this.$Progress.finish();
                       
               })
          
               .catch(() => {
                   this.$Progress.fail();
               });
            },

            updateProfile(e) {
                //console.log('uploading..') this is an event listener to see if the function will run
                let file = e.target.files[0];
                // console.log(file);
                let reader = new FileReader();
                if (file['size'] < 2111775) {
                    reader.onloadend = (file) => {
                    // console.log('RESULT', reader.result)
                    this.form.photo = reader.result;
                    }
                    reader.readAsDataURL(file);
                } else {
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Your file size should be less than 2MB!',
                    })
                }
                Fire.$emit('AfterCreate'); 
                
            }
        },

        created() {
            axios.get("api/profile")
            .then(({ data}) => (this.form.fill(data)));
        }
    }
</script>
