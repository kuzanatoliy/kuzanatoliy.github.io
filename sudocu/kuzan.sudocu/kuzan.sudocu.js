var kuzanSudocu = (function($){
    var name = 'kuzan.sudocu';
    var id = 'kuzan.sudocu';
    var matrix = [];
    
    var sudocu = {};
    
    var node = null;
    var elements = null;
    var errors = null;
    
    const COUNT = 81;
    const COUNT_GROUP = 9;
    const COUNT_LITLE_GROUP = 3;
    
    sudocu.create = function(data){
        if(data.id != null){
            id = data.id;
        }
        if(data.name != null){
            name = data.name;
        }
        matrix = data.matrix;
        create();
        setInputValues();
    }
    
    var create = function(){
        var selId = `#${id}`;
        node = $(selId);
        node.after(`<figure id = "${id}"  name = "${name}"></figure>`);
        node.remove();
        node = $(selId);
        eachElement(createInput);
        elements = $(`figure${selId} > input`);
    }
    
    var createInput = function(index){
        node.append(`<input type="text" name="${index}"></input>`);
    }
    
    var eachElement = function(func){
        for(var i = 0; i < COUNT; i++){
            func(i);
        }
    }
    
    var setInputValue = function(index){
        var element = elements.eq(index);
        if(matrix[index] > 0){
            element.val(matrix[index]);
        }
        else{
            element.val('');
        }
    }
    
    var setInputValues = function(){
        eachElement(setInputValue);
    }
    
    return sudocu;
}(jQuery));