class HashTable{
    constructor(size=5, maxLoadFactor=0.8){
        this.maxSize = size;
        this.hashTable = new Array(this.maxSize);
        this.currSize = 0;
        this.MAX_LOAD_FACTOR = maxLoadFactor; 
    }

    #hash(key){
        let hashValue = 0;
        //sum(Ascii(key[i]) * 2^i) % tableSize
        for(let i=0; i<key.length; i++){
            hashValue += key[i].charCodeAt(0) * Math.pow(2, i);
        }
        let index = hashValue % this.maxSize;
        return index;
    }

    rehash(){
        let temp = this.hashTable;
        this.currSize = 0;
        this.maxSize = this.maxSize * 2;
        this.hashTable = new Array(this.maxSize);
        for(let row=0; row<temp.length; row++){
            if(!temp[row]){
                continue;
            }
            for(let col = 0; col<temp[row].length; col++){
                this.set(temp[row][col][0],temp[row][col][1]);
            }
        }
    }

    set(key, value){
        const idx = this.#hash(key);
        //if this value exists
        if(this.hashTable[idx]){
            for(let i=0; i<this.hashTable[idx].length; i++){
                if(this.hashTable[idx][i][0] == key){
                    this.hashTable[idx][i].push([key, value]);
                    return;
                }
            }
            this.hashTable[idx].push([key, value]);
        }
        else{
            this.hashTable[idx] = [];
            this.hashTable[idx].push([key, value]);
        }
        this.currSize++;
        const loadFactor = this.currSize/this.maxSize;
        if(loadFactor >= this.MAX_LOAD_FACTOR){
           this.rehash();
        }
    }

    get(key){
        const idx = this.#hash(key);
        return this.hashTable[idx];
    }

    remove(key){
        const idx = this.#hash(key);
        if(this.hashTable[idx] && this.hashTable[idx].length){
            this.hashTable[idx] = [];
            this.currSize--;
        }
    }
}



let ht = new HashTable(1, 0.5);
ht.set("Fruit", "orange");
console.log(ht.get("Fruit"));
ht.set("vege", "potato");
console.log(ht.get("vege"));
ht.set("Fruit", "grapes");
console.log(ht.get("Fruit"));