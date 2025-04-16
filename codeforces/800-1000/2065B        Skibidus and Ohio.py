def find(s):
    for i in range(len(s)-1):
        if s[i] == s[i+1]:
            return 1
    return len(s)

for _ in range(int(input())):
    s = input()
    print(find(s))