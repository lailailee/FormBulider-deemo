jQuery(function ($) {
    let formJson = [];
    let ResFormJson = [];
    let options = {
        disabledActionButtons: ['save'],
        i18n: {
            locale: 'zh-CN'
        }
    };
    let fb = $(document.getElementById('fb-editor')).formBuilder(options);

    let fr;
    $('#getBuilderData').click(() => {
        let json = fb.actions.getData('json', true)
        console.log('form的结构:')
        console.log(json)
        formJson = json;
        ResFormJson = json
        createRender(formJson, 'fb-rendered-form')
    });
    //根据json构建渲染表
    let createRender = (json, id) => {
        var container = document.getElementById(id);
        var formData = formJson
        var formRenderOpts = {
            container,
            formData,
            dataType: 'json'
        };
        $(container).formRender(formRenderOpts);
    }

    let valueobj = {}

    $('#getRenderData').click(() => {
        var formData = new FormData(document.getElementById('fb-rendered-form'));
        console.log('Can submit: ', document.getElementById('fb-rendered-form').checkValidity());
        if (!(document.getElementById('fb-rendered-form').checkValidity())) {
            alert('请检查你的填写！')
        } else {
            for (var pair of formData.entries()) {
                valueobj[pair[0]] = pair[1]

            }
            formJson = $.parseJSON(formJson)
            console.log('form的结构:')
            console.log(formJson)
            console.log('填写的值:')
            console.log(valueobj)


            for (let obj of formJson) {
                switch (obj.type) {
                    case "checkbox-group":
                        for (let item of obj.values) {
                            if (item.value == valueobj[obj.name]) {
                                item.selected = true
                            }
                        }
                        break;
                    case "radio-group":
                        for (let item of obj.values) {
                            if (item.value == valueobj[obj.name]) {
                                item.selected = true
                            }
                        }
                        break;
                    case "select":
                        for (let item of obj.values) {
                            if (item.value == valueobj[obj.name]) {
                                item.selected = true
                            }
                        }
                        break;
                    case "date":
                        obj.value = valueobj[obj.name]
                        break;
                    case "number":
                        obj.value = valueobj[obj.name]
                        break;
                    case "hidden":
                        obj.value = valueobj[obj.name]
                        break;
                    case "textarea":
                        obj.value = valueobj[obj.name]
                        break;
                    case "text":
                        obj.value = valueobj[obj.name]
                        break;
                    case "header"://没有
                        break;
                    case "paragraph"://没有
                        break;
                    case "autocomplete"://无法添加
                        break;
                    case "file"://无法添加
                        obj.value = valueobj[obj.name]
                        break;
                }
            }
            console.log('添加了value后的form:')
            console.log(formJson)
            createRender(formJson, 'fb-renderedJustShow-form')
            formJson = ResFormJson
            valueobj = {}
            $('#fb-renderedJustShow-form input').attr('disabled', 'disabled')
            $('#fb-renderedJustShow-form textarea').attr('disabled', 'disabled')
            $('#fb-renderedJustShow-form select').attr('disabled', 'disabled')
        }

    });



});