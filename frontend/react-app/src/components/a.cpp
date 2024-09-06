#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to calculate the sum of leaf nodes after constructing the BST
int minLeafSum(int array[], int m ) {
    sort(array, array+m);  // Sort the array
    
    // For minimal sum of leaves, we add the smallest elements last
    int leafSum = 0;
    
    // Traverse the array, adding elements to the leaf sum
    for (int i = 0; i < m / 2; i++) {
        leafSum += array[i];  // Leaf nodes in the smallest half
    }

    return leafSum;  // Return the minimum possible sum of leaf nodes
}

int main() {
    int m=3; 

    int arr[m]={4,2,3};
    
    int result = minLeafSum(arr,m);  // Calculate minimum leaf sum
    cout << result << endl;  // Output the result
    
    return 0;
}