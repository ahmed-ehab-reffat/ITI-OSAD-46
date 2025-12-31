#ifndef TEXT_EDITOR_H_INCLUDED
#define TEXT_EDITOR_H_INCLUDED

#include <string>

struct EditorState {
  char *buffer;
  int bufferSize;
  int contentLength;
  std::string fileName;
};

void initEditor(EditorState &state, int initialSize);
void editFile(EditorState &state, const std::string &fileName);
void displayEditor(const EditorState &state);
void handleKeyInput(EditorState &state, int key);
void saveFile(const EditorState &state);
void cleanupEditor(EditorState &state);

#endif // TEXT_EDITOR_H_INCLUDED