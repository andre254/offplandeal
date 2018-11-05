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
                        <form class="form-horizontal">

                        <div class="form-group">
                            <label for="inputName" class="col-sm-12 control-label">Title</label>
                            <div class="col-sm-12">
                            <input type="text"  class="form-control"  name="name" id="inputName" placeholder="Name">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="inputName" class="col-sm-12 control-label">Slug</label>
                            <div class="col-sm-12">
                            <input type="text"  class="form-control" name="slug" id="inputName" placeholder="Name" readonly>
                            </div>
                        </div>

                        <!-- /.card-header -->
                        <div class="card-body">
                            <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                <label>Author</label>
                                <select class="form-control select2" style="width: 100%;">
                                    <option selected="selected">Alabama</option>
                                    <option>Alaska</option>
                                    <option>California</option>
                                    <option>Delaware</option>
                                    <option>Tennessee</option>
                                    <option>Texas</option>
                                    <option>Washington</option>
                                </select>
                                </div>
                                
                                <!-- /.form-group -->
                            </div>
                            <!-- /.col -->
                            <div class="col-md-6">
                                <div class="form-group">
                                <label>Status</label>
                                <select class="form-control select2" style="width: 100%;">
                                    <option selected="selected">Alabama</option>
                                    <option>Alaska</option>
                                    <option>California</option>
                                    <option>Delaware</option>
                                    <option>Tennessee</option>
                                    <option>Texas</option>
                                    <option>Washington</option>
                                </select>
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
                                <input type="file" name="photo" class="form-input">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="inputName" class="col-sm-12 control-label">Blog Content</label>
                            <div class="col-sm-12">
                            <tinymce id="d1" v-model="content"></tinymce>
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
                    title: '',
                    slug: '',
                    content : '',
                })
            }
        },
        mounted() {
            console.log('Component mounted.')
        }, 
        
        methods: {

            getFeaturedImage() {
                //let photo = (this.form.photo.length > 100) ? this.form.photo : "img/profile/"+ this.form.photo ;
                //return photo;
                return "img/featured/"+ this.form.photo;
            },
        }
    }
</script>


