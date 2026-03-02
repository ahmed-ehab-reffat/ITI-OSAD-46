#Conditions 
#if 
# [] [[ ]] (()) 
# case 
# patterns Case 

# Looping 
   #for i in $var do done
   #for (( i=0 i<5 i++)) do done 
   #while [[]] do done 

# Array 
# declare -a arr 
# arr=("string" "string" )

# Input from User read , Arguments 

# Menu  ==> Looping + Display Menu + case (condition) 
# while true 
# do 
#     echo "1) show date" 
#     echo "2) show cal" 
#     echo "3) show files" 
#     echo "4) show say hi" 
#     echo "5) Exit" 
#     read -p "Choose : " choice 
#     case $choice in 
#     1 | "show date")
#         date 
#     ;; 
#     2 ) 
#         cal 
#     ;;
#     3 ) 
#     ls 
#     ;;
#     4) 
#     echo "Hi"
#     ;;
#     5) 
#     break 
#     ;; 
#     *)
#         echo "Error .........." 
#     ;;
#     esac
    

# done 
# menu=("show date" "show cal" "show files" "show say hi" "Exit")

# select var in  ${menu[@]}
# do 
#     # echo $var
#     # echo $REPLY
#     case $REPLY in 
#     1 |  "show date")
#         date 
#     ;;
#     2 | "show cal")
#         cal 
#     ;;
#     3 | "show files")
#         ls 
#     ;;
#     4 | "show say hi")
#         echo hi
#     ;;
#     5 |"Exit")
#         break
#     ;;
#     *)   
#         echo "Error choice"
#     ;; 
#     esac 
# done 

# Function 

function say(){
    echo "hello mina"
}
say2(){
    echo "hello os"
}

#call ==> cal using  Name  only 
say
say2 

sum(){
    # echo sum=$(($1+$2))
    #echo sum=
    sum=0
    for i in $* 
    do 
        ((sum=sum+$i))
    done 
    echo $sum
}

res=$(sum 1 5) #sum3
echo $res
res=$(sum 1 5 3)
echo $res



sum(){
    # echo sum=$(($1+$2))
    sum=0
    for i in $* 
    do 
        ((sum=sum+$i))
    done 
    return $sum
}
# sum 1 5 #sum3
# res=$?
# echo $res
# sum 1 5 3
# res=$?
# echo $res

# read -p "Enter Numbers" num1 num2 num3
# sum $num1 $num2 $num3
# echo $?

IFS="," ; read -p "Enter Numbers : " -a nums 
sum ${nums[@]} 
echo $?

counter=10 
increment(){
    counter=8 #global 
    local counter=9 #local
    echo "Inner function $counter" #9


}
echo "Before call function $counter" #10 
increment
echo "After call function $counter" #8



# OutPut of Command 
res=$(ls)   #res==>string
echo $res 
res=($(ls)) #res==>Array 
echo ${res[@]}









# declare -a array=(ahmed ali mark) 
# echo ${array[@]} # All Element Array 
# echo ${!array[@]} # Index of Array 
# echo ${#array[@]} #length Array 


declare -A fruits=([apple]="red" [banana]="yellow")
# fruits["key"]="value"

# echo ${!fruits[@]}
# echo ${fruits[apple]}
# echo ${fruits[banana]}
for key in "${!fruits[@]}" ;do
    echo "$key is ${fruits[$key]}"
done


