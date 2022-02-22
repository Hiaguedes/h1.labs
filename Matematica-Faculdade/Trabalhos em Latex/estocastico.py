delta = [[-1, 0 ], # go up
         [ 0, -1], # go left
         [ 1, 0 ], # go down
         [ 0, 1 ]] # go right

delta_name = ['^', '<', 'v', '>'] # Use these when creating your policy grid.

grid = [[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 1, 0]]

goal = [0, len(grid[0])-1] # Goal is in top right corner
cost_step = 1
collision_cost = 100
success_prob = 0.5


# ---------------------------------------------
#  Modify the function stochastic_value below
# ---------------------------------------------


failure_prob = (1.0 - success_prob)/2.0 # Probability(stepping left) = prob(stepping right) = failure_prob
value = [[collision_cost for col in range(len(grid[0]))] for row in range(len(grid))]
policy = [[' ' for col in range(len(grid[0]))] for row in range(len(grid))]

change=True
while change:
        change=False

        for x in range(len(grid)):
            for y in range(len(grid[0])):

                if goal[0]==x and goal[1]==y:
                    if value[x][y]>0:
                        value[x][y]=0
                        change=True

                elif grid[x][y]==0:
                    for a in range(len(delta)):
                        v2=cost_step

                        for i in range(1,2):

                          a2=(a+i) % len(delta)
                          x2=x+delta[a2][0]
                          y2=y+delta[a2][1]

                             if i==0:
                                p2=sucess_prob
                             else:
                                p2=(1.0-success_prob)/2.0

                             if x2 >=0 and x2<len(grid) and y2>= 0 and y2< len(grid[0]) and grid[x2][y2]==0:
                                v2+=p2*value[x2][y2]
                             else:
                                v2+=p2*colision_cost

                            if v2< value[x][y]:
                             change=True
                             value[x][y]=v2
                             policy[x][y]=delta_name[a]


# ---------------------------------------------
#  Use the code below to test your solution
# ---------------------------------------------
for row in value:
   print '\t'.join(map(str,row))


