#!/bin/bash

# finds potential private keys and rpc endpoints in website files


link=$1

if [[ -z "$link" ]]
then
	echo "need a link buddy..."
	exit 9
fi
echo "Getting files for $link"
  
wget -kNr -l 2 robots=off -A js,css,html,txt,env -P outputt -q $link
#wget -mk -P outputt -q $link
 

#name=$(echo "$link" | grep -oP '(?<=\/\/)(www\.)?\K[^\/]+')

f_data="./utils/checker/data.txt"
f_links="./utils/linkparser/rpc.txt"
  
for filename in $(find ./outputt -type f);
do
	#echo "put ${filename}";
	if [ -f ${filename} ] 
	then
		#scan double quotes
		grep -oP '".*?"' ${filename} | cat >> $f_data
		#scan single quotes
		grep "'.*?'" ${filename} | cat >> "$f_data"
		#scan comments (//)
		grep '//' ${filename} | cat >> "$f_data"
		#scan comments (/* */)
		grep -Pzo "(?s)/\*(.*?)\*/" ${filename} | cat >> "$f_data"
 		#scan keypairs
		grep -i "keypair" ${filename} | cat >> "$f_data"
 		#scan wallets
		grep -i "wallet" ${filename} | cat >> "$f_data"
		#scan accounts
		grep -i "account" ${filename} | cat >> "$f_data"
		#scan for links (was tee -a "$f_links" "$f_data")
		grep -Eo 'https?://[^"<>()[:space:]]+' ${filename} | tee -a "$f_links"
		#scan for html comments
 		grep -oP '<!--.*?-->' ${filename} | cat >> "$f_data"
 		 
 		#scan connections
		#grep -i "new connection" ${filename} | tee -a ./$name/connection.txt ./$name/data.txt
		
 		#filter links for common rpc urls 
  	fi
done 

rm -rf ./outputt

#mv -f ./$name/data.txt ./checker/data.txt

echo "finished scrapping $link"
exit 0

 
