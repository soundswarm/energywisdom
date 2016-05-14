library(ggplot2)
library(rjson)
library(RCurl)
library(plyr)
interval <- read.csv("~/Dropbox/Suncode/varsanity/DataAnalysisPrototypes/sean intervals.csv")
PVW_url = "http://developer.nrel.gov/api/pvwatts/v5.json?api_key=8RNaPmDv9p7S0wZ147xsPQA405LTNSTPfUbtijcc&system_capacity=3.0&module_type=0&losses=14.0&inv_eff=96.0&azimuth=180.0&array_type=3&tilt=25.0&timeframe=hourly&dataset=tmy2&address=94110"
#PVW_json = RCurl
#fromJSON( json_str, file, method = "C", unexpected.escape = "error" )

label_days=function(interval)
{
  #label interval_date separate from hours
  interval$timestamp=strptime(interval$interval_start,format="%m/%d/%Y %H:%M")
  interval$hour = as.integer(format(interval$timestamp,'%H'))
  interval$month = as.integer(format(interval$timestamp,'%m'))
  interval$day = as.integer(format(interval$timestamp,'%d'))
  interval$date = format(interval$timestamp,'%m/%d/%Y')
  interval=interval[!interval$day=="29/02/2016",]#I AM DELETING FEB 29
  return(interval)
}

interval = label_days(interval)

aggregate_days = function(interval)
{
  interval_sum = aggregate(interval_kWh~day,data=interval,FUN=sum)
  colnames(interval_sum) = c("day","dailykWh")
  return(merge(interval,interval_sum))
}

interval=aggregate_days(interval)

return_max_day=function(interval)
{
  max_demand_day = interval[which(interval$dailykWh==max(interval$dailykWh)),]
  return(max_demand_day)
  #ggplot
}

PVWatts_to_df = function(PVW_url)
{
  solar_json = fromJSON(getURL(PVW_url))
  solar_df = data.frame(solar_json$outputs$ac/1000)
  colnames(solar_df)=c("solar_kW")
  year_df=df_single_year()
  year_df$solar_kw=solar_df$solar_kW
  year_df
}

#colnames(year_df)=c("day","month","hour","abs_hour","solar_kw")
sol_interval = merge(interval,year_df,by=c("day","month","hour"))#did this work?
max_demand_day = return_max_day(sol_interval)


ggplot(max_demand_day,aes(x=timestamp,y=interval_kWh))+geom_line()+geom_line(aes(x=timestamp,y=solar_kw),color="yellow")+theme_bw()

df_single_year=function()
{
  months=seq(1,12) 
  year_df = ldply(.data=months,.fun=df_single_month)
  year_df$abs_hour=seq(1,8760)
  return(year_df)
}

df_single_month =function(month)
{
  if(month==2){
    days=28
  }else if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){
    days=31
  }else{
    days=30
  }
  days=data.frame("day"=seq(1,days))
  days$month=month
  month_df = ddply(days,.(days),.fun=df_single_day,month)
  month_df$day.days=NULL
  month_df$day.month=NULL
  return(month_df)
}

df_single_day=function(day,month)
{
  hours =data.frame("hour"=seq(0,23))
  day=merge(data.frame("day"=day,"month"=month),hours)
  return(day)
}

#compute the solar excess
  sol_interval$s_excess = sol_interval$solar_kw-sol_interval$interval_kW
  
  
#Battery initialization characteristics
  battery_state_0 = 0;
  battery_size = 5; #in kWh
  batt_C = battery_size/2 #vary the number to vary "C"
  sol_interval$battery_charge=battery_state_0 #start the battery at 0 SOC
  

  
update_battery_one_hour=function(single_row)
{
  if(single_row$s_excess > 0 && single_row$battery_charge <=battery_size) #if solar excess is available, charge
    {
      if(single_row$s_excess < batt_C)
      {
        single_row$battery_charge = single_row$battery_charge+single_row$s_excess #add rate if excess exceeds rate
      }
      else
      {
        single_row$battery_charge = single_row$battery_charge+single_row$s_excess#add solar excess if less than rate
      }
    if(single_row$battery_charge >battery_size)
      {
        single_row$battery_charge=battery_size#if charge exceeds size, charge is size
      }
    }
  if(single_row$s_excess <0 && single_row$battery_charge >0) #if battery power is availble, discharge
    {
      if(abs(single_row$s_excess) > C)#if deficit is greater than C, add C
      {
        single_row$battery_charge = single_row$battery_charge - batt_C
      }
      else
      {
        single_row$battery_charge = single_row$battery_charge + single_row$s_excess 
      }
    if(single_row$battery_charge <0)
    {
      single_row$battery_charge = 0
    }
  }
  return(single_row)
}

simulate_battery_over_time = function(sol_interval)
{
  for(i in seq(1:(length(sol_interval$abs_hour)-1))
    {
      
    }
}
