export class SectionIndicator{
    constructor(arr, pos){
        this.arr = arr;
        this.pos = pos;
    }

    getCurrentPosition(){
        return this.pos;
    }

    getLength(){
        return this.arr.length;
    }

    next(){
        if(this.pos === this.arr.length-1){
            return this.pos;
        }
        this.pos+=1;
        return this.pos;
    }

    prev(){
        if(this.pos === 0){
            return this.pos;
        }
        this.pos-=1;
        return this.pos;
    }
}