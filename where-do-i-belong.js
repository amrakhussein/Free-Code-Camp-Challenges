function getIndexToIns(arr, num) {
    let sorted = arr.sort((a, b) => a - b)
    
    for (let i = 0; i < sorted.length; i += 1) {
        if (num > arr[i-1] && num <= arr[i]) {
            return i;
        }
    }
    if (sorted[sorted.length - 1] < num ) {
        return sorted[sorted.length]
    }
    return 0
  }
  
  getIndexToIns([40, 60], 50);