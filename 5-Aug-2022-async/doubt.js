var arrowObject = {
    name: 'arrowObject',
    printName: () => {
        this.prop= "xyz";
      console.log(this);
    }
  };
  
arrowObject.printName();

//   function BankAccount(customerName, balance = 0) {
//       this.customerName = customerName;
//       this.accountNumber = Date.now();
//       this.balance = balance;
//     //console.log(this);
//       this.withdraw = () => {
//           console.log("withdraw",this);
//       };
//   }


//   {customerName
//     accountNumber
//     balance
//     withdraw}

// let x = new BankAccount("Shasanka");
// x.withdraw();
// //console.log(x);
// function fun(){
//     console.log(this);
// }
// fun();