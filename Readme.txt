https://gitlab.com/sars/hitcon-2018-defense-dashboard.git 

apache 

	ssl 憑證

dashboard
	主機防護  
	apache + mongdb 
-------------------------
api 
	顯示攻擊的資訊  (主畫面) localhost:8000 可看 

	/dashboard/show_attack 
	 "T1": {
	  "alive": true,
	  "under_attack": true,
	  "ddos": 87
	 },
	 "T2": {
	  "alive": true,
	  "under_attack": true,
	  "ddos": 87
	 },
	 "T3": {
	  "alive": true,
	  "under_attack": true,
	  "ddos": 87
	 }
	}

	取得 攻擊的資訊
		
	api /dashboard/get_attack 
	method & argu 
	post :  team_id , alive , under_attack , ddos

	捉每一隊 最新的資料
	如果太久沒有更新 要通知


	取得 bufferoverflow 的資訊 

	/tools/get_bufferoverflow
	method & argu 
	post :  team_id , alive 
	ex : team_id = "1";  alive= true 


	參加隊伍的主機 post to dashboard server 
	 #cros 
	 #argu check 
	 #多久送一次資料 
	 # alive = true + 10 分  ( alive 不扣分)
	 
 	
	顯示每隊的詳細資訊 
	/dashboard/get_team_info 
	
	method & argu 
		post : team_id  
		ex: team_id =1  

	output 格式  

	{
		teamname: "team1",
		alive: true,
		under_attack: true,
		ddos: "10",
		score: "9999",
		bandwidth: "100",
		energy: "89",
		wifi: "89"
	}

	# 多久送一次出來

	接收每隊的 bandwidth 資料 

	/dashboard/get_bandwidth
	method & argu 
		post : team_id  , value 
		ex: team_id =1 , 1000 

	接收每隊的 energy 資料 
	
	/dashboard/energy
	method & argu 
		post : team_id  , value 
		ex: team_id =1 , 1000 

	接收每隊的 wifi 資料
	
	/dashboard/wifi
	method & argu 
		post : team_id  , value 
		ex: team_id =1 , 1000 

	顯示虛擬時間  

	/tools/show_timeinfo 
		method  & argu 
			get & null 
			return timeinfo (json)
		
		json output  
		{
			"day" : "1",  // 天數要 + 1 
			"hour" "2"
		}

		#1秒 :60 秒  

		虛擬第 1 天 的 第 2 個 小時  

	計算team 的分數 第一題 
		
		/dashboard/get_total_score 

		method  & argu 
			get & team_id  
			return score  

		node check 
			12 分鐘 為單位  
				單 : + 10分 
				雙 : + 50分 
			node > 50 % 就算得分  

		手動扣分 

		bufferoverflow 
------------------------------------------
界面 
	後台手動計分 
		可選 team , 題目 , 扣多少分 

