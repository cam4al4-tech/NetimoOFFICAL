#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin>>n;
    vector <int>v;
    while(n--){
        int a ;
        cin>>a;
        while (a--){
            int b;cin>>b;
            v.push_back(b);

        }
        for(int i=0;i<=a;i++){
            int x=v[i-1];
            int y=v[i];
            if ((y%x)%2==0){
                cout<<x<<" "<<y;
            }
        }
    }
}
