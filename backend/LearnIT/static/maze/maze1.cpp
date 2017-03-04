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
bool wasHere[DIM][DIM];
vector<int> path;

bool backtrackingSolve(int x, int y) {
    if (maze[x][y] == EXIT) {
        return true;
    }
    if (maze[x][y] == WALL || wasHere[x][y])
        return false;

    wasHere[x][y] = true;
    if (x != 0) {
        if (backtrackingSolve(x-1, y)) {
            path.insert(path.begin(), UP);
            return true;
        }
    }
    if (x != DIM - 1) {
        if (backtrackingSolve(x+1, y)) {
            path.insert(path.begin(), DOWN);
            return true;
        }
    }
    if (y != 0) {
        if (backtrackingSolve(x, y-1)) {
            path.insert(path.begin(), LEFT);
            return true;
        }
    }
    if (y != DIM -1) {
        if (backtrackingSolve(x, y+1)) {
            path.insert(path.begin(), RIGHT);
            return true;
        }
    }
    return false;
}


int main() {
    unsigned int i;

    bool solve = backtrackingSolve(1, 0);

    for (i = 0; i < path.size(); i++) {
        cout << path[i] << ' ';
    }
    cout << endl;

    return solve ? 0 : 1;
}