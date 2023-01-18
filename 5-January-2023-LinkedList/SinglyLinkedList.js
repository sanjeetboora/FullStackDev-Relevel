// Node class
class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

//Singly Linked List class
class SinglyLinkedList{
    constructor(){
        this.head = null;
        this.length = 0;
    }

    insertAtHead(data){
        let newNode = new Node(data); //Create new node
        newNode.next = this.head; //point newNode's next at head
        this.head = newNode;//Update head to new node
        this.length++;
    }

    insertAtTail(data){
        //when linkedList is empty
        if(this.head == null){
            this.insertAtHead(data);
            return;
        }

        //create the new node
        let newNode = new Node(data);

        //find the last node;
        let curr = this.head;
        while(curr.next != null){
            curr = curr.next;
        }
        //update last node's next to null
        curr.next = newNode;
        this.length++;
    }

    insertAtGivenPosition(data, pos){
        if(pos < 0 ||pos > this.length){
            console.log("position out of bound of current linked list");
            return;
        }
        else if(pos == 0){ //insert at head
            this.insertAtHead(data);
            return;
        }
        else if(pos == this.length){//insert at tail
            this.insertAtTail(data);
            return;
        }

         //create the new node
        let newNode = new Node(data);
        //find element at given poistion
        let count = 1;
        let currNode = this.head;
        while(count < pos){
            count++;
            currNode = currNode.next;
        }

        //insert new node at given position
        newNode.next = currNode.next;
        currNode.next=newNode;
        this.length++;
    }


    deleteAtHead(){
        if(!this.head){
            console.log("No elements are present in the linkedlist");
            return;
        }
        let curr = this.head;
        this.head = this.head.next;
        curr = null;
        this.length--;
    }

    deleteAtTail(){
        //when no node in ll or only one node in ll 
        if(!this.head || !this.head.next){
            this.deleteAtHead();
            return;
        }
        
        let curr = this.head;
        while(curr.next.next){
            curr = curr.next;
        }
        curr.next = null;
        this.length--;
    }
    //assuming position starts from 1
    deleteAtGivenPosition(position){
        //invalid position
        if(position < 1 || position > this.length){
            console.log("given position is invalid");
            return;
        }
        //deletion at head
        if(position == 1){
            this.deleteAtHead();
            return;
        }
        // deletion at tail
        if(position == this.length){
            this.deleteAtTail();
            return;
        }
        let count = 1;
        let curr = this.head;
        while(count < position-1){
            count++;
            curr = curr.next;
        }

        let nodeToBeDeleted = curr.next;
        curr.next = curr.next.next;
        nodeToBeDeleted = null;
        this.length--;
    }

    printLinkedList(){
        let current = this.head;
        while(current != null){
            console.log(current);
            current = current.next;//move to next node 
        }
    }

    printLinkedListData(){
        let current = this.head;
        while(current != null){
            console.log(current.data);
            current = current.next;//move to next node 
        }
    }
}

const ll = new SinglyLinkedList();
 ll.insertAtHead(10);
ll.insertAtHead(20);
ll.insertAtTail(30);
ll.insertAtGivenPosition(50, 0);
ll.insertAtGivenPosition(100, 4);
ll.insertAtGivenPosition(70, 3);
// ll.printLinkedList();
//ll.printLinkedListData();
// ll.deleteAtHead();
//ll.deleteAtTail();
ll.deleteAtGivenPosition(2);
ll.printLinkedListData();


