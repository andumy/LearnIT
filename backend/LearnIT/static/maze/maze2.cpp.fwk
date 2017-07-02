#include <iostream>
#include <vector>
#define DIM 10
#define PATH    0
#define WALL    1
#define ENTER   2
#define EXIT    3
#define UP      1
#define RIGHT   2
#define DOWN    3
#define LEFT    4

using namespace std;

int maze[DIM][DIM] = {
        {1, 1, 1, 0, 1, 1, 1, 1, 1, 1},
        {2, 0, 0, 0, 0, 0, 0, 0, 1, 1},
        {1, 0, 1, 1, 1, 1, 1, 0, 0, 1},
        {1, 0, 0, 0, 0, 0, 1, 1, 1, 1},
        {1, 0, 1, 1, 1, 0, 1, 1, 1, 1},
        {1, 0, 1, 0, 0, 0, 0, 0, 1, 1},
        {1, 0, 1, 0, 1, 1, 1, 0, 0, 3},
        {1, 1, 1, 0, 0, 0, 0, 0, 0, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1}
};
int x = 1;
int y = 0;
bool wasHere[DIM][DIM];
vector<int> path;

void moveUp() {
    x--;
    path.push_back(UP);
}

void moveDown() {
    x++;
    path.push_back(DOWN);
}

void moveRight() {
    y++;
    path.push_back(RIGHT);
}

void moveLeft() {
    y--;
    path.push_back(LEFT);
}

bool sequentiallySolve() {

%@PLACEHOLDER@%

    return (maze[x][y] == EXIT);
}


int main() {
    unsigned int i;

    bool solved = sequentiallySolve();

    for (i = 0; i < path.size(); i++) {
        cout << path[i];
        if (i != path.size() - 1) {
            cout  << ' ';
        }
    }

    return solved ? 0 : 1;
}