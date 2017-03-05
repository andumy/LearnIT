#include <iostream>
#include <vector>
#define DIM 10
#define PATH    0
#define WALL    1
#define ENTER   2
#define EXIT    3
#define UP      1
#define RIGHT   2
#define DOWN    -1
#define LEFT    -2

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
    path.insert(path.begin(), UP);
}

void moveDown() {
    x++;
    path.insert(path.begin(), DOWN);
}

void moveRight() {
    y++;
    path.insert(path.begin(), RIGHT);
}

void moveLeft() {
    y--;
    path.insert(path.begin(), LEFT);
}

bool sequentiallySolve() {

%@PLACEHOLDER@%

    return (maze[x][y] == EXIT);
}


int main() {
    unsigned int i;

    bool solved = sequentiallySolve();

    for (i = 0; i < path.size(); i++) {
        cout << path[i] << ' ';
    }
    cout << endl;

    return solved ? 0 : 1;
}