function Sudoku(data){
    var id = data.id || "sudoku";
    var baseMatrix = data.matrix || 
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        
    var model = {
        createMatrix: function(matrix){
            return matrix.map((item) => {
                if(item == 0){
                    return "";
                }
                else{
                    return item;
                }
            });
        },
        
        createErrors: function(matrix){
            return matrix.map((item) => {
                return 0;
            });
        },
        
        getErrorValue: function(i, ii){
            var index = ii ? ii + i * 9 : i;
            return model.errors[index];
        },
        
        getMatrixValue: function(i, ii){
            var index = ii ? ii + i * 9 : i;
            return model.matrix[index];
        },
        
        setMatrixValue: function(value, i, ii){
            var index = ii ? ii + i * 9 : i;
            if(value != model.matrix[index]){
                model.makeErrors(index, model.matrix[index], model.dekError);
                model.matrix[index] = value;
                model.makeErrors(index, model.matrix[index], model.inkError);
            }
        },
        
        inkError: function(index, h){
            model.errors[index]+=h;
        },
        
        dekError: function(index, h){
            model.errors[index]-=h;
        },
        
        rowErrors: function(index, value, func){
            var i = index - index % 9;
            var k = i + 9;
            var c = 0;
            for(; i < k; i++){
                if(i == index){
                    continue;
                }
                if(model.matrix[i] == value){
                    func(i,1);
                    c++;
                }
            }
            func(index, c);
        },
        
        columnErrors: function(index, value, func){
            var c = 0;
            for(var i = index % 9; i < 81; i += 9){
                if(i == index){
                    continue;
                }
                if(model.matrix[i] == value){
                    func(i,1);
                    c++;
                }
            }
            func(index, c);
        },
        
        regionErrors: function(index, value, func){
            var i = index - index % 27 + parseInt(index / 3) % 3 * 3;
            var c = 0;
            for(var ii = 0; ii < 3; ii++, i += 6){
                for(var iii = 0; iii < 3; iii++, i++){
                    if(i == index){
                        continue;
                    }
                    if(model.matrix[i] == value){
                        func(i,1);
                        c++;
                    }
                }
            }
            func(index, c);
        },
        
        makeErrors: function(index, value, func){
            if(value > 0){
                model.rowErrors(index, value, func);
                model.columnErrors(index, value, func);
                model.regionErrors(index, value, func);
            }
        }
    }
    
    var view = {
        active: function (item, i, array){
            item.classList.add("active");
        },

        deactive: function deactive(item, i, array){
            item.classList.remove("active");
        },
        
        forEach: function(collection, func){
            for(var i = 0; i < collection.length; i++){
                func(collection[i], i, collection);
            }
        },
        
        settingInput: function(item, i, collection){
            if(model.errors[item.dataset.number] > 0){
                item.classList.add("error");
            }
            else{
                item.classList.remove("error");
            }
        },
        
        settingInputs: function(row, column, region){
            view.forEach(document.querySelectorAll(`#${id} input[data-row-number="${this.dataset.rowNumber}"]`),view.settingInput);
            view.forEach(document.querySelectorAll(`#${id} input[data-column-number="${this.dataset.columnNumber}"]`),view.settingInput);
            view.forEach(document.querySelectorAll(`#${id} input[data-region-number="${this.dataset.regionNumber}"]`),view.settingInput);
        },
        
        input: function (event){
            event.preventDefault();
            var key = event.keyCode;
            if((key > 48 && key < 58) || (key > 96 && key < 106)){
                this.value = event.key;
                model.setMatrixValue(this.value, this.dataset.number);
                view.settingInputs.call(this,this.dataset.rowNumber,this.dataset.columnNumber,this.regionNumber);
            }
            else if(key == 48 || key == 96){
                this.value = "";
                model.setMatrixValue(this.value, this.dataset.number);
                view.settingInputs.call(this,this.dataset.rowNumber,this.dataset.columnNumber,this.regionNumber);
            }
        },
        

        blur: function(event){
            view.forEach(document.querySelectorAll('input.active'),view.deactive);
        },

        focus: function(event){
            view.forEach(document.querySelectorAll(`#${id} input[data-row-number="${this.dataset.rowNumber}"]`),view.active);
            view.forEach(document.querySelectorAll(`#${id} input[data-column-number="${this.dataset.columnNumber}"]`),view.active);
            view.forEach(document.querySelectorAll(`#${id} input[data-region-number="${this.dataset.regionNumber}"]`),view.active);
        },
        
        move: function(event){
            switch(event.keyCode){
                case 39:
                    var elem = this;
                    while(true){
                        elem = elem.nextElementSibling;
                        if(elem.tagName == "BR"){
                            document.querySelector(`#${id} input[data-row-number="${this.dataset.rowNumber}"]:not([disabled])`).focus();
                            break;
                        }
                        if(!elem.disabled){
                            elem.focus();
                            break;
                        }
                    }
                    break;
                case 37:
                    var elem = this;
                    while(true){
                        elem = elem.previousElementSibling;
                        if(elem.tagName == "BR"){
                            var elems = document.querySelectorAll(`#${id} input[data-row-number="${this.dataset.rowNumber}"]:not([disabled])`);
                            elems[elems.length - 1].focus();
                            break;
                        }
                        if(!elem.disabled){
                            elem.focus();
                            break;
                        }
                    }
                    break;
                case 38:
                    var elem = this;
                    while(true){
                        for(var i = 0; i < 10; i++){
                            elem = elem.previousElementSibling;
                            if(elem == null){
                                var elems = document.querySelectorAll(`#${id} input[data-column-number="${this.dataset.columnNumber}"]:not([disabled])`);
                                elems[elems.length - 1].focus();
                                break;
                            }
                        }
                        if(elem != null && elem.disabled){
                            continue;
                        }
                        if(elem != null){
                            elem.focus();
                        }
                        break;
                    }
                    break;
                case 40:
                    var elem = this;
                    while(true){
                        for(var i = 0; i < 10; i++){
                            elem = elem.nextElementSibling;
                            if(elem == null){
                                document.querySelector(`#${id} input[data-column-number="${this.dataset.columnNumber}"]:not([disabled])`).focus();
                                break;
                            }
                        }
                        if(elem != null && elem.disabled){
                            continue;
                        }
                        if(elem != null){
                            elem.focus();
                        }
                        break;
                    }
                    break;
            }
        },
        
        create: function(){
            var content = document.createDocumentFragment();
            for(var i = 0; i < 9; i++){
                content.appendChild(document.createElement("br"));
                for(var  ii = 0; ii < 9; ii++){
                    var elem = document.createElement("input");
                    elem.type = "text";
                    elem.dataset.number = ii + i * 9;
                    elem.dataset.rowNumber = i;
                    elem.dataset.columnNumber = ii;
                    elem.dataset.regionNumber = parseInt(i/3)*3 + parseInt(ii/3);
                    elem.addEventListener("focus",view.focus);
                    elem.addEventListener("blur",view.blur);
                    elem.addEventListener("keydown",view.input);
                    elem.addEventListener('keydown',view.move);
                    content.appendChild(elem);
                }
            }
            content.appendChild(document.createElement("br"));
            document.getElementById(id).appendChild(content);
        },
        
        setting: function(){
            var elems = document.querySelectorAll(`#${id} input`);
            baseMatrix.forEach((item, i, arr) => {
                if(item > 0){
                    elems[i].disabled = true;
                    elems[i].value = item;
                }
                else{
                    elems[i].disabled = false;
                    elems[i].value = "";
                }
            });
        }
    }
    
    view.create();
    view.setting();
    model.matrix = model.createMatrix(baseMatrix);    
    model.errors = model.createErrors(baseMatrix);
}