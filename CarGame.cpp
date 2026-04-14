#include <iostream>
#include <conio.h>   dddd
#include <windows.h>
using namespace std;

const int width = 20;
const int height = 10;

int carX = width / 2;
int obstacleX = rand() % width;
int obstacleY = 0;

bool gameOver = false;

void draw() {
    system("cls");

    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            if (j == 0 || j == width - 1)
                cout << "|";
            else if (i == height - 1 && j == carX)
                cout << "A";
            else if (i == obstacleY && j == obstacleX)
                cout << "#";
            else
                cout << " ";
        }
        cout << endl;
    }
}

void input() {
    if (_kbhit()) {
        char key = _getch();
        if (key == 'a' && carX > 1)
            carX--;
        if (key == 'd' && carX < width - 2)
            carX++;
    }
}

void logic() {
    obstacleY++;

    if (obstacleY >= height) {
        obstacleY = 0;
        obstacleX = rand() % (width - 2) + 1;
    }

    if (obstacleY == height - 1 && obstacleX == carX) {
        gameOver = true;
    }
}

int main() {
    while (!gameOver) {
        draw();
        input();
        logic();
        Sleep(100);
    }

    cout << "Game Over!" << endl;
    delay(10);
    return 0;
}
