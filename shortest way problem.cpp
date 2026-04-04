#include <bits/stdc++.h>
using namespace std;

int main() {

    int t;
    cin >> t;
    while (t--) {
        long long x, y;
        cin >> x >> y;
        if (x == y) {
            cout << -1 << "\n";
        }
        else if (y>x) {
            cout << 2 << "\n";
        } else {
            cout << 3 << "\n";
        }}

}
