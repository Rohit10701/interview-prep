


def find(x, y):
    if (x + 1 >= y and (x+1-y)%9 == 0):
        return "Yes"
    return "No"
for _ in range(int(input())):
    x, y = list(map(int, input().split()))
    print(find(x, y))

"""

"""