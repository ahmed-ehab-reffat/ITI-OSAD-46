/*
 Sorting algorithms module.
 Each algorithm is an async function that accepts:
  - arr: array to sort in-place
  - visualize: async callback (arrCopy, meta) -> Promise
 The algorithm should call visualize after important steps.
 Simple code and comments for learning.
*/

export async function bubbleSort(arr, visualize){
  const n = arr.length;
  for(let i=0;i<n-1;i++){
    for(let j=0;j<n-1-i;j++){
      await visualize(arr.slice(), {compare:[j,j+1]});
      if(arr[j] > arr[j+1]){
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
        await visualize(arr.slice(), {swap:[j,j+1]});
      }
    }
  }
  await visualize(arr.slice(), {});
}

export async function selectionSort(arr, visualize){
  const n = arr.length;
  for(let i=0;i<n;i++){
    let min = i;
    for(let j=i+1;j<n;j++){
      await visualize(arr.slice(), {compare:[min,j]});
      if(arr[j] < arr[min]) min = j;
    }
    if(min !== i){
      [arr[i],arr[min]] = [arr[min],arr[i]];
      await visualize(arr.slice(), {swap:[i,min]});
    }
  }
  await visualize(arr.slice(), {});
}

export async function insertionSort(arr, visualize){
  for(let i=1;i<arr.length;i++){
    let key = arr[i];
    let j = i-1;
    while(j>=0 && arr[j] > key){
      await visualize(arr.slice(), {compare:[j,j+1]});
      arr[j+1] = arr[j];
      j--;
      await visualize(arr.slice(), {swap:[j+1,j+2]});
    }
    arr[j+1] = key;
    await visualize(arr.slice(), {});
  }
  await visualize(arr.slice(), {});
}

// Merge sort helper: merge two halves
async function merge(arr, l, m, r, visualize){
  const left = arr.slice(l, m+1);
  const right = arr.slice(m+1, r+1);
  let i=0,j=0,k=l;
  while(i<left.length && j<right.length){
    await visualize(arr.slice(), {compare:[k]});
    if(left[i] <= right[j]) arr[k++] = left[i++];
    else arr[k++] = right[j++];
    await visualize(arr.slice(), {swap:[k-1]});
  }
  while(i<left.length){ arr[k++] = left[i++]; await visualize(arr.slice(), {swap:[k-1]}); }
  while(j<right.length){ arr[k++] = right[j++]; await visualize(arr.slice(), {swap:[k-1]}); }
}

export async function mergeSort(arr, visualize, l=0, r=null){
  if(r === null) r = arr.length-1;
  if(l >= r) return;
  const m = Math.floor((l + r)/2);
  await mergeSort(arr, visualize, l, m);
  await mergeSort(arr, visualize, m+1, r);
  await merge(arr, l, m, r, visualize);
}

// Quick sort with simple partition
async function partition(arr, low, high, visualize){
  const pivot = arr[high];
  let i = low-1;
  for(let j=low;j<high;j++){
    await visualize(arr.slice(), {compare:[j,high], pivot:high});
    if(arr[j] < pivot){
      i++;
      [arr[i],arr[j]] = [arr[j],arr[i]];
      await visualize(arr.slice(), {swap:[i,j], pivot:high});
    }
  }
  [arr[i+1],arr[high]] = [arr[high],arr[i+1]];
  await visualize(arr.slice(), {swap:[i+1,high]});
  return i+1;
}

export async function quickSort(arr, visualize, low=0, high=null){
  if(high === null) high = arr.length-1;
  if(low < high){
    const pi = await partition(arr, low, high, visualize);
    await quickSort(arr, visualize, low, pi-1);
    await quickSort(arr, visualize, pi+1, high);
  }
}

