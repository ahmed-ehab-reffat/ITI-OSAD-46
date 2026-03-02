#!/usr/bin/bash 

Green="\e[0;32m"
RESET="\e[0m"
# if cond;then 
# fi 
#Cond 
# var=*
# [[]] # [[ "$var" = mina* ]] , [[ cond && cond ]]
# [] #[ "$var" = mina* ] [cond -a cond ] or [] && []
# (())

# command &&  T || F
# cond ? true : false  
: '
read -p  "Enter Name "  name 
# echo $REPLY 
if [[ $name = "*ina" ]];then
echo "Big Boss" 
elif [[ $name = *ed ]];then 
echo "Big Boss"
else 
echo Normal Person
fi  
'
<<COMMENT
awk '{}' /etc/passwd
COMMENT
#==============================
# Qouting 
name="mina"
echo -e "We 3> Linux & We Hate Windows We Love $name \n"
echo 'We 3> Linux & We Hate Window We Love $name'
echo We 3\> Linux \& We Hate Window We Love $name
echo  -e "$Green This text is Green $RESET"
echo "Welcome"


echo "We love ${names:-nagy}and We Love Linux"
name="mina ahmed"
if [[ $name = *"mina"* ]] ;then
echo "if"
else 
echo "else"
fi 






