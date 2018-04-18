/*
var APP_ID = 'qAEe1K0zhc6KqDYI3oIn2EP6-gzGzoHsz';
var APP_KEY = '3ljsiNuRGGzjQ5yacumAJOjB';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


var query = new AV.Query('Message');
query.find().then(function (messages) {
    console.log(messages)
    let array=messages.map((item)=>item.attributes)
    array.forEach((item)=>{
        let li=document.createElement('li')
        li.innerText=`${item.name}:${item.content}`
    let messageList=document.querySelector('#messageList')
    messageList.appendChild(li)

    })

}).then(function(messages) {
    // 更新成功
}, function (error) {
    // 异常处理
});
let myForm=document.querySelector('#postForm')
myForm.addEventListener('submit',function (e) {
    e.preventDefault()
    let content=myForm.querySelector('input[name=content]').value
    let name=myForm.querySelector('input[name=name]').value
    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        'name':name,
        'content':content
    }).then(function (value) {

        let li=document.createElement('li')


        li.innerText=`${value.attributes.name}:${value.attributes.content}`
        console.log( li.innerText)
        let messageList=document.querySelector('#messageList')
        messageList.appendChild(li)
        console.log('value')
        console.log(value)
        myForm.querySelector('input[name=content]').value=' '
    })

})
*/
!function () {
    var model={
        init:function () {
            var APP_ID = 'qAEe1K0zhc6KqDYI3oIn2EP6-gzGzoHsz';
            var APP_KEY = '3ljsiNuRGGzjQ5yacumAJOjB';

            AV.init({appId: APP_ID, appKey: APP_KEY})
            
        },
        fetch:function () {
            var query = new AV.Query('Message');
            return query.find()
        },
        save:function (name,content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
           return  message.save({
                'name':name,
                'content':content
            })
            
        }
    }
    var view=document.querySelector('section.message')
    var controller={
        view:null,
        model:null,
        messageList:null,
        init:function (view,model) {
            this.view=view
            this.model=model
            this.messageList=view.querySelector('#messageList')
            this.form=view.querySelector('form')
            this.model.init()
            this.loadMessages()
           // this.saveMessage()
            this.bindEvents()

            
        },
        loadMessages:function () {
            this.model.fetch().then(
                function(messages){
                let array = messages.map((item)=> item.attributes )
            array.forEach((item)=>{
                let li = document.createElement('li')
                li.innerText = `${item.name}: ${item.content}`
            this.messageList.appendChild(li)
        })
        }
        )

        },
        bindEvents:function () {
            this.form.addEventListener('submit', (e)=>{
                console.log('bind')
                console.log(this)

                e.preventDefault()
                this.saveMessage()

            })
        },
        saveMessage:function () {
            let myForm = this.form
            console.log('saveMessage')
            console.log(this)
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save(name, content).then(function(object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
                console.log(object)
            })
        }


    }
    controller.init(view, model)

}.call()
