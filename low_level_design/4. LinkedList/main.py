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
    