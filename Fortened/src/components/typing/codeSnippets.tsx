// Code snippets organized by difficulty level
const codeSnippets = {
  beginner: [
    {
      language: 'JavaScript',
      code: `function greet(name) {
  return "Hello, " + name + "!";
}

// Call the function
console.log(greet("World"));`
    },
    {
      language: 'Python',
      code: `def calculate_sum(a, b):
    return a + b

# Calculate and print the sum
result = calculate_sum(5, 10)
print("The sum is:", result)`
    }
  ],
  intermediate: [
    {
      language: 'JavaScript',
      code: `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}`
    },
    {
      language: 'TypeScript',
      code: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function filterActiveUsers(users: User[]): User[] {
  return users.filter(user => user.isActive);
}`
    }
  ],
  advanced: [
    {
      language: 'JavaScript',
      code: `class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = { value, left: null, right: null };
    
    if (!this.root) {
      this.root = newNode;
      return;
    }

    const insertNode = (node, newNode) => {
      if (newNode.value < node.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    };

    insertNode(this.root, newNode);
  }
}`
    },
    {
      language: 'Python',
      code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = Node(data)
        
        if self.head is None:
            self.head = new_node
            return
        
        last_node = self.head
        while last_node.next:
            last_node = last_node.next
        
        last_node.next = new_node
    
    def print_list(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")`
    }
  ]
};

export default codeSnippets;