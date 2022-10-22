
function showRecords(){
    $('.app-body').empty();
    var rows = ``;
    readAll((err, result) => {
        if(err){
            toastr.error(err);
        }else{
            if(result.length == 0){
                toastr.warning('No tasks.');
            }else{
                result.forEach((value, index) => {
                    rows += `
                        <div class="app-item px-4 pb-2">
                                <div class="d-flex flex-row align-items-center border border-light text-white rounded-3 que" data-id='${value.id}'>
                                    <div class="item">
                                        <i class="fas fa-clipboard-check"></i>
                                    </div>
                                    <div>
                                        <input type="email" class="app form-control text-white" id="taskname" data-id='${value.id}' value="${value.task_name}" readonly>
                                    </div>
                                    <div class="item text-success" id="btnEdit" data-id='${value.id}' data-state='0'>
                                        <i class="fas fa-edit icon"></i>
                                    </div>
                                    <div class="item text-danger" id="btnDelete" data-id='${value.id}'>
                                        <i class="fas fa-trash-alt icon"></i>
                                    </div>
                                </div>
                        </div>
                    `;
                    });
                $('.app-body').html(rows);
            }
            
        }
    });
}

$(document).ready(function(){
    showRecords();
    // setTimeout((e)=>{
        
    // }, 3000);
});

$(document).on('click', '#btnSave', function(e){
    e.preventDefault();
    var taskname = $('#taskname').val();
    if(taskname == ''){
        toastr.warning('Please write name of the task.');
        $('#createBox').modal('show');
    }else{
        create(taskname, (err, result) => {
            if(err){
                toastr.error(err);
            }else{
                toastr.success(result);
                showRecords();
            }
        });
    }
    
});

$(document).on('click', '#btnDelete', function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    deleteTask(id, (err, result) => {
        if(err){
            toastr.error(err);
        }else{
            toastr.success(result);
            showRecords();
        }
    });

});

$(document).on('click', '.btnUpdate', function(e){
    var id = $(this).data('id');
    var selectDom = $(`input[data-id=${id}]`);
    var data = selectDom.val();
    updateTask(data, id, (err, result) => {
        if(err){
            toastr.error(err);
        }else{
            toastr.success(result);
            showRecords();
        }
    });
});

$(document).on('click', '#btnEdit', function(e){

    var id = $(this).data('id');
    var selectDom = $(`input[data-id=${id}]`);
    var que = $(`.que[data-id=${id}]`);

    selectDom. attr('readonly', false);
    que.removeClass('border-light');
    que.addClass('border-warning');
    selectDom.focus();

    $(this).empty();
    $(this).html('<i class="fas fa-save text-white icon"></i>');


    $(this).addClass('btnUpdate');
    
});
