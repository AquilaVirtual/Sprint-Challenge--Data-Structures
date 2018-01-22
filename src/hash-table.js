/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { Node, List, getIndexBelowMax } = require('./hash-table-helpers');

class HashTable {
  constructor(limit) {
    this.limit = limit || 50;
    this.storage = [];
    this.count = 0;
    // Do not modify anything inside of the constructor
  }


  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
 
    insert(key, value) {
      const index = getIndexBelowMax(key.toString(), this.limit);
      let bucket = this.storage[index];
      let item = new Node(key, value);
      
      // Create a new bucket if none exist
      if (!bucket) {
        bucket = new List(item);
        this.storage[index] = bucket; 
        bucket.count++;
        this.count++;
        
        return 'New bucket created';
      } 
      else {
        let current = bucket.head;
        
        // If the head has null next it is there is only one node in the list
        if (!current.next) {
          current.next = item;
        }
        else {
          // move to the end of the list
          while(current.next) {
            current = current.next;
          }          
          current.next = item;
        }
        bucket.count++;
        this.count++;
        
        return 'New item placed in bucket at position ' + bucket.count;
      }
    }
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket

  remove(key, i) {
    let pos = i || null;
    let index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage[index];
    
    if (!bucket) {
      return 'Bucket not found';
    }    
    if (pos < bucket.count) {
      return 'Position argument is longer than length of bucket';
    }    
    let current = bucket.head;
    let previous;
    
    if (!pos || pos === 1) {
      // Completely splice the bucket if it will have no nodes
      if (bucket.count === 1) {
        this.storage.splice(index, 1);
        this.count--;        
        return 'Hash table spliced at hash index';
      }
      
      // Shift the head one node forward
      bucket.head = current.next;
      bucket.count--;
      this.count--;
      
      return 'Linked list head repositioned';
    }    
    let n = 1;
    
    while(n < pos) {
      previous = current;
      current = current.next;
      n++;
    }    
    // Shift the previous node's next value one node further
    previous.next = current.next;
    bucket.count--;
    this.count--;
    
    return 'Linked list item removed at position ' + pos;
  }
}
  
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value

  retrieve(key, i) {
    let pos = i || null;
    let index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage[index];
    
    if (!bucket) {
      return 'Item not found';
    }    
    if (pos > bucket.count) {
      return 'Retrieval position is greater than bucket length';
    }    
    if (!i || i === 1) {
      return bucket.head[key]; // Return the value only, can be modified
    }    
    let n = 1;
    let current = bucket.head;
    
    while(n < pos) {
      current = current.next;
      n++;
    }    
    return current[key];
  }  
}

module.exports = HashTable;
