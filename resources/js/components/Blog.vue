<template>
    <div class="container">
         <div class="row mt-3">
            <div class="col-md-12">
                <div class="card card-primary card-outline">
                    <div class="card-header">
                    <h3 class="card-title">Blog List</h3>
                    <div class="card-tools">
                        <button class="btn btn-success" @click= "newModal">Add New <i class="fas fa-user-plus fa-fw"></i></button>
                    </div>
                    
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        


                    </div>
                    <!-- /.card-body -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
