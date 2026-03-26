menu=("Create Table" "insert Table" "List Table" "Select from Table" "Remove Table" "Exit")

IFS=,
PS3="$1 >> "


# ~/.DBMS/$1 
select var in ${menu[@]}
do 
echo $var
done 
