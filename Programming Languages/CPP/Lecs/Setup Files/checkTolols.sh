echo "Verifying development tools installation..."

# Check compilers
command -v g++ >/dev/null && echo "✓ G++ installed" || echo "✗ G++ missing"
command -v gcc >/dev/null && echo "✓ GCC installed" || echo "✗ GCC missing"

# Check build tools
command -v make >/dev/null && echo "✓ Make installed" || echo "✗ Make missing"
command -v cmake >/dev/null && echo "✓ CMake installed" || echo "✗ CMake missing"

# Check debugging tools
command -v gdb >/dev/null && echo "✓ GDB installed" || echo "✗ GDB missing"

command -v clang-format >/dev/null && echo "✓ clang-format installed" || echo "✗ GDB missing"
command -v clang-tidy >/dev/null && echo "✓ clang-tidy installed" || echo "✗ GDB missing"
echo "Verification complete!"
