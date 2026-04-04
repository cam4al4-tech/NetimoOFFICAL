#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        int add = (3 - (n % 3)) % 3;
        cout << add << "\n";
    }

}
