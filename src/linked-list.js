const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        // this._nodes = [];
    }

    append(data) {
        let aNode = new Node( data, null, null );

        if( this.isEmpty() ){
            this._head = aNode;
        } else {
            aNode.prev = this._tail ;
            aNode.next = null;
            this._tail.next = aNode;
        }

        this._tail = aNode;
        
        this.length +=1;

        return this;
    }

    head() {
        if( this._head) { return this._head.data ; } else { return null; }
    }

    tail() {
        if( this._tail ){ return this._tail.data; } else { return null ; }
    }

    nodeAt( index ){
        // console.log( '#nodeAt, data storage @_nodes: \n', this._nodes );
        if( ( index > ( this.length - 1) ) || index < 0 ){
            throw new Exception( '#at(): Invalid @index !' );
        } else {
            let currentIndex = 0;
            let curNode = this._head;
            while( currentIndex < index ){
                curNode = curNode.next;
                currentIndex += 1;
            }
            return curNode;
        }
    }

    at(index) {
        if( this.nodeAt( index ) ){
            return this.nodeAt( index ).data ;
        }
    }

    insertAt(index, data) {

        var insertNode, beforeNode, nextNode;
        insertNode = new Node( data, null, null );

        if( index == this.length || this.length == 0 ){

            this.append( data );
        } else if( 
            index > 0 && 
            index < this.length &&
            this.length 
        ){
            beforeNode = this.nodeAt( index -1 );
            nextNode = this.nodeAt( index );

            insertNode.prev = beforeNode;
            insertNode.next = nextNode;

            beforeNode.next = insertNode;
            nextNode.prev = insertNode;

            insertNode.prev = beforeNode;
            insertNode.next = nextNode;

            beforeNode.next = insertNode;
            nextNode.prev = insertNode;

            this.length +=1;

        } else if( index == 0  && this.length ){
            beforeNode = null;
            nextNode = this._head;

            insertNode.next = nextNode;
            nextNode.prev = insertNode;

            insertNode.next = nextNode;
            nextNode.prev = insertNode;

            this.length +=1;
        }

        return this;
    }

    isEmpty() {
        return ( this.length == 0 ) ;
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }

    deleteAt(index) {

        let currentNode = this._head;
        let beforeNode = null, nodeToDelete = null, nodeDeleted = null, nextNode = null;
        let corrIndex = index+1;


        if( !( this.length == 0 || corrIndex < 1 || corrIndex > this.length ) ){

            if( this.length == 1){
                this.clear();
                this.length = 1;
             } else {

                if( corrIndex == 1 ){
                    this._head = currentNode.next;
                    if( !this._head ){
                        this._head.prev = null;
                    } else {
                        this._tail = null;
                    }

                } else if ( corrIndex == this._length ) {
                    this._tail = this.tail.prev;
                    this._tail.next = null;
                } else {
                    let currentIndex = 1;
                    while( currentIndex < index ){
                        currentNode = currentNode.next;
                        currentIndex +=1;
                    }
                    beforeNode = currentNode.prev;
                    nodeToDelete = currentNode;
                    nextNode = currentNode.next;

                    beforeNode.next = nextNode;
                    nextNode.prev = beforeNode;
                    nodeDeleted = nodeToDelete;
                    nodeToDelete = null;
                }
            }

            this.length -=1;

        }

        return this;
    }

    reverse() {
        let newList = new LinkedList();
        
        for( let currentIndex = this.length -1; currentIndex >=0; currentIndex-- ){
            newList.append( this.at( currentIndex ) );
        }

        this.clear();

        for( let currentIndex = 0; currentIndex < newList.length; currentIndex++ ){
            this.append( newList.at( currentIndex ) );
        }

        return this;
    }

    indexOf(data) {
        let currentIndex = 0;
        let currentNode = this._head;
        let foundIndex = -1;

        while( 
            currentIndex < this.length && 
            foundIndex == -1 
        ){
            if( this.at( currentIndex ) == data ){
                foundIndex = currentIndex;
            }
            currentIndex += 1;
        }

        return foundIndex;
    }
}

module.exports = LinkedList;
