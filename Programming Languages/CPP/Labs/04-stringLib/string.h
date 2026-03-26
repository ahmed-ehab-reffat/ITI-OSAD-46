#ifndef STRING_H_INCLUDED
#define STRING_H_INCLUDED

int strLen(char *arr);

int strCmp(char *str1, char *str2);

void toLower(char *arr);

void toUpper(char *arr);

int strConcat(char *str1, char *str2, int size_str1);

int strCpy(char *str1, char *str2, int size_str1);

#endif // STRING_H_INCLUDED