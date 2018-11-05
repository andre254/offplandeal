<template>
    <div class="container">
         <div class="row">
            
            <!-- start leftside -->
            <!-- /.col -->
            <div class="col-md-9 mt-3">
                <div class="card card-primary card-outline">
                <div class="card-header">
                    <h3 class="card-title">New Blog</h3>
                </div><!-- /.card-header -->
                <div class="card-body">
                    <div class="tab-content">
                    
                    <div class="active tab-pane" id="settings">
                        <form @submit.prevent="createBlog" class="form-horizontal">

                            <div class="form-group">
                                <label for="inputName" class="col-sm-12 control-label">Title</label>
                                <div class="col-sm-12">
                                <input type="text"  class="form-control" v-model="form.title" :class="{ 'is-invalid': form.errors.has('title') }" name="title" id="inputName" placeholder="Name">
                                <has-error :form="form" field="title"></has-error>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="inputName" class="col-sm-12 control-label">Slug</label>
                                <div class="col-sm-12">
                                <input type="text" class="form-control" v-model="form.slug" :class="{ 'is-invalid': form.errors.has('slug') }" name="slug" id="inputName" placeholder="Name" readonly>
                                <has-error :form="form" field="slug"></has-error>
                                </div>
                            </div>

                            <!-- /.card-header -->
                            <div class="card-body">
                                <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Author</label>
                                        <select class="form-control select2" v-model="form.author" :class="{ 'is-invalid': form.errors.has('author') }" name="author" style="width: 100%;">
                                            <option value="">Select Author</option>
                                            <option>Alaska</option>
                                            <option>California</option>
                                            <option>Delaware</option>
                                            <option>Tennessee</option>
                                            <option>Texas</option>
                                            <option>Washington</option>
                                        </select>
                                        <has-error :form="form" field="author"></has-error>
                                    </div>
                                    <!-- /.form-group -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-6">
                                    <div class="form-group">
                                    <label>Status</label>
                                    <select class="form-control select2" v-model="form.status" name="status" :class="{ 'is-invalid': form.errors.has('status') }" style="width: 100%;">
                                        <option value="">Select Status</option>
                                        <option value="1">Pending Review</option>
                                        <option value="2">Publish</option>
                                        <option value="3">Deleted</option>
                                    </select>
                                    <has-error :form="form" field="status"></has-error>
                                    </div>
                                    <!-- /.form-group -->
                                </div>
                                <!-- /.col -->
                                </div>
                                <!-- /.row -->
                            </div>

                            <div class="form-group">
                                <label for="photo" class="col-sm-12 control-label">Featured Image</label>
                                <div class="col-sm-12">
                                    <input type="file" @change="updateFeaturedImage" :class="{ 'is-invalid': form.errors.has('photo') }" name="photo" class="form-input">
                                    <has-error :form="form" field="photo"></has-error>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="inputName" class="col-sm-12 control-label">Blog Content</label>
                                <div class="col-sm-12">
                                <tinymce id="d1" v-model="form.content" name="content" :class="{ 'is-invalid': form.errors.has('content') }"></tinymce>
                                <has-error :form="form" field="content"></has-error>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                <button @click.prevent="updateInfo" type="submit" class="btn btn-success">Post <i class="fas fa-plus fa-fw"></i></button>
                                <!-- <button @click.prevent="updateInfo" type="submit" class="btn btn-danger">Update <i class="fas fa-plus fa-fw"></i></button> -->
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
            <!-- start leftside -->

            <!-- start rightside -->
            <div class="col-md-3 mt-3">
                <!-- About Me Box -->
                <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Image Preview</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <img class="img-fluid mb-3" :src="getFeaturedImage()" alt="featured img">

                </div>
                <!-- /.card-body -->
                </div>
                <!-- /.card -->
            <!-- end rightside -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: new Form({
                    id : '',
                    title : '',
                    slug : '',
                    status : '',
                    author : '',
                    content : '',
                    photo : '',
                    tags : '',
                    category : '',
                })
            };
        },
        mounted() {
            console.log('Component mounted.')
        }, 
        
        methods: {

            createBlog() {
                this.form.post('api/blog');
            },

            getFeaturedImage() {
                //let photo = (this.form.photo.length > 100) ? this.form.photo : "img/profile/"+ this.form.photo ;
                //return photo;
                return "img/featured/"+ this.form.photo;
            },
            updateFeaturedImage(e) {
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
        }
    }
</script>
