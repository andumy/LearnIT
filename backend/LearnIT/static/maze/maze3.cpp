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

%@PLACEHOLDER@%

int main() {
    unsigned int i;

    bool solve = backtrackingSolve(1, 0);

    for (i = 0; i < path.size(); i++) {
        cout << path[i] << ' ';
    }
    cout << endl;

    return solve ? 0 : 1;
}