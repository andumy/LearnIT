#include <iostream>
#include <vector>

#define DIM 10

using namespace std;

vector<int> path;

bool bubbleSort(int V[DIM]) {
    int aux;
    bool sorted = false;

    while (!sorted) {
        sorted = true;
        for (int i = 1; i < DIM; i++) {
            if (V[i-1] > V[i]) {
                sorted = false;
                aux = V[i-1];
                V[i-1] = V[i];
                V[i] = aux;
            }

        }
    }

    return true;
}

int main() {
    int V[DIM] = {1, 7, 2, 6, 3, 8, 0, 4, 5, 9};
    bool sort = bubbleSort(V);

    for (int i = 0; i < DIM; i++) {
        cout << V[i] << ' ';
    }

    return sort ? 0 : 1;
}