<template>
    <div class="container">
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="card card-primary card-outline">
                    <div class="card-header">
                    <h3 class="card-title">Developers List</h3>
                    <div class="card-tools">
                        <button class="btn btn-success" @click= "newModal">Add New <i class="fas fa-user-plus fa-fw"></i></button>
                    </div>
                    
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                        <th>Developer Name</th>
                        <th>Slug</th>
                        <th>Description</th>
                        <th>Logo</th>
                        <th>Modify</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="developer in developers" :key="developer.id">
                            <td>{{ developer.name }}</td>
                            <td>{{ developer.slug }}</td>
                            <td>{{developer.description | truncate(20, '...')}}</td>
                            <td>{{developer.logo}}</td>
                            <td>
                                <a href="#" @click="editModal(developer)"><i class="fa fa-edit blue"></i> Edit</a> | 
                                <a href="#" @click="deleteDeveloper(developer.id)"><i class="fa fa-trash red"></i> Delete</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    <!-- /.card-body -->
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" v-show="!editmode" id="addNewLabel">Add New</h5>
                <h5 class="modal-title" v-show="editmode" id="addNewLabel">Update Developer</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <form @submit.prevent=" editmode ? updateDeveloper() : createDeveloper()">
                <div class="modal-body"> 
                    <div class="form-group">
                        <label>Developer Name</label>
                        <input v-model="form.name" type="text" name="name"
                            placeholder="Emaar"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                        <has-error :form="form" field="name"></has-error>
                    </div>
                </div>
               
                <div class="modal-body"> 
                    <div class="form-group">
                        <label>Slug</label>
                        <input v-model="form.slug" type="text" name="slug" 
                            placeholder="downtown-dubai" 
                            class="form-control" :class="{ 'is-invalid': form.errors.has('slug') }">
                        <has-error :form="form" field="slug"></has-error>
                    </div>
                </div>

                <div class="form-group">
                    <label for="photo" class="col-sm-12 control-label">Developer Logo</label>
                    <div class="col-sm-12">
                        <input type="file" @change="updateLogo" name="logo" class="form-input">
                    </div>
                </div>

                 <!-- Profile Image -->
                <div class="card card-primary card-outline">
                <div class="card-body box-profile">
                    <div class="text-center">
                    <img class="profile-user-img img-fluid img-circle"
                        :src="getDeveloperLogo()"
                        alt="user avatar">
                    </div>

                </div>
                <!-- /.card-body -->
                </div>

                <div class="form-group">
                    <label for="inputExperience" class="col-sm-12 control-label">Description</label>
                    <div class="col-sm-12">
                    <textarea class="form-control" rows="20" v-model="form.desc" name="desc" :class="{ 'is-invalid': form.errors.has('desc') }" id="inputExperience" placeholder="Developer Description"></textarea>
                    <has-error :form="form" field="desc"></has-error>
                    </div>
                </div>
                
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="submit" v-show="editmode" class="btn btn-success">Update <i class="fas fa-user-plus fa-fw"></i></button>
                        <button type="submit" v-show="!editmode" class="btn btn-primary">Create <i class="fas fa-user-plus fa-fw"></i></button>
                    </div>
            </form>
                </div>
        </div>
        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return{
                editmode : false,
                developers : {},
                form: new Form({
                    id : '',
                    name : '',
                    slug : '',
                    desc: '',
                    logo: '',
                })
            }
        },
        

         watch: {
                'form.name'() {
                    this.form.slug = this.$options.filters.slugify(this.form.name)
                },
            },

        methods: {
            
            getDeveloperLogo() {
                let logo = (this.form.logo.length > 100) ? this.form.logo : "img/developer/"+ this.form.logo ;
                return logo;
                //return "img/profile/"+ this.form.photo;
            },

            updateLogo(e) {
                //console.log('uploading..') this is an event listener to see if the function will run
                let file = e.target.files[0];
                // console.log(file);
                let reader = new FileReader();
                if (file['size'] < 2111775) {
                    reader.onloadend = (file) => {
                    // console.log('RESULT', reader.result)
                    this.form.logo = reader.result;
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
                
            },

            updateDeveloper(id) {
                this.$Progress.start();
                
                this.form.put('api/developer/'+this.form.id)
                .then(() => {
                    //success
                    $('#addNew').modal('hide')
                    swal(
                        'Updated!',
                        'The developer information has been updated.',
                        'success'
                        )
                        this.$Progress.finish();
                       Fire.$emit('AfterCreate');

                })

                .catch(() => {
                    this.$Progress.fail();
                });
            },
            newModal() {
                this.editmode = false,
                this.form.reset();
                $('#addNew').modal('show')
            },

            editModal(developer) {
                this.editmode = true,
                this.form.reset();
                $('#addNew').modal('show')
                this.form.fill(developer)
            },

            deleteDeveloper(id){
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        //send request to the server
                        if (result.value) {
                            this.form.delete('api/developer/'+id)
                            .then(() => {
                                swal(
                                'Deleted!',
                                'The developer has been deleted.',
                                'success'
                                )
                                Fire.$emit('AfterCreate');
                            }).catch(() => {
                                swal("failed!", "Oops, something is not right!", "warning");
                            });
                        }

                    
                    })
            },
            loadDevelopers() {
                axios.get("api/developer").then(({ data }) => (this.developers = data.data));
            },

           

            createDeveloper() {
                this.$Progress.start();
                
                this.form.post('api/developer')
                //this.form.slug = this.$options.filters.slugify(this.form.name)
                .then(() => {
                Fire.$emit('AfterCreate');
                $('#addNew').modal('hide')

                toast({
                    type: 'success',
                    title: 'Developer created successfully'
                    })

                this.$Progress.finish();

                })
                .catch(() => {

                })
            }
        },
        created() {
            this.loadDevelopers();
            //this is for refreshing the page after every 3 secs
                // setInterval( () => this.loadDevelopers(), 3000);
            Fire.$on('AfterCreate', () => {
                this.loadDevelopers();
            });
        }
    }
</script>
