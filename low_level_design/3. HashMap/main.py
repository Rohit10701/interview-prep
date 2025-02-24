class ListNode:
    def __init__(self, next = None, val = 0, key = 0):
        self.next = next
        self.val = val
        self.key = key

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, val, key):
        if not self.head:
            self.head = ListNode(val=val, key=key)
            return
        
        cur = self.head
        while cur:
            if cur.key == key:
                cur.val = val
                return
            if not cur.next:
                break
            cur = cur.next
        cur.next = ListNode(val=val, key=key)
    
    def get(self, key):
        cur = self.head
        while cur:
            if cur.key == key:
                return cur.val
            cur = cur.next
        return -1
    
    def remove(self, key):
        cur = self.head
        prev = None
        while cur:
            if cur.key == key:
                if prev:
                    prev.next = cur.next
                else:
                    self.head = cur.next
                return
            prev = cur
            cur = cur.next
       
class MyHashMap:

    def __init__(self):
        self.hashkey = 1000
        self.hm = [LinkedList() for _ in range(self.hashkey)]

    def put(self, key: int, value: int) -> None:
        hash_value = key%self.hashkey
        self.hm[hash_value].append(value, key)

    def get(self, key: int) -> int:
        hash_value = key%self.hashkey
        return self.hm[hash_value].get(key)

    def remove(self, key: int) -> None:
        hash_value = key%self.hashkey
        self.hm[hash_value].remove(key)


# Your MyHashMap object will be instantiated and called as such:
# obj = MyHashMap()
# obj.put(key,value)
# param_2 = obj.get(key)
# obj.remove(key)