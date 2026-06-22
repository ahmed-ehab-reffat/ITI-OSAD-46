# =============================================================================
# Phase 2 — The AI Audit: Bank Account
#
# This script was "written by AI." It has exactly 5 mistakes:
#   - 2 syntax errors  (Ruby won't even run until these are fixed)
#   - 3 logic flaws    (Ruby runs but produces wrong results)
#
# Your job: find all 5, add a comment above each bug, then fix them.
# Use this format for your comments:
#   # BUG [n]: [what is wrong] → FIX: [what it should be]
# =============================================================================

class BankAccount
  attr_reader :balance, :owner

  def initialize(owner, initial_balance)
    @owner   = owner
    @balance = initial_balance
    @rate    = 0.05
  end

  def deposit(amount)
    if amount > 0
      # BUG [1]: deposit subtracts the amount instead of adding it → FIX: add amount to balance
      @balance += amount
      puts "  New balance: $#{"%.2f" % @balance}"
    else
      puts "  Error: Deposit amount must be positive."
    end
  end

  def withdraw(amount)
    # BUG [2]: withdraw does not check for insufficient funds → FIX: check balance and show error without changing it
    if amount > @balance
      puts "  Error: Insufficient funds. Balance: $#{"%.2f" % @balance}"
    elsif amount <= 0
      puts "  Error: Withdrawal amount must be positive."
    else
      @balance -= amount
      puts "  New balance: $#{"%.2f" % @balance}"
    end
    # BUG [3]: method missing an `end` (syntax) and will break parsing → FIX: ensure method is properly closed with `end`
  end

  def apply_interest
    # BUG [4]: apply_interest replaces the balance with only the interest amount → FIX: add the interest to the existing balance
    @balance += @balance * @rate
    puts "  New balance: $#{"%.2f" % @balance}"
  end

  def display_info
    puts "Owner  : #{@owner}"
    # BUG [5]: malformed interpolation/formatting for balance (syntax) → FIX: format balance to two decimals using interpolation
    puts "Balance: $#{"%.2f" % @balance}"
  end
end

# --- Script entry point ---

account = BankAccount.new("Alice", 1000)

puts "=== Account Info ==="
account.display_info
puts

puts "Depositing $500..."
account.deposit(500)
puts

puts "Withdrawing $200..."
account.withdraw(200)
puts

puts "Applying 5% interest..."
account.apply_interest
puts

puts "Attempting to overdraw $2000..."
account.withdraw(2000)
puts
account.display_info
