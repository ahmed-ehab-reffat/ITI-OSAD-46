#include "picture.h"
#include <SDL2/SDL.h>
#include <cstring> // For memcpy (efficient copying) or standard loops

// Frees the dynamically allocated memory for all shape arrays.
void Picture::clearShapes() {
  if (cptr != nullptr) {
    delete[] cptr;
    cptr = nullptr;
  }
  if (rptr != nullptr) {
    delete[] rptr;
    rptr = nullptr;
  }
  if (lptr != nullptr) {
    delete[] lptr;
    lptr = nullptr;
  }
  circlesCount = 0;
  rectanglesCount = 0;
  linesCount = 0;
}

// Performs a deep copy of all shape arrays from another Picture object.
void Picture::copyShapes(const Picture &other) {
  // 1. Copy Counts
  circlesCount = other.circlesCount;
  rectanglesCount = other.rectanglesCount;
  linesCount = other.linesCount;

  // 2. Deep Copy Circles
  if (circlesCount > 0) {
    cptr = new Circle[circlesCount];
    for (int i = 0; i < circlesCount; ++i) {
      cptr[i] = other.cptr[i];
    }
  } else {
    cptr = nullptr;
  }

  // 3. Deep Copy Rectangles
  if (rectanglesCount > 0) {
    rptr = new Rectangle[rectanglesCount];
    for (int i = 0; i < rectanglesCount; ++i) {
      rptr[i] = other.rptr[i];
    }
  } else {
    rptr = nullptr;
  }

  // 4. Deep Copy Lines
  if (linesCount > 0) {
    lptr = new Line[linesCount];
    for (int i = 0; i < linesCount; ++i) {
      lptr[i] = other.lptr[i];
    }
  } else {
    lptr = nullptr;
  }
}

Picture::Picture()
    : circlesCount(0), rectanglesCount(0), linesCount(0),
      cptr(nullptr), rptr(nullptr), lptr(nullptr) {}

Picture::Picture(int cC, int rC, int lC, Circle *cptr, Rectangle *rptr, Line *lptr)
    : circlesCount(cC), rectanglesCount(rC), linesCount(lC),
      cptr(nullptr), rptr(nullptr), lptr(nullptr) {

  // We must deep copy the data passed through the raw pointers to prevent issues
  // if the original arrays are deleted later.

  // Set Circles
  if (cC > 0 && cptr != nullptr) {
    this->cptr = new Circle[cC];
    for (int i = 0; i < cC; ++i) {
      this->cptr[i] = cptr[i];
    }
  }

  // Set Rectangles
  if (rC > 0 && rptr != nullptr) {
    this->rptr = new Rectangle[rC];
    for (int i = 0; i < rC; ++i) {
      this->rptr[i] = rptr[i];
    }
  }

  // Set Lines
  if (lC > 0 && lptr != nullptr) {
    this->lptr = new Line[lC];
    for (int i = 0; i < lC; ++i) {
      this->lptr[i] = lptr[i];
    }
  }
}

// Copy Constructor
Picture::Picture(const Picture &other)
    : circlesCount(0), rectanglesCount(0), linesCount(0),
      cptr(nullptr), rptr(nullptr), lptr(nullptr) {
  copyShapes(other);
}

// Destructor: Cleans up memory
Picture::~Picture() {
  clearShapes();
}

// Copy Assignment Operator
Picture &Picture::operator=(const Picture &other) {
  if (this != &other) {
    clearShapes();
    copyShapes(other);
  }
  return *this;
}

// Note: Setters MUST deep copy the incoming arrays and handle memory
void Picture::setCircles(int circlesCount, Circle *cptr) {
  if (this->cptr != nullptr) {
    delete[] this->cptr;
    this->cptr = nullptr;
  }
  this->circlesCount = circlesCount;
  if (circlesCount > 0 && cptr != nullptr) {
    this->cptr = new Circle[circlesCount];
    for (int i = 0; i < circlesCount; ++i) {
      this->cptr[i] = cptr[i];
    }
  }
}

void Picture::setRectangles(int rectanglesCount, Rectangle *rptr) {
  if (this->rptr != nullptr) {
    delete[] this->rptr;
    this->rptr = nullptr;
  }
  this->rectanglesCount = rectanglesCount;
  if (rectanglesCount > 0 && rptr != nullptr) {
    this->rptr = new Rectangle[rectanglesCount];
    for (int i = 0; i < rectanglesCount; ++i) {
      this->rptr[i] = rptr[i];
    }
  }
}

void Picture::setLines(int linesCount, Line *lptr) {
  if (this->lptr != nullptr) {
    delete[] this->lptr;
    this->lptr = nullptr;
  }
  this->linesCount = linesCount;
  if (linesCount > 0 && lptr != nullptr) {
    this->lptr = new Line[linesCount];
    for (int i = 0; i < linesCount; ++i) {
      this->lptr[i] = lptr[i];
    }
  }
}

int Picture::getCirclesCount() const { return circlesCount; }
Circle *Picture::getCircles() const { return cptr; }
int Picture::getRectanglesCount() const { return rectanglesCount; }
Rectangle *Picture::getRectangles() const { return rptr; }
int Picture::getLinesCount() const { return linesCount; }
Line *Picture::getLines() const { return lptr; }

void Picture::draw(SDL_Renderer *renderer) {
  for (int i = 0; i < this->linesCount; i++) {
    this->lptr[i].draw(renderer);
  }
  for (int i = 0; i < this->rectanglesCount; i++) {
    this->rptr[i].draw(renderer);
  }
  for (int i = 0; i < this->circlesCount; i++) {
    this->cptr[i].draw(renderer);
  }
}