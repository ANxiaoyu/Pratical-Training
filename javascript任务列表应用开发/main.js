// 0 获取元素
var taskList = document.getElementById('taskList');
var taskItems = document.getElementsByTagName('li');
var addBtn = document.getElementsByClassName('add-task-btn')[0];

// 1 为已经存在的任务添加删除按钮
for(var i =0; i<taskItems.length; i++){
    appendRemoveTaskBtn(taskItems[i]);
}

// 2 给添加任务按钮注册事件
addBtn.onclick =  addTask;
function addTask() {
    // 2.1 获取文本输入框的内容
    var taskInput = document.getElementById('taskInput');
    var taskValue = taskInput.value;
    // 2.2 创建li标签，并把文本输入框的内容添加给li标签
    var li = document.createElement('li');
    var taskNode = document.createTextNode(taskValue);
    li.appendChild(taskNode);

    // 2.3 判断任务内容是否为空，若空弹出提示，若不为空把li添加到列表中 文本输入框清空
    if(taskValue.trim() === '') {
        taskInput.value = '';
        taskInput.focus();
        alert('请输入任务名称');
        return;
    }else {
        taskList.appendChild(li);
        taskInput.value = '';
    }
    appendRemoveTaskBtn(li);
}

// 3 删除任务
function appendRemoveTaskBtn(li) {
    // 3.1 创建删除按钮
    var removeBtn = document.createElement('span');
    var removeBtnTxt = document.createTextNode('x');
    removeBtn.className = 'remove-task';
    removeBtn.appendChild(removeBtnTxt);
    // 3.2 给删除按钮注册事件。删除li标签
    removeBtn.onclick = function() {
        var parentEle = this.parentElement;
        taskList.removeChild(parentEle);
    }
    li.appendChild(removeBtn);
}