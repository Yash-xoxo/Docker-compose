import pygame
import random

# Initialize pygame
pygame.init()

# Constants
SCREEN_WIDTH = 600
SCREEN_HEIGHT = 600
GRID_SIZE = 5
CELL_SIZE = SCREEN_WIDTH // GRID_SIZE
FONT = pygame.font.SysFont("comicsansms", 40)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Create the game window
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Grid Shift Puzzle")

# Generate a 5x5 grid of random numbers from 1 to 25
def generate_grid():
    numbers = list(range(1, 26))
    random.shuffle(numbers)
    grid = [numbers[i:i + GRID_SIZE] for i in range(0, len(numbers), GRID_SIZE)]
    return grid

# Draw the grid on the screen
def draw_grid(grid):
    for row in range(GRID_SIZE):
        for col in range(GRID_SIZE):
            num = grid[row][col]
            pygame.draw.rect(screen, WHITE, (col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE))
            text = FONT.render(str(num), True, BLACK)
            text_rect = text.get_rect(center=(col * CELL_SIZE + CELL_SIZE // 2, row * CELL_SIZE + CELL_SIZE // 2))
            screen.blit(text, text_rect)
            pygame.draw.rect(screen, BLACK, (col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE), 3)

# Shift a row left or right
def shift_row(grid, row, direction):
    if direction == "left":
        grid[row] = grid[row][1:] + grid[row][:1]
    elif direction == "right":
        grid[row] = grid[row][-1:] + grid[row][:-1]

# Shift a column up or down
def shift_column(grid, col, direction):
    column = [grid[i][col] for i in range(GRID_SIZE)]
    if direction == "up":
        column = column[1:] + column[:1]
    elif direction == "down":
        column = column[-1:] + column[:-1]
    for i in range(GRID_SIZE):
        grid[i][col] = column[i]

# Check if the grid is solved
def is_solved(grid):
    correct = list(range(1, 26))
    flat_grid = [num for row in grid for num in row]
    return flat_grid == correct

def main():
    grid = generate_grid()
    moves = 0
    running = True
    solved = False

    while running:
        screen.fill(BLACK)
        draw_grid(grid)

        if is_solved(grid):
            solved = True
            win_text = FONT.render("Solved!", True, WHITE)
            screen.blit(win_text, (SCREEN_WIDTH // 2 - win_text.get_width() // 2, SCREEN_HEIGHT // 2))

        pygame.display.update()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

            if not solved:
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_LEFT:
                        shift_row(grid, random.randint(0, GRID_SIZE - 1), "left")
                        moves += 1
                    elif event.key == pygame.K_RIGHT:
                        shift_row(grid, random.randint(0, GRID_SIZE - 1), "right")
                        moves += 1
                    elif event.key == pygame.K_UP:
                        shift_column(grid, random.randint(0, GRID_SIZE - 1), "up")
                        moves += 1
                    elif event.key == pygame.K_DOWN:
                        shift_column(grid, random.randint(0, GRID_SIZE - 1), "down")
                        moves += 1

    pygame.quit()

if __name__ == "__main__":
    main()