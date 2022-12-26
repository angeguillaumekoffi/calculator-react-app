
let registredOperationFactories = {};

registredOperationFactories["add"] = class Addition{
    constructor(operandes){
        this.operandes = operandes
    }

    calculate(){
        this.result = this.operandes.value1 + this.operandes.value2
        return Number(this.result);
    }
};

registredOperationFactories["mul"] = class Multiplication{
    constructor(operandes){
        this.operandes = operandes;
    }
    
    calculate(){
        this.result = this.operandes.value1 * this.operandes.value2;
        return Number(this.result);
    }
};

registredOperationFactories["div"] = class Division{
    constructor(operandes){
        this.operandes = operandes;
    }

    calculate(){
        if (Number(this.operandes.value2) !== 0){
            this.result = this.operandes.value1 / this.operandes.value2;
            return Number(this.result);
        }else{
            return this.operandes.value2
        }
    }
};

registredOperationFactories["sub"] = class Substitution{
    constructor(operandes){
        this.operandes = operandes;
    }

    calculate(){
        this.result = this.operandes.value1 - this.operandes.value2;
        return Number(this.result);
    }
};


class OperationFactory{
    constructor(operation, operandes){
        return new registredOperationFactories[operation](operandes);
    }
};

export default OperationFactory;