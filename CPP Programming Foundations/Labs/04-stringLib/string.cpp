int strLen(char *arr) {
  int length = 0;
  for (int i = 0; arr[i] != '\0'; i++) {
    length++;
  }
  return length;
};

int strCmp(char *str1, char *str2) {
  int length1 = strLen(str1);
  int length2 = strLen(str2);
  if (length1 < length2) {
    return -1;
  }
  if (length1 > length2) {
    return 1;
  }
  for (int i = 0; str1[i] != '\0'; i++) {
    if (str1[i] < str2[i]) {
      return -1;
    }
    if (str1[i] > str2[i]) {
      return 1;
    }
  }
  return 0;
};

void toUpper(char *arr) {
  for (int i = 0; arr[i] != '\0'; i++) {
    if (arr[i] >= 'a' && arr[i] <= 'z') {
      arr[i] = arr[i] - 32;
    }
  }
};

void toLower(char *arr) {
  for (int i = 0; arr[i] != '\0'; i++) {
    if (arr[i] >= 'A' && arr[i] <= 'Z') {
      arr[i] = arr[i] + 32;
    }
  }
};

int strConcat(char *str1, char *str2, int size_str1) {
  int length1 = strLen(str1);
  int length2 = strLen(str2);
  int totalLength = length1 + length2 + 1;

  if (size_str1 < totalLength) {
    return 0;
  }

  int i = length1;
  int j = 0;
  while (i < totalLength) {
    str1[i] = str2[j];
    i++;
    j++;
  }
  return 1;
};

int strCpy(char *str1, char *str2, int size_str1) {
  int length2 = strLen(str2);
  if (size_str1 < length2 + 1) {
    return 0;
  }

  for (int i = 0; i <= length2; i++) {
    str1[i] = str2[i];
  }
  return 1;
};