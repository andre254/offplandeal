<template>
    <div class="container">
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="card card-primary card-outline">
                    <div class="card-header">
                    <h3 class="card-title">Locations List</h3>
                    <div class="card-tools">
                        <button class="btn btn-success" @click= "newModal">Add New <i class="fas fa-user-plus fa-fw"></i></button>
                    </div>
                    
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                        <th>Location Name</th>
                        <th>Slug</th>
                        <th>Description</th>
                        <th>Modify</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="location in locations" :key="location.id">
                            <td>{{ location.name }}</td>
                            <td>to be added</td>
                            <td>{{location.description}}</td>
                            <td>
                                <a href="#" @click="editModal(location)"><i class="fa fa-edit blue"></i> Edit</a> / 
                                <a href="#" @click="deleteLocation(location.id)"><i class="fa fa-trash red"></i> Delete</a>
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
                <h5 class="modal-title" v-show="editmode" id="addNewLabel">Update Location</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <form @submit.prevent=" editmode ? updateLocation() : createLocation()">
                <div class="modal-body"> 
                    <div class="form-group">
                        <label>Location Name</label>
                        <input v-model="form.name" type="text" name="name"
                            placeholder="Downtown Dubai"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                        <has-error :form="form" field="name"></has-error>
                    </div>
                </div>

                

                <div class="modal-body"> 
                    <div class="form-group">
                        <label>Slug</label>
                        <input type="text" name="slug" :value="form.name | slugify"
                            placeholder="downtown-dubai" 
                            class="form-control" :class="{ 'is-invalid': form.errors.has('slug') }" readonly>
                        <input v-model="form.slug" type="hidden" name="slug">
                        <has-error :form="form" field="slug"></has-error>
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputExperience" class="col-sm-12 control-label">Description</label>
                    <div class="col-sm-12">
                    <textarea class="form-control" v-model="form.description" name="description" :class="{ 'is-invalid': form.errors.has('description') }" id="inputExperience" placeholder="Location Description"></textarea>
                    <has-error :form="form" field="description"></has-error>
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
                locations : {},
                form: new Form({
                    id : '',
                    name : '',
                    slug : '',
                    description: '',
                })
            }
        },
        methods: {
            updateLocation(id) {
                this.$Progress.start();
                
                this.form.put('api/location/'+this.form.id)
                .then(() => {
                    //success
                    $('#addNew').modal('hide')
                    swal(
                        'Updated!',
                        'The location information has been updated.',
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

            editModal(location) {
                this.editmode = true,
                this.form.reset();
                $('#addNew').modal('show')
                this.form.fill(location)
            },
            deleteLocation(id){
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
                            this.form.delete('api/location/'+id)
                            .then(() => {
                                swal(
                                'Deleted!',
                                'The location has been deleted.',
                                'success'
                                )
                                Fire.$emit('AfterCreate');
                            }).catch(() => {
                                swal("failed!", "Oops, something is not right!", "warning");
                            });
                        }

                    
                    })
            },
            loadLocations() {
                axios.get("api/location").then(({ data }) => (this.locations = data.data));
            },

            createLocation() {
                this.$Progress.start();

                this.form.post('api/location')
                .then(() => {
                Fire.$emit('AfterCreate');
                $('#addNew').modal('hide')

                toast({
                    type: 'success',
                    title: 'Location created successfully'
                    })

                this.$Progress.finish();

                })
                .catch(() => {

                })
            }
        },
        created() {
            this.loadLocations();
            //this is for refreshing the page after every 3 secs
                // setInterval( () => this.loadLocations(), 3000);
            Fire.$on('AfterCreate', () => {
                this.loadLocations();
            });
        }
    }
</script>
