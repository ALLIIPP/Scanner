#!/bin/bash

filepath="./projects.txt"
offset=0

while :
do

#kyzzen
curl -X POST -H "Content-Type: text/plain;charset=UTF-8" -H "Accept: */*" -H "User-Agent: Chrome/79" --user-agent 'Chrome/79' -d "{\"query\":\"\nquery MintCalendar2(\$limit: Int, \$offset: Int, \$orderBy: String, \$launchDate: String, \$isApproved: Boolean, \$isRejected: Boolean){\n mintCalendar(limit:\$limit, offset:\$offset, orderBy: \$orderBy, launchDate: \$launchDate, isApproved: \$isApproved, isRejected: \$isRejected){\n    nodes {\n      collectionId\n      createdAt\n      description\n      discord\n      id\n      isApproved\n      isOwn\n      isRejected\n      launchDate\n      launchpadUrl\n      logoUrl\n      name\n      price\n      source\n      supply\n      thumbnailUrl\n      twitter\n      updatedAt\n      website\n    }\n  }\n}\n\",\"variables\":{\"launchDate\":\">= 2023-09-29\",\"limit\":100,\"offset\":0,\"isApproved\":true,\"isRejected\":false,\"orderBy\":\"launchDate\"}}" https://v8lkzf4yd2.execute-api.us-east-2.amazonaws.com/go-gql | grep -o '"website":"[^"]*"' | awk -F: '{if(length($3)>5){print $2":"$3}}' | tr -d '"' | cat > $filepath
 
#howrare.is
curl -X GET https://howrare.is/drops | grep "fa-globe"  | grep -o 'href="[^"]*"' | awk -F\" '{print $2}' | cat >> $filepath

#hyperspace
curl -X POST --user-agent 'Chrome/79' -H "Content-Type: application/json" -d '{"operationName":"GetUpcomingProjects","variables":{"conditions":[{"user_timestamp":{"timestamp":1685912375135,"locale":"en-US","timezone":"America/New_York","operation":"GREATER_THAN_OR_EQUAL_TO"},"protocol":"SOLANA"}],"order_by":{"field_name":"launch_date","sort_order":"ASC"},"pagination_info":{"page_size":100,"page_number":1}},"query":"query GetUpcomingProjects($conditions: [GetUpcomingProjectsCondition!], $order_by: [OrderConfig!], $pagination_info: PaginationConfig) {\n  getUpcomingProjectsRaw(\n    conditions: $conditions\n    order_by: $order_by\n    pagination_info: $pagination_info\n  ) {\n    upcoming_projects {\n      project_name\n      protocol\n      twitter\n      discord\n      website\n      display_name\n      supply\n      description\n      launch_timestamp\n      launch_date\n      mint_site\n      img_url\n      price\n      is_moonshot\n      is_featured\n      __typename\n    }\n    __typename\n  }\n}"}' https://app.hyperspace.xyz/graphql | grep -o '"website":"[^"]*"' | awk -F: '{if(length($3)>5){print $2":"$3}}' | tr -d '"' | cat >> $filepath

#nft calendar
curl -X GET -H "Content-Type: application/json" --user-agent 'Chrome/79' https://nftsolana.io/ | grep "<b> Website:</b>" | grep -o "<u>.*</u>" | sed "s/<u>//"| sed "s#</u>##" | cat >> $filepath

#birdeye
node ./utils/brd/index.js

#magiceden
node ./utils/magic/index.js

#remove duplicates/ garbage
node ./utils/rmdup/index.js
 

#filter for pK and rpc
while IFS= read -r link; do
     	
	echo "Processing link: $link"
	#get potential keys and links
	./parse.sh $link
	#find actual keys
	node ./utils/checker/index.js $link
	#find rpcs 
	node ./utils/linkparser/index.js
	#remove non-valid strings
	rm ./utils/checker/data.txt
       
done < $filepath
echo "last scan :  "
sleep=$((RANDOM * 28800 / 32767  + 14400))
hours=$((sleep / 3600))
minutes=$((sleep % 3600 / 60))
echo "next scan in $hours hours and $minutes minutes"
date
sleep $sleep
done
