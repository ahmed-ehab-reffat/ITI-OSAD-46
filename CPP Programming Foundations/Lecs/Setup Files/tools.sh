# Install essential tools
sudo apt update
sudo apt install -y build-essential gdb cmake

# Install optional tools
sudo apt install -y valgrind cppcheck doxygen graphviz

sudo apt install -y git 
sudo apt install -y clang-format
sudo apt install -y clang-tidy
echo "Development environment ready!"
echo "Tools installed:"
echo "- GCC/G++: $(g++ --version | head -1)"
echo "- GDB: $(gdb --version | head -1)" 
echo "- CMake: $(cmake --version | head -1)"
echo "- clang-format: $(clang-format --version | head -1)"
echo "- clang-tidy: $(clang-tidy --version | head -1)"


