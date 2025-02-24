class ListNode:
    def __init__(self, next = None, val = 0):
        self.next = next
        self.val = val

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, val):
        if not self.head:
            self.head = ListNode(val=val)
            return
        
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = ListNode(val=val)
    
    def find(self, val):
        cur = self.head
        while cur:
            if cur.val == val:
                return True
            cur = cur.next
        return False
    
    def remove(self, val):
        cur = self.head
        prev = None
        while cur:
            if cur.val == val:
                if prev:
                    prev.next = cur.next
                else:
                    self.head = cur.next
                return
            prev = cur
            cur = cur.next
        
class MyHashSet:

    def __init__(self):
        self.hashkey = 1000
        self.set = [LinkedList() for _ in range(self.hashkey)]

    def add(self, key: int) -> None:
        """
        hash it add it to linkedlist
        """
        hashed_value = key%self.hashkey
        if not self.set[hashed_value].find(key):
            self.set[hashed_value].append(key)

    def remove(self, key: int) -> None:
        """
        find hash remove it from linkedlist
        """
        hashed_value = key%self.hashkey
        self.set[hashed_value].remove(key)

    def contains(self, key: int) -> bool:
        """
        find hash and find key in linkedlist
        """
        hashed_value = key%self.hashkey
        return self.set[hashed_value].find(key)


# Your MyHashSet object will be instantiated and called as such:
# obj = MyHashSet()
# obj.add(key)
# obj.remove(key)
# param_3 = obj.contains(key)