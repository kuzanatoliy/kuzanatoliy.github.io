var kuzanSudocu = (function($){
    //Идентификатор и имя для модуля по умолчанию
    //These default id and name
    var id = 'kuzanSudocu';
    var name = 'kuzanSudocu';
    
    //Объект модуля
    //The module object
    var sudocu = {};
    
    //Дополнительные данные для работы модуля
    //The additional data for the module
    var node = null;
    var elements = null;
    var matrix = null;
    
    //Константы размеров групп полей
    //The constants for the field groups
    const ELEMENT_COUNT = 81;
    
    //Функция создания игры
    //The function creating the game
    sudocu.create = function(data){
        if(data.id != null){
            id = data.id;
        }
        node = $(`#${id}`);
        node.after(`<figure id="${id}" name="${name}"></figure>`);
        node.remove();
        node = $(`#${id}`);
        create();
        createNewGame(data.matrix);
    }
    
    //Функция изменяет значение элемнта с номером index
    //The function changing the value of element with id = index
    var setElementValue = function(index){
        var element = elements.eq(index);
        var value = matrix[index];
        if(value > 0){
            element.val(value);
        }
        else{
            element.val('');
        }
    }
    
    //Функция создания полей
    //The function creating the fields
    var create = function(){
        node = $(`#${id}`);
        eachElements(createElement);
        elements = node.children('input');
    }
    
    //Функция создания поля
    //The function creating the field
    var createElement = function(index){
        node.append(`<input type="text" name="${index}">`);
    }
    
    //Функция производит возврат к начальному состоянию
    //The function returns to the start stage of the game
    var createNewGame = function(values){
        matrix = values;
        eachElements(setElementValue);
    }
    
    //Функция применяет заданное действие ко всем полям
    //The function applies making to the each elements
    var eachElements = function(func){
        for(var i = 0; i < ELEMENT_COUNT; i++){
            func(i);
        }
    }
    
    //Возврат объекта модуля
    //This is returning the module object
    return sudocu;
}(jQuery));