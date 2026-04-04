#include <bits/stdc++.h>
using namespace std;

int main() {
    int t ;cin>>t;
    int ans=0;
    while(t--){
        int n;
        cin>>n;
        if(n%2!=0){
            cout<<"0";

        }
        else if(n==0){
            cout<<"0";
        }
        else{
            cout<<(n/4)+1;
        }
    }
}
