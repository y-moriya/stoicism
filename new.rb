require 'date'
require 'nokogiri'
require 'open-uri'

teams = {
  "阪神" => "T",
  "巨人" => "G",
  "中日" => "D",
  "広島" => "C",
  "ヤクルト" => "S",
  "DeNA" => "DB",
  "ソフトバンク" => "H",
  "ロッテ" => "M",
  "日本ハム" => "F",
  "西武" => "L",
  "オリックス" => "Bs",
  "楽天" => "E",
}

url = "https://baseball.yahoo.co.jp/npb/"
charset = nil
html = URI.open(url) do |f|
  charset = f.charset
  f.read
end
page = Nokogiri::HTML.parse(html, nil, charset)
contents = page.search('.bb-score__content')
game = contents.select{|c| /阪神/.match(c)}[0]
href = game[:href]
home = game.search('.bb-score__homeLogo').text
away = game.search('.bb-score__awayLogo').text
home_score = game.search('.bb-score__score--left').text
away_score = game.search('.bb-score__score--right').text
link_text = game.search('.bb-score__link').text

if link_text != "試合終了"
  puts "まだ試合が終わっていません。"
  return
end

now = DateTime.now
datestr = now.strftime("%Y-%m-%d")
titledate = now.strftime("%Y/%m/%d")
title = %Q(#{titledate} #{home}VS#{away})
h2 = %Q(## #{home} #{home_score} - #{away_score} #{away})

dir = "content/blog/" + datestr + "_" + teams[home] + teams[away]
Dir.mkdir(dir) unless Dir.exists?(dir)
filename = dir+"/index.mdx"
f = File.open(filename, "w+")
f.puts("---\ntitle: #{title}\ndate: #{now.to_s}\ntags: [\"野球\"]\n---\n\n#{h2}\n\n#{href}\n\n")
f.close

system("git add #{filename}")

puts "投稿テンプレート作成成功"

system("code #{filename}")