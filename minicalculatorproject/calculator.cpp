#include <iostream>
using namespace std;
int zen_mode(){
    int x;
    cin>>x;
    string operation;
    cin>>operation;
    if(operation=="+"){
        int y;
        cin>>y;
        cout<<(x + y);
    }
    else if(operation=="-"){
        int y;
        cin>>y;
        cout<<(x-y);
    }
    else if(operation=="*"){
        int y;
        cin>>y;
        cout<<(x*y);
    }
    else if(operation=="/"){
        int y;
        cin>>y;
        cout<<(x/y);
    }
    else if(operation=="!"){
        int factorial = 1;
    for(int i=1;i<=x;i++){
        factorial *= i;
    }
    cout<< x << " ! " << " = "<< factorial <<endl;

    }
    else if(operation=="!!"){
        int zeroes=0;
    int originalnumber = x;
    while( x > 0){  
         zeroes += x / 5;
        x =x/5;
    }
    cout<< originalnumber <<" !! ="<< zeroes <<endl;

    }
    return 0;
}
int normal_mode(){
    cout <<"\t1. add  two number" << endl;
cout << "\t2. sub two number" << endl;
cout << "\t3. mul two number" << endl;
cout << "\t4. divide two number" << endl;
cout << "\t5. factorial  of a number" << endl;
cout << "\t6. number zeroes at the of the factorial" << endl;
cout << "\t7. zen mode " << endl;
cout<<"\t8. anything else to exit" << endl;
cout<<"enter the choice " ;
int choice ;
cin>>choice;
if(choice >=1&&choice<=4){
    int a , b;
cout<<"enter two number"<<endl;
    cin>> a >> b;
if(choice ==1){
    cout<< a << " + " << b << " = " << (a + b);
}
else if(choice ==2){
    cout<< a << " - " << b << " = " <<( a - b ) ;
}
else if(choice ==3){
    cout<< a << " * " << b << " = " << (a * b);
}
else if(choice ==4){
    if(b==0){
        cout<<"divide by zero is not possible"<<endl;
    }
    else{
        cout<< a << " / " << b << " = " << (a / b) <<endl;
    }
    
}
}
else if(choice == 5){
    cout<<"enter a number"<<endl;
    int a ;
    cin>> a ;
    int factorial = 1;
    for(int i=1;i<=a;i++){
        factorial *= i;
    }
    cout<< a << " ! " << " = "<< factorial <<endl;
}
else if(choice == 6){
    cout<<"enter a number"<<endl;
    int x;
cin>> x;
    int zeroes=0;
    int originalnumber = x;
    while( x > 0){  
         zeroes += x / 5;
        x =x/5;
    }
    cout<< originalnumber <<" !! ="<< zeroes <<endl;
}
else if(choice==7){

    return 0;
}
  return 1;

}
int main(){
    int mode=1;
    while(true){
        
        if(mode==0){
          mode = zen_mode();
        }
        else if(mode==1){
          mode = normal_mode();
        }
}
 return 0;
}

