require 'nokogiri'
require 'open-uri'

# 2021シーズンオープン戦

# preseason_2021_url = "https://npb.jp/preseason/2021/schedule_detail.html"

# charset = nil
# html = URI.open(preseason_2021_url) do |f|
#   charset = f.charset
#   f.read
# end
# page = Nokogiri::HTML.parse(html, nil, charset)
# trs = page.search('div#schedule_detail > div > table > tbody > tr')
# tigers = trs.select{|tr| tr.to_s.include?('阪神')}
# url_details = tigers.map{|t| 'https://npb.jp' + t.search('a').attr('href').value}

# File.open('2021_preseason_urls.txt', 'w+') do |f|
#   f.puts url_details
# end

# ------------------------------------------------#

# 2021シーズン公式戦

# season_2021_url_details = []
# (3..11).each do |m|
#   season_2021_url = "https://npb.jp/games/2021/schedule_#{sprintf('%02d', m)}_detail.html"
  
#   charset = nil
#   html = URI.open(season_2021_url) do |f|
#     charset = f.charset
#     f.read
#   end
#   page = Nokogiri::HTML.parse(html, nil, charset)
#   trs = page.search('div#schedule_detail > div > table > tbody > tr')
#   tigers = trs.select{|tr| tr.to_s.include?('阪神')}
#   url_details = tigers.map{|t| 'https://npb.jp' + t.search('a').attr('href').value}
#   season_2021_url_details += url_details
# end

# File.open('2021_season_urls.txt', 'w+') do |f|
#   f.puts season_2021_url_details
# end
