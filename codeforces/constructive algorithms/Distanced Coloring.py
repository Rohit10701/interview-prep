for _ in range(int(input())):
    n, m, k =  list(map(int,input().split()))
    print(min(n, k)*min(m, k))

