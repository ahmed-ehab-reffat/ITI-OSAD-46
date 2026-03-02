#! /usr/bin/bash 

LC_COLLATE=C 
shopt -s extglob 

export PS3="minaDB >>"
current=$(pwd)
export PATH=$PATH:$(pwd)
for i in $(ls) 
do 
    if [[ -f $current/$i ]];then
        chmod u+x $current/$i
    fi 

done 



if [[ -d ~/.DBMS ]];then 
    echo "Already DBMS Exist  :: "
else 
    echo "I will create DBMS Folder ........."
    sleep 1
    mkdir ~/.DBMS 
fi 

menu=("Create DB" "List DB" "Connect DB" "Remove DB" "Exit")
oldIFS=$IFS
IFS=, 
select var in ${menu[@]}
do 

case $REPLY in  
1 | "Create DB") 
    read -r  -p  "Enter DB Name : " name
    name=$(tr ' ' '_' <<< "$name" )
    if [[ $name = [0-9]* ]];then 
        echo "Error 100 :: Can't Name of DB Start Numbers.."
    elif
    [[ $name = _* ]];then
        echo "Error 101 :: Can't Name of DB Start _ .."
    else
        echo $name
            case $name in
            +([A-Za-z0-9_]))
                if [[ -e ~/.DBMS/$name ]];then
                    echo "Error 103 :: DB Name Already Exist.."
                else 
                    mkdir ~/.DBMS/$name

                fi 
            ;;
            *) 
                echo "Error 102 :: Can't Name of DB Contain Special Character .."
            esac 
    fi 
    ;;

2 | "List DB") 

    ls -F ~/.DBMS | grep '/' | tr -d '/'

;;
3 | "Connect DB") 
  read -r  -p  "Enter DB Name : " name
    name=$(tr ' ' '_' <<< "$name" )
    if [[ $name = [0-9]* ]];then 
        echo "Error 100 :: Can't Name of DB Start Numbers.."
    elif
    [[ $name = _* ]];then
        echo "Error 101 :: Can't Name of DB Start _ .."
    else
        echo $name
            case $name in
            +([A-Za-z0-9_]))
                if [[ -d ~/.DBMS/$name ]];then
                    source file5.sh $name
                else 
                    echo "Error 104 : DB Name is Not Found"
                fi 
            ;;
            *) 
                echo "Error 102 :: Can't Name of DB Contain Special Character .."
            esac 
    fi 

;;
4 | "Remove DB") 
    read -r  -p  "Enter DB Name : " name
    name=$(tr ' ' '_' <<< "$name" )
    if [[ $name = [0-9]* ]];then 
        echo "Error 100 :: Can't Name of DB Start Numbers.."
    elif
    [[ $name = _* ]];then
        echo "Error 101 :: Can't Name of DB Start _ .."
    else
        echo $name
            case $name in
            +([A-Za-z0-9_]))
                if [[ -d ~/.DBMS/$name ]];then
                    echo "I will Remove $name DB ... "
                    sleep 1 
                    rm -r  ~/.DBMS/$name 
                else 
                    echo "Error 104 : DB Name is Not Found"

                fi 
            ;;
            *) 
                echo "Error 102 :: Can't Name of DB Contain Special Character .."
            esac 
    fi 
;;

5 | "Exit")
    break
;;
* ) 

;;
esac 

done 