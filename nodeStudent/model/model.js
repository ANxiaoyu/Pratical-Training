var students = [];

exports.mainpage = function(req,res) {
    res.render("students",{
        "student": students
    })
}

exports.allStudent = function(req,res) {

}

exports.addStudent = function(req,res) {
    res.render("addstudent");
}

exports.editStudent = function(req,res) {
    console.log(req.params.stuId);
    /**
     * 我们拿到学生编号之后，开始遍历students数组，去拿当前的stuId和当前遍历出来的对象的stuId进行对比，
     * 如果对比成功，则获取当前student对象在students数组里面索引值，
     * 然后开始通过res.render("editstudent.ejs",{传递当前学生对象到修改页面})，使用学生对象的信息将文本框的value进行渲染
     * <input type="number" name="stuId" id="stuId" value="<%=student.stuId%>">
     */
    var id = req.params.stuId;
    var student;
    for(var index in students) {
       if(students[index].stuId == id){
           student = students[iindex];
           break;
       } 
    }
    res.render("editstudent",{
        "student":student
    })
    // res.send("这是学生信息修改业务");
}

exports.editSaveStudent = function(req,res) {
    var id = req.body.stuId;
    for(var index in students){
        if(students[index].stuId == id){
            students[index].stuName = req.body.stuName;
             students[index].stuAge = req.body.stuAge;
             break;
        }
    }
    res.redirect("/"); //学生信息添加之后，让浏览器跳转到主页面
}

exports.saveStudent = function(req,res) {
    var student = {
        "stuId": req.body.stuId,
        "stuName": req.body.stuName,
        "stuAge": req.body.stuAge
    }
    students.push(student);
    res.redirect("/"); //学生信息添加之后，让浏览器跳转到主页面
}

exports.deleteStudent = function(req,res) {
    console.log(req.params.stuId);
    /**
     * 我们拿到学生编号之后，开始遍历students数组，去拿当前的stuId和当前遍历出来的对象的stuId进行对比，
     * 如果对比成功，则获取当前student对象在students数组里面索引值，
     * 然后通过students.splice(index,1)删除，删除完成之后再次进行页面跳转res.redirect("/");
     */
    var id = req.params.stuId;
    for(var index in students) {
        if(students[index].stuId == id){
            students.splice(index,1);
            break;
        }
    }
    res.redirect("/");
    // res.send("这是学生信息删除业务");
}