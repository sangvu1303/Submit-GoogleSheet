document.querySelector('#submit-form').onsubmit = function(e) {
    e.preventDefault(); //không cho reset website sau khi submit

    //truy cập thành phần
    let msgObject = document.querySelector('.msg'); //message
        msgObject.innerText = '';

    let fullNameObject = document.querySelector('input[name="fullname"]');
    let emailObject = document.querySelector('input[name="email"]');
    let phoneObject = document.querySelector('input[name="phone"]');

    //lấy giá trị
    let fullname = fullNameObject.value;
    let email = emailObject.value;
    let phone = phoneObject.value;
    //console.log(fullname);

    //about validate 
        //reset validate
        let requiredObject = document.querySelectorAll('.required');
        if (requiredObject.length>0){
            requiredObject.forEach(function(item){
                item.innerText = ' ';
            })
        }
        //validate
        let error = {}
        if (fullname.trim()==''){
            error['fullname'] = 'Không được để trống';
            fullNameObject.parentElement.querySelector('.required').innerText = error['fullname'];     
        }
        if (email.trim()==''){
            error['email'] = 'Không được để trống';
            emailObject.parentElement.querySelector('.required').innerText = error['email'];     
        }
        if (phone.trim()==''){
            error['phone'] = 'Không được để trống';
            phoneObject.parentElement.querySelector('.required').innerText = error['phone'];     
        }
        if (Object.keys(error).length==0){
            //không có lỗi --> lấy và gửi dữ liệu
            let data = {
                'entry.189044527':fullname, //tùy từng form sheet sẽ có entry khác nhau 
                'entry.1921041377':email,
                'entry.435364288':phone
            }
            //chuyển đổi string
            let queryString = new URLSearchParams(data);
                queryString = queryString.toString();

            //thích thì thêm :)))
            msgObject.innerHTML = '<div class="alert alert- text-center">Đang xử lý dữ liệu...</div>';

            //post dữ liệu    
            let xhr = new XMLHttpRequest();
            xhr.open("POST", 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScPbf6ihhQHxoBIr52X8LpmRAAkz6PldaPtj2GFZHmWkAWr-Q/formResponse', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                msgObject.innerHTML = '<div class="alert alert-success text-center">Gửi dữ liệu thành công</div>';

            //reset dữ liệu sau khi submit
            fullNameObject.value = ' ';
            emailObject.value = ' ';
            phoneObject.value = ' ';
            xhr.send(queryString);
        }else{
            msgObject.innerHTML = '<div class="alert alert-danger text-center">vui lòng kiểm tra dữ liệu</div>';
        }
}
