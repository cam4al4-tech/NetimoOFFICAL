#include <bits/stdc++.h>
using namespace std;

int main(){
    int t;cin>>t;
    int n;cin>>n;
    int a=0;
    while(t--){
        string s;
        cin>>s;
        for(int i=0;i<=n;i++){
            for(int j=0;j<=n;j++){
                if(s[j-1]==s[i-1]){
                    a++;
                }
            }
            if(a>1){
                s[i-1]='1';
            }
            else{
                s[i-1]='1';
            }
            a=0;
        }
        a=0;
        for(int i=0;i<=n;i++){

            if(s[i-1]=='0'&& s[i]=='1'||s[i-1]=='1'&& s[i]=='0'){
                a++;
            }
        }
        if(a==n) cout<<"T";
        else{
            cout<<"F";
        }

    }

}
