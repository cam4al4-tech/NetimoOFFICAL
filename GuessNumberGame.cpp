#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    int secret = rand() % 100 + 1;
    int guess;

    cout << "Guess the number (1-100):\n";

    while (true) {
        cin >> guess;

        if (guess > secret)
            cout << "Too high!\n";
        else if (guess < secret)
            cout << "Too low!\n";
        else {
            cout << "Correct!\n";
            break;
        }
    }

}
