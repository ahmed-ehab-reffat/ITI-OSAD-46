#! /usr/bin/bash 
# $* Vs $@ 

# case $1 in 

# "linux" | [mM][iI][nN][aA] | 1[0-9] )
# echo "very Good Person"
# ;;
# "mac")
# echo " Good Person"
# ;;
# *)
# echo " Bad Person"
# ;;
# esac
LC_COLLATE=C
# shopt -s extglob
# read -p "Enter Characher : "  ch
# case $ch in

# +([a-z]))
# echo "Small Cha"
# ;;
# +([A-Z]))
# echo " Capital Ch"
# ;;
# +([0-9]))
# echo "Number"
# ;;
# +([A-Za-z]))
# echo "Mixed character"
# ;;
# +([A-Za-z0-9]))
# echo "Mixed character and Number"
# ;;
 

# *)
# echo "Default"
# ;;
# esac


# Redirection For Input
# Notes tr ==> Take Input from Terminal/keyboard 
# 1- File 
# tr 'a-z' 'A-Z' < /etc/passwd 
#============================
# 2- End of File /Document
# tr ' ' '_' <<EoF 
# .....
# EoF 
# 3- String or Variable 
# command <<< $varName
# command <<< ""
# 4- Pipline 
# cat  /etc/passwd  | tr 'a-z' 'A-Z'
# echo  $var  | tr 'a-z' 'A-Z'
#============================
# variable=$(command)
# variable=`command`
<<COMMENT
 read -r  -p  "Enter DB Name : " name
 name=$(tr ' ' '_' <<< "$name" )
 if [[ $name = [0-9]* ]];then 
    echo "Error Name"
 elif
  [[ $name = _* ]];then
    echo "Error Name"
 else
    echo $name
        case $name in
        +([A-Za-z0-9_]))
            echo "Valid Name"
        ;;
        *) 
            echo "Error Name contains Special Characters"
        esac 
 fi 
COMMENT
#Looping 
# case $var in 
# ..)
# ..)
# esac 

# for i in {1..20..2}
# do
# echo $i
# done
# var=
# for i in  $(seq 1 10)
# do
# echo $i
# done

# for (( i=0; i<5; i++))
# do 
# echo $i
# done 
# While 
# While cond 
# do 

# done 
# unt
#  num=0
# while [ $num -lt 10 ]
# do
# echo $num
# # ((num=$num+1)) #0+1
# num=$(($num+1))
# done

if [[ $# -eq 1  && -d $1 ]];then

listFiles=$( ls $1 )
for i in $listFiles
do 
    echo $i
    if [[ -f $1/$i && -x $1/$i  ]];then 
    echo "we will add execute permission ... $i"
        chmod u+x $1/$i
    sleep 1
    fi 
done

fi 

