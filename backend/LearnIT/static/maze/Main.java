package com.company;

import java.util.Vector;

public class Main {

    private static final int DIM = 10;
    private static final int WALL = 1;
    private static final int ENTER = 2;
    private static final int EXIT = 3;
    private static final int UP = 1;
    private static final int RIGHT = 2;
    private static final int DOWN = 3;
    private static final int LEFT = 4;

    private static final int[][] maze = {
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

    private static boolean wasHere[][] = {
            {false, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false}
    };
    private static Vector<Integer> path = new Vector<Integer>();

    private static boolean backtrackingSolve(int x, int y) {
        if (maze[x][y] == EXIT) {
            return true;
        }
        if (maze[x][y] == WALL || wasHere[x][y])
            return false;

        wasHere[x][y] = true;
        if (x != 0) {
            if (backtrackingSolve(x-1, y)) {
                path.insertElementAt(UP, 0);
                return true;
            }
        }
        if (x != DIM - 1) {
            if (backtrackingSolve(x+1, y)) {
                path.insertElementAt(DOWN, 0);
                return true;
            }
        }
        if (y != 0) {
            if (backtrackingSolve(x, y-1)) {
                path.insertElementAt(LEFT, 0);
                return true;
            }
        }
        if (y != DIM -1) {
            if (backtrackingSolve(x, y+1)) {
                path.insertElementAt(RIGHT, 0);
                return true;
            }
        }
        return false;
    }



    public static void main(String[] args) {
        int i;

        boolean solved = Main.backtrackingSolve(1, 0);

        for (i = 0; i < Main.path.size(); i++) {
            System.out.print(Main.path.get(i));
            if (i != Main.path.size() - 1) {
                System.out.print(' ');
            }
        }

        System.exit(solved ? 0 : 1);
    }
}
