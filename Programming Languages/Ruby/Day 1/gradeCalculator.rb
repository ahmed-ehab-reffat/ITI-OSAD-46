print "How many scores? "
num_scores = gets.chomp.to_i

if num_scores <= 0
  puts "Please enter a valid number of scores greater than 0."
  exit
end

scores = []

1.upto(num_scores) do |i|
  loop do
    print "Enter score #{i}: "
    score = gets.chomp.to_i

    if score.between?(0, 100)
      scores << score
      break
    else
      puts "Invalid input. Score must be between 0 and 100."
    end
  end
end

total = scores.sum.to_f
average = total / scores.size
highest = scores.max
lowest = scores.min
letter_grade =  case average
                when 90..100 then 'A'
                when 80...90 then 'B'
                when 70...80 then 'C'
                when 60...70 then 'D'
                else 'F'
                end

puts "\nResults:"
puts "  Average : #{average.round(2)}"
puts "  Grade   : #{letter_grade}"
puts "  Highest : #{highest}"
puts "  Lowest  : #{lowest}"