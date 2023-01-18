// Node class
class Node{
    constructor(data){
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

//Doubly Linked List class
class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insertAtHead(data){
        let newNode = new Node(data);
        newNode.next = this.head;
         //to handle no element in linked list
        if(!this.head){
            this.tail = newNode;
        }
        else{
            this.head.prev = newNode;
        }
        this.head = newNode;
        this.length++;
    }

    insertAtTail(data){
        if(!this.tail){//when there is no node in linked list
            this.insertAtHead(data);
            return;
        }
        let newNode = new Node(data);
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
    }

    insertAtGivenPosition(data, position){
        //invalid position
        if(position < 1 || position > this.length+1){
            console.log("provided position is wrong");
            return;
        }

        //insert at head
        if(position == 1){
            this.insertAtHead(data);
            return;
        }
        //insert at tail
        if(position == this.length+1){
            this.insertAtTail(data);
            return;
        }
        let count =1;
        let curr =  this.head;

        while(count<position-1){
            count++;
            curr = curr.next;
        }

        let newNode = new Node(data);
        newNode.prev = curr;
        newNode.next = curr.next;
        curr.next = newNode;
        newNode.next.prev = newNode;
        this.length++;
    }

    deleteAtHead(){
        // no node in linked list
        if(!this.head){
            console.log("no nodes in the linked list");
            return;
        }
        //single node in the linked list
        if(this.head.next == null){
            this.tail = null;
        }
        let curr = this.head;
        this.head = this.head.next;
        curr = null;
        this.length--;
    }

    printLinkedListData(){
        let current = this.head;
        while(current != null){
            console.log(current.data);
            current = current.next;//move to next node 
        }
    }
}


let dll = new DoublyLinkedList();

// dll.insertAtHead(10);
// dll.insertAtHead(20);
// dll.insertAtHead(30);
// dll.insertAtTail(100);
// dll.insertAtGivenPosition(200, 3);
dll.deleteAtHead();
dll.printLinkedListData();
