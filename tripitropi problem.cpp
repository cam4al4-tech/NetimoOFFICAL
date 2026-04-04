#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    cin.ignore();
    while(t--){
        string s;
        getline(cin, s);
        cout << s[0];

        for(int i = 1; i < s.size(); i++){
            if(s[i-1] == ' '){
                cout << s[i];
            }
        }
        cout << "\n";
    }
}
